---
sidebar_position: 2
---

# 2. Create toast-list

You can do this by using `ToastProvider` or using `useToasts`.

### Using `useToasts`

```tsx
import { useToasts } "./toast";

export const Toasts = () => {
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

const App = () => {
    return (
        <div>
            <Toasts />
            {/* ...rest */}
        </div>
    )
}

```

### Using `ToastProvider`

```tsx
import { ToastProvider } "./toast";

export const App = () => {
  return (
    <div>
        <ToastProvider
            renderToasts={(props) => (
                <div className="toasts-container">
                    {props.toasts.map((toast) => (
                        <div key={toast.id} className="toast">
                            {toast.title}
                            <button onClick={() => props.onRemoveToast(toast.id)}>
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
        />
        {/* ...rest */}
    </div>
  );
};
```
