"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { query } from "@/lib/db";
import { AuthError } from "next-auth";

export interface AuthState {
  error?: string;
}

interface ExistingUser {
  id: string;
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!name || !email || !password) {
    return { error: "Fill in every field to create your account." };
  }
  if (password.length < 8) {
    return { error: "Use a password with at least 8 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords don't match." };
  }

  const existing = await query<ExistingUser>(
    "select id from users where email = $1",
    [email]
  );
  if (existing.length > 0) {
    return { error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await query("insert into users (name, email, password_hash) values ($1, $2, $3)", [
      name,
      email,
      passwordHash,
    ]);
  } catch {
    return { error: "Something went wrong creating your account. Try again." };
  }

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch {
    return { error: "Account created — please log in." };
  }

  redirect("/dashboard");
}

export async function logIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "That email and password don't match our records." };
    }
    throw err;
  }

  redirect("/dashboard");
}

export async function logOut() {
  await signOut({ redirect: false });
  redirect("/login");
}
