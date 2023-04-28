import { useEffect, useRef, useState } from "react";
import { ToastEventType, subscribeToToasts } from "./toast";

export type UseToastsOpts<T> = {
  onToastAdded?: (toast: T & { id: string }) => void;
  removeToastsAfterMs?: number;
};

export type UseToastsOptsInternal<T> = UseToastsOpts<T> & {
  channel: string;
};

const getRemoveChannel = (channel: string) =>
  `${channel}-remove`;

/** Listens to all toasts and stores them in a list */
export function useToasts<T extends Record<string, any>>(
  opts: UseToastsOptsInternal<T> = { channel: ToastEventType }
) {
  const timeouts = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  const mounted = useRef(true);
  const [toasts, setToasts] = useState<
    (T & { id: string; removeAfterMs?: number })[]
  >([]);

  useListenToRemoveToast({
    onRemove: (id) => {
      if (mounted.current) {
        setToasts((prev) => {
          if (!prev.find((item) => item.id === id)) {
            return prev; // keep old reference to prevent re-render
          }
          return prev.filter((item) => item.id !== id);
        });
      }
    },
    channel: opts.channel,
  });

  const removeToast = (id: string) => {
    if (mounted.current) {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }
    document.dispatchEvent(
      new CustomEvent(getRemoveChannel(opts.channel), {
        detail: id,
      })
    );
  };

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = subscribeToToasts<T>((toast) => {
      setToasts((prev) => {
        if (toast) {
          const newToast = { ...toast };
          opts.onToastAdded?.(newToast);
          return [...prev, { ...toast }];
        } else {
          return prev;
        }
      });
      if (toast.removeAfterMs || opts.removeToastsAfterMs) {
        timeouts.current[toast.id] = setTimeout(() => {
          removeToast(toast.id);
        }, toast.removeAfterMs ?? opts.removeToastsAfterMs);
      }
    }, opts.channel);

    return () => {
      unsubscribe();
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.removeToastsAfterMs, opts.onToastAdded]);

  return {
    toasts,
    onRemoveToast: removeToast,
    cancelToastTimeout: (id: string) => {
      if (timeouts.current[id]) {
        clearTimeout(timeouts.current[id]);
      }
    },
    restartToastTimeout: (
      id: string,
      removeAfterMs?: number
    ) => {
      const toast = toasts.find((t) => t.id === id);
      if (!toast) {
        return;
      }
      if (timeouts.current[id]) {
        clearTimeout(timeouts.current[id]);
      }
      timeouts.current[id] = setTimeout(() => {
        removeToast(id);
      }, removeAfterMs ?? toast.removeAfterMs ?? opts.removeToastsAfterMs);
    },
  };
}

function useListenToRemoveToast(opts: {
  onRemove: (toastId: string) => void;
  channel: string;
}) {
  const removeChannel = getRemoveChannel(opts.channel);
  useEffect(() => {
    const listener = (e: Event) => {
      const event = e as Event & {
        detail?: string;
      };
      if (event.detail) {
        opts.onRemove(event.detail);
      }
    };
    document.addEventListener(removeChannel, listener);
    return () =>
      document.removeEventListener(removeChannel, listener);
  }, [opts.channel]);
}
