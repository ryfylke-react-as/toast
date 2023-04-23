import { useEffect, useRef, useState } from "react";
import { subscribeToToasts } from "./toast";
import { genId } from "./utils";

export type UseToastsOpts<T> = {
  onToastAdded?: (toast: T & { id: string }) => void;
  removeToastsAfterMs?: number;
};

/** Listens to all toasts and stores them in a list */
export function useToasts<T extends Record<string, any>>(
  opts: UseToastsOpts<T> = {}
) {
  const mounted = useRef(true);
  const [toasts, setToasts] = useState<(T & { id: string })[]>(
    []
  );
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
        setTimeout(() => {
          if (mounted.current) {
            setToasts((prev) =>
              prev.filter((item) => item.id !== toastId)
            );
          }
        }, toast.removeAfterMs);
      } else if (opts.removeToastsAfterMs) {
        setTimeout(() => {
          if (mounted.current) {
            setToasts((prev) =>
              prev.filter((item) => item.id !== toastId)
            );
          }
        }, opts.removeToastsAfterMs);
      }
    });

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
  };
}
