---
sidebar_position: 2
---

# 2. Create toast-list

With our utilities exported from `lib/toast.ts`, we can now start building a toast-list.

:::info
The utils exported stay in sync through a unique channel created when `initToast` is called.

This means that when you add a toast using the `toast` function, or remove it using `onRemoveToast`, this will affect every toast-list created from the same `initToast`.

You can also initialize more than once to build separate independent lists.
:::

## Using `useToasts`

See the [reference](../Reference/useToasts) for all exports and options.

```tsx title="components/ToastList.tsx"
import { useToasts } "../lib/toast";

export const ToastList = () => {
    const { toasts, onRemoveToast} = useToasts();

    return (
        <div className="toasts-container">
            {toasts.map((toast) => (
                <div key={toast.id} className="toast">
                    {toast.title}
                    <button onClick={() => props.onRemoveToast(toast.id)}>
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}
```

```tsx title="components/App.tsx"
import { ToastList } from "./ToastList";

const App = () => {
  return (
    <>
      <ToastList />
      {/* ...rest */}
    </>
  );
};
```

You can also take a look at more [examples](../Examples) using `useToasts`, for features like

- Permanent logging of toasts
- Pausing auto-dismissal on hover
- Falling back to default values in the `toast` function.
