# @ryfylke-react/toast

## Quick guide

```tsx
import { initToast } from "@ryfylke-react/toast";

export type Toast = {
  title: string;
};

export const { toast, ToastProvider } = initToast<Toast>();

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
    </>
  );
};
```

```tsx
import { toast } from "../App";

const Elsewhere = () => {
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
