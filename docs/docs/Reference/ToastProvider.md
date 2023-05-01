---
sidebar_position: 4
---

# `ToastProvider`

> Returned from `initToast`

A component for rendering the toast-list.

:::caution
`ToastProvider` is an _alternative_ to `useToasts`, not a supplement.
:::

## Props

- **`renderToasts`**: Takes a component with the following props:
  - **`toasts`**: `Array<T & { id: string }>` The list of current toasts
  - **`onRemoveToast`**: `(toastId: string) => void` Removes the given toast from the list
  - **`cancelToastTimeout`**: `(toastId: string) => void` Cancels whatever timeout the given toast has for removing itself.
  - **`restartToastTimeout`**: `(toastId: string, removeAfterMs?: number) => void` Restarts whatever timeout the given toast has for removing itself.
- **`removeToastsAfterMs?`**: `number | undefined` Specifies the default timeout for toasts to be auto-removed. (undefined = no auto removal).
- **`onToastAdded?`**: `(toast: T) => void` A function called whenever a new toast is fired.
- **`portal?`** : `HTMLElement` If given, determines where to portal the toast-list to.

## Returns

The component returns a `ReactElement` if no `portal` is specified, otherwise a `ReactPortal`.
