# Under the hood

`@ryfylke-react/toast` is built using [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).

When you initialize the library using `initToast`, these things happen:

1. We generate a random event-type with a hardcoded prefix.
2. We configure `toast`, `useToasts`, `ToastProvider` and `subscribeToToasts` to **post to** and **listen to** this event-type (or "channel").
3. We apply the generic types supplied by the user to the utils.
4. We return the utils to the user.

- `useToasts` utilizes `subscribeToToasts` internally with a `useEffect` and some state.

- `ToastProvider` utilizes `useToasts` internally, and exposes some props to help the user render the toast-list.

Really it all boils down subscribing to `CustomEvent`s and exposing some helpers to the user. `useToasts` is just some sugar on top of `subscribeToToasts`, and `ToastProvider` is just some sugar on top of `useToasts`.
