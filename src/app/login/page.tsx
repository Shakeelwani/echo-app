import Link from "next/link";
import Nav from "@/components/Nav";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav authed={false} />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="card p-8 w-full max-w-sm">
          <h1 className="font-display text-2xl mb-6">Log in</h1>
          <LoginForm />
          <p className="text-sm text-[var(--text-secondary)] mt-6">
            New to Echo?{" "}
            <Link href="/signup" className="text-[var(--accent-1)]">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
