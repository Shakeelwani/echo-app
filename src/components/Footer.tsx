import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 md:px-10 py-12 mt-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="font-display text-lg mb-2">echo</div>
          <p className="text-sm text-[var(--text-secondary)] max-w-xs">
            A message for the person you&apos;re becoming.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-[var(--text-muted)] mb-3">
            Product
          </div>
          <ul className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-[var(--text-muted)] mb-3">
            Company
          </div>
          <ul className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
            <li>
              <Link href="/signup">Get started</Link>
            </li>
            <li>
              <Link href="/login">Log in</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto border-t border-white/10 mt-10 pt-6 text-xs text-[var(--text-muted)]">
        © 2026 Echo. Made for moments worth remembering.
      </div>
    </footer>
  );
}