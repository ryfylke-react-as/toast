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
    cancelToastTimeout: (id: string) => void;
    restartToastTimeout: (
      id: string,
      removeAfterMs?: number
    ) => void;
  }) => ReactElement;
  removeToastsAfterMs?: number;
  onToastAdded?: (toast: T) => void;
  portal?: undefined | HTMLElement;
};

export type ToastProviderPropsInternal<T> =
  ToastProviderProps<T> & {
    channel: string;
  };

export function ToastProvider<T extends Record<string, any>>(
  props: ToastProviderPropsInternal<T>
) {
  const {
    toasts,
    onRemoveToast,
    cancelToastTimeout,
    restartToastTimeout,
  } = useToasts({
    removeToastsAfterMs: props.removeToastsAfterMs,
    onToastAdded: props.onToastAdded,
    channel: props.channel,
  });

  if (props.portal) {
    return ReactDOM.createPortal(
      <props.renderToasts
        toasts={toasts}
        onRemoveToast={onRemoveToast}
        cancelToastTimeout={cancelToastTimeout}
        restartToastTimeout={restartToastTimeout}
      />,
      props.portal
    );
  }

  return (
    <props.renderToasts
      toasts={toasts}
      onRemoveToast={onRemoveToast}
      cancelToastTimeout={cancelToastTimeout}
      restartToastTimeout={restartToastTimeout}
    />
  );
}
