---
sidebar_position: 1
---

# 1. Initialize

Create a new file, and initialize `@ryfylke-react/toast` inside of it.

```typescript title="lib/toast.ts"
import { initToast } from "@ryfylke-react/toast";

export type Toast = {
  title: string;
};

export const { toast, useToasts, ToastProvider } =
  initToast<Toast>();
```

You export the various functions that `initToast` returns so that you can use these in your codebase.

Check out the [reference](../Reference/) to see more details about the various functions exported.

:::tip
If you want to add sensible default values to your toasts, [you can create a wrapper](../Examples/#configure-sensible-fallbacks) for the toast-function.
:::
