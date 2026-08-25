"use client";

import { useActionState } from "react";
import { logIn, type AuthState } from "@/app/actions/auth";

const initialState: AuthState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(logIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div>
        <label className="text-xs text-[var(--text-secondary)]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="name@example.com"
          className="field mt-1"
        />
      </div>
      <div>
        <label
          className="text-xs text-[var(--text-secondary)]"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="field mt-1"
        />
      </div>
      {state.error && (
        <p className="text-sm text-[var(--danger)]">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn-primary mt-2">
        {pending ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}
