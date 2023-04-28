---
sidebar_position: 3
---

# `useToasts`

> Returned from `initToast`

Listens to and lets you remove toasts.

## Arguments

Takes one optional argument, which is a options object:

- **`onToastAdded?`**: `(toast: T & { id: string }) => void` A callback for whenever a toast is fired.
- **`removeToastsAfterMs?`**: `number | undefined` Specifies the default timeout for toasts to be auto-removed. (undefined = no auto removal).

## Returns

- **`toasts`**: `Array<T & { id: string }>` The list of current toasts
- **`onRemoveToast`**: `(toastId: string) => void` The list of current toasts
- **`cancelToastTimeout`**: `(toastId: string) => void` Cancels whatever timeout the given toast has for removing itself.
- **`restartToastTimeout`**: `(toastId: string, removeAfterMs?: number) => void` Restarts whatever timeout the given toast has for removing itself.
