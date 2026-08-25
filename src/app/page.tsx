import Link from "next/link";
import Nav from "@/components/Nav";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav authed={false} />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <p className="text-xs tracking-[2px] uppercase text-[var(--text-secondary)] mb-4">
          a message, sealed until it&apos;s ready
        </p>
        <h1 className="font-display font-medium text-4xl md:text-5xl leading-tight max-w-2xl mb-4">
          Talk to your future self.
        </h1>
        <p className="text-[var(--text-secondary)] max-w-md mb-10">
          Write something today. Open it when tomorrow becomes today.
        </p>
        <div className="flex gap-3 mb-16">
          <Link href="/signup" className="btn-primary">
            Create your first echo
          </Link>
          <Link href="#how-it-works" className="btn-ghost">
            See how it works
          </Link>
        </div>

        <div
          id="how-it-works"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left"
        >
          {[
            {
              n: 1,
              t: "Write",
              d: "Leave a message, prediction, or promise for a future date.",
            },
            {
              n: 2,
              t: "Seal",
              d: "It stays locked away — no peeking before it's time.",
            },
            {
              n: 3,
              t: "Discover",
              d: "Open it, answer what happened, see past meet present.",
            },
          ].map((s) => (
            <div key={s.n} className="card p-5">
              <div className="font-display text-2xl text-[var(--accent-1)] mb-2">
                {s.n}
              </div>
              <div className="text-sm font-semibold mb-1">{s.t}</div>
              <div className="text-sm text-[var(--text-secondary)]">
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
