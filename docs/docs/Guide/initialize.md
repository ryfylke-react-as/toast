---
sidebar_position: 1
---

# 1. Initialize

Create a new file, and initialize `@ryfylke-react/toast` inside of it.

```typescript title="toast.ts"
import { initToast } from "@ryfylke-react/toast";

export type Toast = {
  title: string;
};

export const { toast, useToasts, ToastProvider } =
  initToast<Toast>();
```

You export the various functions that `initToast` returns so that you can use these later.
