# Ryfylke React Toast

![ryfrea-toast](https://user-images.githubusercontent.com/1190770/233868385-11ad9ff6-eb21-4a09-80e2-28d9de875a68.png)


A simple headless toast solution for your React project.

- [x] Initialize with any interface you want.
- [x] Write your own components for rendering the toasts.
- [x] Optional configurable delayed removing of toasts

## Installation

```shell
yarn add @ryfylke-react/toast
```
## [Documentation](https://toast.ryfylke.dev)

## Quick guide

> You can also take a look at the [live demo](https://codesandbox.io/s/happy-orla-1hi1k0?file=/src/components/ToastProvider.tsx), if you prefer.

1. Initialize using `initToast`
2. Create your toast-list, using `ToastProvider` or `useToasts`, returned from `initToast`
3. Fire off a toast, using `toast` returned from `initToast`.

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
import { ToastProvider, Toast } from "./toast";

const App = () => {
  return (
    <div className="App">
      <ToastProvider
        portal={document.body}
        removeToastsAfterMs={3000}
        renderToasts={RenderToasts}
      />
      <Elsewhere />
    </div>
  );
};

const RenderToasts = (props: {
  toasts: (Toast & { id: string })[];
  onRemoveToast: (toastId: string) => void;
}) => {
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
}
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

`@ryfylke-react/toast` is fully typescript supported. 

**TLDR:**

```typescript
// import { initToast } from "@ryfylke-react/toast";
type InitToast = <T>() => {
   toast: Toast<T>;
   useToasts: UseToasts<T>;
   ToastProvider: ToastProvider<T>;
   subscribeToToasts: SubscribeToToasts<T>;
}

type Toast<T> = (args: T) => void;

type UseToasts<T> = (args?: {
   onToastAdded?: (toast: T & { id: string }) => void;
   removeToastsAfterMs?: number;
}) => {
   toasts: (T & { id: string })[];
   onRemoveToast: (toastId: string) => void;
}

type ToastProvider<T> = (props: {
  renderToasts: (props: {
    toasts: (T & { id: string })[];
    onRemoveToast: (id: string) => void;
  }) => ReactElement;
  removeToastsAfterMs?: number;
  onToastAdded?: (toast: T) => void;
  portal?: undefined | HTMLElement;
}) => (ReactPortal | ReactElement);

type SubscribeToToasts<T> = (callback: (toast: T & { id: string }) => void) => (() => void);
```

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
