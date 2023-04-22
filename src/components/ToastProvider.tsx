import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToastEventType } from "../toast";

export type ToastProviderProps<T> = {
  renderToasts: (props: {
    toasts: (T & { id: string })[];
    onRemoveToast: (id: string) => void;
  }) => ReactElement;
  removeToastsAfterMs?: number;
};

let incr = 0;
const genId = () => {
  incr += 1;
  return `toast-${incr}`;
};

export function ToastProvider<T extends Record<string, any>>(
  props: ToastProviderProps<T>
) {
  const mounted = useRef(true);
  const [toasts, setToasts] = useState<(T & { id: string })[]>(
    []
  );
  useEffect(() => {
    mounted.current = true;
    const listener = (ev: Event) => {
      const event = ev as Event & { detail?: T };
      if (event.detail) {
        const toastId = genId();
        setToasts((prev) => {
          if (event.detail) {
            return [...prev, { ...event.detail, id: toastId }];
          } else {
            return prev;
          }
        });
        if (props.removeToastsAfterMs) {
          setTimeout(() => {
            if (mounted.current) {
              setToasts((prev) =>
                prev.filter((item) => item.id !== toastId)
              );
            }
          }, props.removeToastsAfterMs);
        }
      }
    };
    document.addEventListener(ToastEventType, listener);
    return () => {
      document.removeEventListener(ToastEventType, listener);
      mounted.current = false;
    };
  }, [props.removeToastsAfterMs]);

  return (
    <props.renderToasts
      toasts={toasts}
      onRemoveToast={(id: string) => {
        setToasts((prev) =>
          prev.filter((item) => item.id !== id)
        );
      }}
    />
  );
}
