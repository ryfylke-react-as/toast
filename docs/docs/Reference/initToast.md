---
sidebar_position: 1
---

# `initToast`

> Exported from `@ryfylke-react/toast`

## Arguments

`initToast` takes no arguments, but it does accept a **typescript generic** - which specifies your desired toast interface.

## Returns

- **`toast`** - [Described here](./toast)
- **`useToasts`** - [Described here](./useToasts)
- **`ToastProvider`** - [Described here](./ToastProvider)
- **`subscribeToToasts`** - A function that takes one argument, `callback: (toast: T) => void`.

You can use `subscribeToToasts` when outside of React to listen to toast-events.
