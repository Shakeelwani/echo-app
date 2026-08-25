import Link from "next/link";
import Nav from "@/components/Nav";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav authed={false} />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="card p-8 w-full max-w-sm">
          <h1 className="font-display text-2xl mb-6">Create your account</h1>
          <SignupForm />
          <p className="text-sm text-[var(--text-secondary)] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--accent-1)]">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
