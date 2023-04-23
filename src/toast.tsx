import React from "react";
import {
  ToastProvider,
  ToastProviderProps,
} from "./components/ToastProvider";
import { UseToastsOpts, useToasts } from "./useToasts";

export const ToastEventType = "ryfrea-toast" as const;

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
    useToasts: (opts: UseToastsOpts<T>) => useToasts<T>(opts),
  };
};
