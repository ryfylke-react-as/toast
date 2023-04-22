# @ryfylke-react/toast

A simple headless toast solution for your React project.

- [x] Allows you to specify any interface for the toasts.
- [x] Lets you write the component for rendering the toasts yourself.
- [x] Optional configurable delayed removing of toasts

## Quick guide

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
        renderToasts={(props) => {
          return (
            <div>
              {props.toasts.map((toast) => (
                <div key={toast.id}>{toast.title}</div>
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

## Arguments

### `ToastProvider`

- `renderToasts` - Takes a function that returns a ReactElement. Has the following props:
  - `toasts` - The list of toasts
  - `onRemoveToast` - A function that takes one argument, `toastId: string`.
- `removeToastsAfterMs` - An optional argument that lets you configure a timeout for automatically removing the toast from the list.

### `toast`

Takes whatever interface you specified as a generic when initializing.
