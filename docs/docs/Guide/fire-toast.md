# 3. Fire off a toast

You can now fire off toasts from wherever you want by importing the `toast` function and calling it with the interface you specified in step 1.

```tsx title="DeeplyNestedComponent.tsx"
const Component = () => (
  <button onClick={() => toast({ title: "Hiya!" })}>
    Toast me
  </button>
);
```

You can also pass an extra argument `removeAfterMs` to auto-remove just that one specific toast after the given timeout.
