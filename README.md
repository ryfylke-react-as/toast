# @ryfylke-react/toast

A simple headless toast solution for your React project.

- [x] Allows you to specify any interface for the toasts.
- [x] Lets you write the component for rendering the toasts yourself.
- [x] Optional configurable delayed removing of toasts

## Installation

```shell
yarn add @ryfylke-react/toast
```

## Quick guide

You can render the toasts using either

- `useToasts` (React hook)
- `ToastProvider` (HOC / convenient wrapper for hook)
- `subscribeToToasts` (Event listener for use outside of React)

These are returned from `initToast`. We recommend using either `useToasts` or `ToastProvider` when using this library with React.

```tsx
// toast.ts
import { initToast } from "@ryfylke-react/toast";

export type Toast = {
  title: string;
};

export const { toast, ToastProvider } = initToast<Toast>();
```

```tsx
// App.tsx
import { ToastProvider } from "./toast";

const App = () => {
  return (
    <>
      <ToastProvider
        portal={document.body}
        removeToastsAfterMs={3000}
        renderToasts={(props) => {
          return (
            <div className="toasts-container">
              {props.toasts.map((toast) => (
                <button
                  key={toast.id}
                  className="toast"
                  onClick={() => props.onRemoveToast(toast.id)}
                >
                  {toast.title}
                </button>
              ))}
            </div>
          );
        }}
      />
      <Elsewhere />
    </>
  );
};
```

```tsx
// Elsewhere.tsx
import { toast } from "./toast";

export const Elsewhere = () => {
  return (
    <button
      onClick={() => {
        toast({ title: "Hi!" });
      }}
    >
      Toast me!
    </button>
  );
};
```

## Reference

### `initToast<T>`

**Arguments**:
Takes one [Typescript generic](https://www.typescriptlang.org/docs/handbook/2/generics.html) to specify the desired toast interface. The generic should extend `Record<string, any>`.

**Returns**:

The following (`toast`, `useToasts`, `ToastProvider` & `subscribeToToasts`):

### `toast`

Takes whatever interface you specified as a generic when initializing with `initToast`, as well as an optional argument:

- `removeAfterMs` - (optional) Lets you specify a delay for this specific toast to be removed after.

### `useToasts`

**Arguments**:

- `onToastAdded` - _(optional)_ A function that is run whenever a new toast is dispatched. Returns the toast in its argument. Useful for logging the toasts, or syncing them with an external store.
- `removeToastsAfterMs` - _(optional)_ Determines if toasts should be removed from the list, and how long they should stay. (`number | undefined`)

**Returns**:

- `toasts` - A list of all current toasts.
- `onRemoveToast` - A function that takes one argument, `toastId: string`, and removes the given toast from the internal list.

### `ToastProvider`

**Arguments**:
Same arguments as `useToasts`, but laid out in a different manner:

- `renderToasts` - Takes a function that returns a ReactElement. Has the following props:
  - `toasts` - The list of toasts
  - `onRemoveToast` - A function that takes one argument, `toastId: string`.
- `removeToastsAfterMs` - _(optional)_ An argument that lets you configure a timeout for automatically removing the toast from the list.
- `onToastAdded` - _(optional)_ A function that is run whenever a new toast is dispatched. Returns the toast in its argument. Useful for logging the toasts, or syncing them with an external store.
- `portal` - _(optional)_ If supplied, specifies which HTMLElement to render a portal to for `renderToasts`. If not supplied, no portal is rendered.

**Returns**: Whatever `renderToasts` returns.

**Notes**: `ToastProvider` is not strictly nessecary if you are using `useToasts`. This component is just a helper/HOC for utilizing the hook.

### `subscribeToToasts`

Lets you subscribe to toasts outside of React. Takes one argument, `callback` which is a callback function that gets called whenever a new toast is added. Returns a unsubscribe function, that stops listening for events.
