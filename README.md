# @ryfylke-react/toast

A simple solution for building your own toast management system.

- [x] Allows you to specify any interface for the toasts.
- [x] Lets you write the component for rendering the toasts yourself.

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
