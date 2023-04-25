import "@testing-library/dom";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { describe, expect, it } from "vitest";
import { initToast } from "../../src/toast";

describe("useToasts", () => {
  it("receives toasts", async () => {
    const user = userEvent.setup();
    const { useToasts, toast } = initToast<{ title: string }>();
    const Toasts = () => {
      const { toasts } = useToasts({});
      return (
        <ul>
          {toasts.map((toast) => (
            <li key={toast.id}>{toast.title}</li>
          ))}
        </ul>
      );
    };
    let i = 0;
    const App = () => {
      return (
        <>
          <Toasts />
          <button
            onClick={() => {
              i += 1;
              toast({ title: `Toast ${i}` });
            }}
          >
            Toast
          </button>
        </>
      );
    };
    render(<App />);
    expect(document.querySelectorAll("li").length).toBe(0);
    user.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(document.querySelectorAll("li").length).toBe(1)
    );
  });

  it("is possible to remove a toast", async () => {
    const user = userEvent.setup();
    const { useToasts, toast } = initToast<{ title: string }>();
    const Toasts = () => {
      const { toasts, onRemoveToast } = useToasts({});
      return (
        <ul>
          {toasts.map((toast) => (
            <li key={toast.id}>
              {toast.title}{" "}
              <button onClick={() => onRemoveToast(toast.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      );
    };
    let i = 0;
    const App = () => {
      return (
        <>
          <Toasts />
          <button
            onClick={() => {
              i += 1;
              toast({ title: `Toast ${i}` });
            }}
          >
            Toast
          </button>
        </>
      );
    };
    render(<App />);
    expect(document.querySelectorAll("li").length).toBe(0);
    user.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(document.querySelectorAll("li").length).toBe(1)
    );
    user.click(screen.getByRole("button", { name: "Remove" }));
    await waitFor(() =>
      expect(document.querySelectorAll("li").length).toBe(0)
    );
  });

  it("is possible to configure automatic toast removals", async () => {
    const user = userEvent.setup();
    const { useToasts, toast } = initToast<{ title: string }>();
    const Toasts = () => {
      const { toasts } = useToasts({
        removeToastsAfterMs: 300,
      });
      return (
        <ul>
          {toasts.map((toast) => (
            <li key={toast.id}>{toast.title} </li>
          ))}
        </ul>
      );
    };
    let i = 0;
    const App = () => {
      return (
        <>
          <Toasts />
          <button
            onClick={() => {
              i += 1;
              toast({ title: `Toast ${i}` });
            }}
          >
            Toast
          </button>
        </>
      );
    };
    render(<App />);
    expect(document.querySelectorAll("li").length).toBe(0);
    user.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(document.querySelectorAll("li").length).toBe(1)
    );
    await waitFor(
      () =>
        expect(document.querySelectorAll("li").length).toBe(0),
      { timeout: 500 }
    );
  });

  it("is possible to configure automatic toast removal on a per toast basis", async () => {
    const user = userEvent.setup();
    const { useToasts, toast } = initToast<{ title: string }>();
    const Toasts = () => {
      const { toasts } = useToasts();
      return (
        <ul>
          {toasts.map((toast) => (
            <li key={toast.id}>{toast.title} </li>
          ))}
        </ul>
      );
    };
    let i = 0;
    const App = () => {
      return (
        <>
          <Toasts />
          <button
            onClick={() => {
              i += 1;
              toast({ title: `Toast ${i}`, removeAfterMs: 400 });
            }}
          >
            Toast
          </button>
        </>
      );
    };
    render(<App />);
    expect(document.querySelectorAll("li").length).toBe(0);
    user.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(document.querySelectorAll("li").length).toBe(1)
    );
    await waitFor(
      () =>
        expect(document.querySelectorAll("li").length).toBe(0),
      { timeout: 500 }
    );
  });

  it("is possible to subscribe to toasts outside of react", async () => {
    const user = userEvent.setup();
    const { subscribeToToasts, toast } = initToast<{
      title: string;
    }>();
    const App = () => {
      useEffect(() => {
        const unsubscribe = subscribeToToasts((toast) => {
          document.getElementById("app")!.innerHTML =
            toast.title;
        });
        return () => unsubscribe();
      }, []);
      return (
        <div id="app">
          <button onClick={() => toast({ title: "Foobar" })}>
            Toast
          </button>
        </div>
      );
    };
    render(<App />);
    user.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByText("Foobar")).toBeInTheDocument()
    );
  });
});

describe("initToast", () => {
  it("is possible to have separate toast channels", async () => {
    const user = userEvent.setup();
    const toastOneUtils = initToast<{
      title: string;
    }>();
    const toastTwoUtils = initToast<{
      title: string;
    }>();
    const Toasts = () => {
      const { toasts } = toastOneUtils.useToasts();
      return (
        <ul>
          {toasts.map((toast) => (
            <li key={toast.id}>{toast.title} </li>
          ))}
        </ul>
      );
    };
    const App = () => {
      return (
        <>
          <Toasts />
          <button
            onClick={() =>
              toastOneUtils.toast({ title: "Toast 1" })
            }
          >
            Should work
          </button>
          <button
            onClick={() =>
              toastTwoUtils.toast({ title: "Toast 2" })
            }
          >
            Should not work
          </button>
        </>
      );
    };
    render(<App />);
    expect(screen.queryByRole("listitem")).toBeNull();
    user.click(
      screen.getByRole("button", { name: "Should not work" })
    );
    await waitFor(() => new Promise((r) => setTimeout(r, 100)));
    await waitFor(() =>
      expect(screen.queryByText("Toast 2")).toBeNull()
    );
    user.click(
      screen.getByRole("button", { name: "Should work" })
    );
    await waitFor(() =>
      expect(screen.getByText("Toast 1")).toBeVisible()
    );
  });
});
