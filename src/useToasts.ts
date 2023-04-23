import { useEffect, useRef, useState } from "react";
import { ToastEventType } from "./toast";
import { genId } from "./utils";

export type UseToastsOpts<T> = {
  onToastAdded?: (toast: T & { id: string }) => void;
  removeToastsAfterMs?: number;
};

/** Listens to all toasts and stores them in a list */
export function useToasts<T>(opts: UseToastsOpts<T> = {}) {
  const mounted = useRef(true);
  const [toasts, setToasts] = useState<(T & { id: string })[]>(
    []
  );
  useEffect(() => {
    mounted.current = true;
    const listener = (ev: Event) => {
      const event = ev as Event & {
        detail?: T & { removeAfterMs?: number };
      };
      if (event.detail) {
        const toastId = genId();
        setToasts((prev) => {
          if (event.detail) {
            const newToast = { ...event.detail, id: toastId };
            opts.onToastAdded?.(newToast);
            return [...prev, { ...event.detail, id: toastId }];
          } else {
            return prev;
          }
        });
        if (event.detail.removeAfterMs) {
          setTimeout(() => {
            if (mounted.current) {
              setToasts((prev) =>
                prev.filter((item) => item.id !== toastId)
              );
            }
          }, event.detail.removeAfterMs);
        } else if (opts.removeToastsAfterMs) {
          setTimeout(() => {
            if (mounted.current) {
              setToasts((prev) =>
                prev.filter((item) => item.id !== toastId)
              );
            }
          }, opts.removeToastsAfterMs);
        }
      }
    };
    document.addEventListener(ToastEventType, listener);
    return () => {
      document.removeEventListener(ToastEventType, listener);
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.removeToastsAfterMs, opts.onToastAdded]);

  return {
    toasts,
    onRemoveToast: (id: string) => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    },
  };
}
