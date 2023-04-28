import { useEffect, useRef, useState } from "react";
import { ToastEventType, subscribeToToasts } from "./toast";
import { genId } from "./utils";

export type UseToastsOpts<T> = {
  onToastAdded?: (toast: T & { id: string }) => void;
  removeToastsAfterMs?: number;
};

export type UseToastsOptsInternal<T> = UseToastsOpts<T> & {
  channel: string;
};

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
  useEffect(() => {
    mounted.current = true;
    const unsubscribe = subscribeToToasts<T>((toast) => {
      const toastId = genId();
      setToasts((prev) => {
        if (toast) {
          const newToast = { ...toast, id: toastId };
          opts.onToastAdded?.(newToast);
          return [...prev, { ...toast, id: toastId }];
        } else {
          return prev;
        }
      });
      if (toast.removeAfterMs) {
        timeouts.current[toastId] = setTimeout(() => {
          if (mounted.current) {
            setToasts((prev) =>
              prev.filter((item) => item.id !== toastId)
            );
          }
        }, toast.removeAfterMs);
      } else if (opts.removeToastsAfterMs) {
        timeouts.current[toastId] = setTimeout(() => {
          if (mounted.current) {
            setToasts((prev) =>
              prev.filter((item) => item.id !== toastId)
            );
          }
        }, opts.removeToastsAfterMs);
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
    onRemoveToast: (id: string) => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    },
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
        if (mounted.current) {
          setToasts((prev) =>
            prev.filter((item) => item.id !== id)
          );
        }
      }, removeAfterMs ?? toast.removeAfterMs ?? opts.removeToastsAfterMs);
    },
  };
}
