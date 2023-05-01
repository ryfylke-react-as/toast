# Examples

This page contains some common use-cases for your reference.

## Paused auto-removal while hovering

If you are using auto-removal in your toast-system, you should ensure that the toast does not dissapear while the user is hovering.

By utilizing `cancelToastTimeout` and `restartToastTimeout`, you can build a system that pauses the timeouts while the user is hovering the toast.

```tsx
const Toasts = () => {
  const utils = useToasts();

  return (
    <ul className="toast-list">
      {utils.toasts.map((toast) => (
        <li key={toast.id}>
          <button
            onMouseEnter={() =>
              utils.cancelToastTimeout(toast.id)
            }
            onMouseLeave={() =>
              utils.restartToastTimeout(toast.id)
            }
            onClick={() => utils.onRemoveToast(toast.id)}
          >
            {toast.title}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

## Configure sensible fallbacks

For example, if you toast interface defines some sort of "status" or "kind", you might want to configure a default timeout based on which kind of toast is fired.

```typescript
type Toast = {
  kind: ToastKind;
  content: ReactNode;
};

const { toast: fireToast } = initToast<Toast>();

const defaultTimeoutMap: Record<ToastKind, number | undefined> =
  {
    error: undefined, // no timeout for error-toasts
    success: 2000,
    info: 2000,
  };

// Export your own custom wrapper
export const toast = (toast: Toast) => {
  return fireToast({
    ...toast,
    removeAfterMs:
      toast.removeAfterMs ?? defaultTimeoutMap[toast.kind],
  });
};
```

## Permanent logging

You can use `onToastAdded` to log the toasts on your server whenever they are fired.

```tsx title="components/ToastList.tsx"
const ToastList = () => {
  const toastUtils = useToasts({
    onToastAdded: (toast) => {
      // Log toast to server
    },
  });

  return (...)
};
```

If you cannot ensure that the toast-list is mounted whenever a toast is added, then you could [create a wrapper](.#configure-sensible-fallbacks) for the toast function itself.
