import React from "react";
import {
  ToastProvider,
  ToastProviderProps,
} from "./components/ToastProvider";
import { UseToastsOpts, useToasts } from "./useToasts";

export const ToastEventType = "ryfrea-toast" as const;

type UnsubscribeFunction = () => void;

export const subscribeToToasts = <T extends Record<string, any>>(
  onToastAdded: (toast: T & { removeAfterMs?: number }) => void
): UnsubscribeFunction => {
  const listener = (e: Event) => {
    const event = e as Event & {
      detail?: T & { removeAfterMs?: number };
    };
    if (event.detail) {
      onToastAdded(event.detail);
    }
  };
  document.addEventListener(ToastEventType, listener);
  return () => {
    document.removeEventListener(ToastEventType, listener);
  };
};

export const initToast = <T extends Record<string, any>>() => {
  return {
    toast: (args: T & { removeAfterMs?: number }) => {
      document.dispatchEvent(
        new CustomEvent(ToastEventType, { detail: args })
      );
    },
    ToastProvider: (props: ToastProviderProps<T>) => (
      <ToastProvider {...props} />
    ),
    useToasts: (opts: UseToastsOpts<T> = {}) =>
      useToasts<T>(opts),
    subscribeToToasts: (
      onToastAdded: (
        toast: T & { removeAfterMs?: number }
      ) => void
    ) => subscribeToToasts(onToastAdded),
  };
};
