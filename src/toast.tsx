import React from "react";
import {
  ToastProvider,
  ToastProviderProps,
} from "./components/ToastProvider";

export const ToastEventType = "ryfrea-toast" as const;

export const initToast = <T extends Record<string, any>>() => {
  return {
    toast: (args: T) => {
      document.dispatchEvent(
        new CustomEvent(ToastEventType, { detail: args })
      );
    },
    ToastProvider: (props: ToastProviderProps<T>) => (
      <ToastProvider {...props} />
    ),
  };
};
