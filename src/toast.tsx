import React from "react";
import {
  ToastProvider,
  ToastProviderProps,
} from "./components/ToastProvider";
import { UseToastsOpts, useToasts } from "./useToasts";
import { genId } from "./utils";

export const ToastEventType = "ryfrea-toast" as const;

type UnsubscribeFunction = () => void;

export const subscribeToToasts = <T extends Record<string, any>>(
  onToastAdded: (
    toast: T & { removeAfterMs?: number; id: string }
  ) => void,
  channel: string
): UnsubscribeFunction => {
  const listener = (e: Event) => {
    const event = e as Event & {
      detail?: T & { removeAfterMs?: number; id: string };
    };
    if (event.detail && event.detail.id) {
      onToastAdded(event.detail);
    }
  };
  document.addEventListener(channel, listener);
  return () => {
    document.removeEventListener(channel, listener);
  };
};

export const initToast = <T extends Record<string, any>>() => {
  const id = genId();
  const channel = `${ToastEventType}-${id}`;

  return {
    toast: (args: T & { removeAfterMs?: number }) => {
      const id = genId();
      document.dispatchEvent(
        new CustomEvent(channel, { detail: { ...args, id } })
      );
      return id;
    },
    ToastProvider: (props: ToastProviderProps<T>) => (
      <ToastProvider {...props} channel={channel} />
    ),
    useToasts: (opts: UseToastsOpts<T> = {}) =>
      useToasts<T>({ ...opts, channel }),
    subscribeToToasts: (
      onToastAdded: (
        toast: T & { removeAfterMs?: number }
      ) => void
    ) => subscribeToToasts(onToastAdded, channel),
  };
};
