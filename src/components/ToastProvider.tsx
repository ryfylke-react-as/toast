import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { useToasts } from "../useToasts";

export type RenderToastsProps<T> = {
  toasts: (T & { id: string })[];
  onRemoveToast: (id: string) => void;
};

export type ToastProviderProps<T> = {
  renderToasts: (props: {
    toasts: (T & { id: string })[];
    onRemoveToast: (id: string) => void;
  }) => ReactElement;
  removeToastsAfterMs?: number;
  onToastAdded?: (toast: T) => void;
  portal?: undefined | HTMLElement;
};

export function ToastProvider<T extends Record<string, any>>(
  props: ToastProviderProps<T>
) {
  const { toasts, onRemoveToast } = useToasts({
    removeToastsAfterMs: props.removeToastsAfterMs,
    onToastAdded: props.onToastAdded,
  });

  if (props.portal) {
    return ReactDOM.createPortal(
      <props.renderToasts
        toasts={toasts}
        onRemoveToast={onRemoveToast}
      />,
      props.portal
    );
  }

  return (
    <props.renderToasts
      toasts={toasts}
      onRemoveToast={onRemoveToast}
    />
  );
}
