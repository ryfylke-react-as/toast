# 3. Fire off a toast

At this point, you are pretty much set up.

You can now fire off toasts from wherever you want by importing the `toast` function and calling it with the interface you specified in step 1.

```tsx title="components/forms/ContactForm.tsx"
import { toast } from "../../lib/toast.ts";

const ContactForm = () => {
  //...
  const onSubmit = async (values) => {
    try {
      const response = await postToServer(values).unwrap();
      form.reset(response.newValues);
      toast({
        title: "✅ Success!",
      });
    } catch (err) {
      toast({
        title: "💩 Error!",
      });
    }
  };

  return <form>{/* ... */}</form>;
};
```

:::tip
You can also pass an extra argument to the toast-function, `removeAfterMs`, to auto-remove _just that one specific toast_ after the given timeout. This property will overwrite any global options specified in `useToasts` or `ToastProvider`.
:::

After calling the `toast` function, your [toast-list](./create-toast-list) should rerender with your new toast in it.
