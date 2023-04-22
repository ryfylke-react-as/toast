import React from "react";
import {
  ToastProvider,
  ToastProviderProps,
} from "./components/ToastProvider";

export const ToastEventType = "ryfrea-toast" as const;

export type ToastArgs = {
  title: string;
};

export class ToastEvent<
  T extends Record<string, any>
> extends CustomEvent<T> {
  constructor(args: T) {
    super("ryfrea-toast", { detail: args });
  }
}

export const toast = <T extends Record<string, any>>(
  args: T
) => {
  document.dispatchEvent(new ToastEvent(args));
};

export const initToast = <T extends Record<string, any>>() => {
  return {
    toast: (args: T) => toast(args),
    ToastProvider: (props: ToastProviderProps<T>) => (
      <ToastProvider {...props} />
    ),
  };
};
