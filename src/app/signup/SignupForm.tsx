"use client";

import { useActionState } from "react";
import { signUp, type AuthState } from "@/app/actions/auth";

const initialState: AuthState = {};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div>
        <label className="text-xs text-[var(--text-secondary)]" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Jordan Lee"
          className="field mt-1"
        />
      </div>
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
          minLength={8}
          placeholder="At least 8 characters"
          className="field mt-1"
        />
      </div>
      <div>
        <label
          className="text-xs text-[var(--text-secondary)]"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          placeholder="Repeat your password"
          className="field mt-1"
        />
      </div>
      {state.error && (
        <p className="text-sm text-[var(--danger)]">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn-primary mt-2">
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
