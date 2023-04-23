---
sidebar_position: 4
---

# `ToastProvider`

> Returned from `initToast`

A component for rendering the toast-list.

## Props

- **`renderToasts`**: Takes a component with the following props:
  - **`toasts`**: `Array<T & { id: string }>` The list of current toasts
  - **`onRemoveToast`**: `(toastId: string) => void` Removes the given toast from the list
- **`removeToastsAfterMs?`**: `number | undefined` Specifies the default timeout for toasts to be auto-removed. (undefined = no auto removal).
- **`onToastAdded?`**: `(toast: T) => void` A function called whenever a new toast is fired.
- **`portal?`** : `HTMLElement` If given, determines where to portal the toast-list to.

## Returns

The component returns a `ReactElement` if no `portal` is specified, otherwise a `ReactPortal`.
