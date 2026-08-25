import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const FEATURES = [
  { icon: "🔒", title: "Sealed until the right time", body: "Your message remains locked until the date you choose." },
  { icon: "⏳", title: "Choose your moment", body: "Set exactly when your future self can open it." },
  { icon: "💭", title: "Capture your thoughts", body: "Save memories, goals, predictions, fears, and promises." },
  { icon: "🔔", title: "Never miss an echo", body: "Get notified when a message is ready to be opened." },
  { icon: "📅", title: "Your personal timeline", body: "See your past, present, and future echoes in one place." },
  { icon: "🌍", title: "Available anywhere", body: "Your messages stay connected securely to your account." },
  { icon: "🛡️", title: "Private by default", body: "Your echoes belong only to you." },
  { icon: "✨", title: "Rediscover yourself", body: "Compare who you were with who you've become." },
];

const PROMPTS = [
  "I hope you took that risk.",
  "Did we finally achieve what we dreamed of?",
  "Don't forget why you started.",
  "I wonder if you're still afraid of the same things.",
  "I hope you're proud of me.",
  "Remember this moment.",
];

const USE_CASES = [
  { icon: "🎯", title: "Goals", body: "Write down your goals and see how far you've come." },
  { icon: "💌", title: "A letter", body: "Write something personal to your future self." },
  { icon: "🔮", title: "Predictions", body: "Predict what your life, career, or world will look like." },
  { icon: "🤝", title: "Promises", body: "Make a promise today and let your future self hold you accountable." },
  { icon: "📸", title: "Memories", body: "Capture a moment you never want to forget." },
  { icon: "💡", title: "Ideas", body: "Send your ideas forward and revisit them later." },
];

const STORIES = [
  { quote: "I wrote a message before starting university. Opening it four years later was surreal.", who: "Example Echo user" },
  { quote: "I completely forgot about my message. When it opened, it reminded me of who I used to be.", who: "Example Echo user" },
  { quote: "Reading my old predictions was humbling — and honestly kind of funny.", who: "Example Echo user" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav authed={false} />

      {/* 01 — HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at 50% 20%, rgba(124,111,240,0.14), transparent 70%)",
          }}
        />
        <p className="text-xs tracking-[2px] uppercase text-[var(--text-secondary)] mb-4 relative">
          a message, sealed until it&apos;s ready
        </p>
        <h1 className="font-display font-medium text-4xl md:text-6xl leading-tight max-w-2xl mb-4 relative">
          Talk to your future self.
        </h1>
        <p className="text-[var(--text-secondary)] max-w-md mb-10 relative">
          Write something today. Seal it in time. Rediscover it when the
          future finally arrives.
        </p>
        <div className="flex flex-wrap gap-3 mb-16 relative justify-center">
          <Link href="/signup" className="btn-primary">
            Begin your first echo →
          </Link>
          <a href="#how-it-works" className="btn-ghost">
            See how it works ↓
          </a>
        </div>

        <div className="relative float-slow mb-10">
          <div className="card p-6 w-64 text-left" style={{ background: "rgba(124,111,240,0.08)" }}>
            <div className="text-xs text-[var(--warning)] mb-2">🔒 SEALED</div>
            <div className="font-display text-base mb-1">Dear future me,</div>
            <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
              I hope you&apos;re proud of how far we&apos;ve come.
            </div>
          </div>
        </div>

        <div className="text-xs text-[var(--text-muted)] bounce-down">
          Scroll to discover ↓
        </div>
      </section>

      {/* 02 — THE CONCEPT */}
      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <h2 className="font-display text-3xl md:text-4xl mb-5 leading-tight">
              Some things only make sense with time.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The person you are today is constantly changing. Your fears,
              dreams, goals, and memories evolve with you. Echo lets you
              capture a moment in time and send it forward to the person
              you&apos;re becoming.
            </p>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <div className="relative pl-6">
              <div
                className="absolute top-1 bottom-1"
                style={{ left: 5, width: 1, background: "rgba(255,255,255,0.12)" }}
              />
              {["A promise made", "A question asked", "A letter sealed"].map(
                (label, i) => (
                  <div key={label} className="relative mb-6">
                    <div
                      className="absolute rounded-full"
                      style={{
                        left: -24,
                        top: 4,
                        width: 10,
                        height: 10,
                        background: i === 2 ? "var(--accent-1)" : "rgba(255,255,255,0.3)",
                      }}
                    />
                    <div className="text-sm text-[var(--text-secondary)]">{label}</div>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — HOW IT WORKS */}
      <section id="how-it-works" className="px-6 md:px-10 py-24 max-w-5xl mx-auto w-full">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-14">
            Three moments. One message.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative">
          {[
            { n: "✍️", t: "Write", d: "Write what matters." },
            { n: "🔒", t: "Seal", d: "Choose a future date." },
            { n: "✨", t: "Discover", d: "Meet your past self." },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="card lift-card p-6 h-full">
                <div className="text-2xl mb-3">{s.n}</div>
                <div className="font-display text-lg mb-1.5">{s.t}</div>
                <div className="text-sm text-[var(--text-secondary)]">{s.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — PRODUCT PREVIEW */}
      <section className="px-6 md:px-10 py-24 max-w-3xl mx-auto w-full text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl mb-10">
            A message waiting in time.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="card tilt-card p-7 text-left max-w-md mx-auto">
            <div className="text-xs text-[var(--warning)] mb-3">🔒 SEALED</div>
            <div className="font-display text-lg mb-2">Dear Future Me,</div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              I hope you&apos;re proud of how far we&apos;ve come.
            </p>
            <div className="border-t border-white/10 pt-4">
              <div className="text-xs text-[var(--text-muted)] mb-2">
                Opens on December 31, 2027
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "72%",
                    background: "linear-gradient(90deg,var(--accent-1),var(--accent-2))",
                  }}
                />
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                412 days remaining
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 05 — WRITE TO THE FUTURE */}
      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto w-full">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
            What would you tell your future self?
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PROMPTS.map((p, i) => (
            <Reveal
              key={p}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 80}
            >
              <Link href="/signup" className="block card lift-card p-5 h-full">
                <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                  &ldquo;{p}&rdquo;
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — FEATURES */}
      <section id="features" className="px-6 md:px-10 py-24 max-w-5xl mx-auto w-full">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
            More than just a message.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 80}>
              <div className="card lift-card p-5 h-full">
                <div className="text-xl mb-2.5">{f.icon}</div>
                <div className="text-sm font-semibold mb-1.5">{f.title}</div>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {f.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 07 — TIME TRAVEL TIMELINE */}
      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto w-full">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-14">
            Your story moves forward.
          </h2>
        </Reveal>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-0 relative">
          <div
            className="hidden sm:block absolute left-0 right-0"
            style={{ top: "50%", height: 1, background: "rgba(255,255,255,0.12)" }}
          />
          {[
            { year: "2025", label: "Echo opened", icon: "✨", note: '"My goals for 2025"' },
            { year: "2026", label: "You are here", icon: "🟣", note: '"A message to myself"' },
            { year: "2027", label: "Message waiting", icon: "🔒", note: "Opens December 2027" },
          ].map((t, i) => (
            <Reveal key={t.year} delay={i * 150} className="flex-1 relative z-10">
              <div className="card p-5 mx-2 text-center">
                <div className="text-lg mb-1">{t.icon}</div>
                <div className="text-xs text-[var(--text-muted)] mb-1">{t.year}</div>
                <div className="text-sm font-semibold mb-1">{t.label}</div>
                <div className="text-xs text-[var(--text-secondary)] italic">
                  {t.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 08 — USE CASES */}
      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto w-full">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
            What will you send through time?
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.title} delay={(i % 3) * 100}>
              <div className="card lift-card p-6 h-full">
                <div className="text-xl mb-2.5">{u.icon}</div>
                <div className="font-display text-base mb-1.5">{u.title}</div>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {u.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 09 — YOU THEN / YOU NOW */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto w-full">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-4">
            Meet the person you used to be.
          </h2>
          <p className="text-[var(--text-secondary)] text-center max-w-lg mx-auto mb-12">
            Time changes everything. Echo lets you look back at your old
            hopes, fears, and dreams and see just how far you&apos;ve
            traveled.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <Reveal direction="left">
            <div className="card p-6">
              <div className="text-xs text-[var(--text-muted)] mb-2">YOU THEN — January 2025</div>
              <div className="text-sm text-[var(--text-secondary)] italic">
                &ldquo;I hope I become more confident.&rdquo;
              </div>
            </div>
          </Reveal>
          <div className="hidden sm:block text-[var(--accent-1)] text-xl text-center">→</div>
          <Reveal direction="right" delay={150}>
            <div className="card p-6" style={{ borderColor: "rgba(124,111,240,0.35)" }}>
              <div className="text-xs text-[var(--success)] mb-2">YOU NOW — January 2027</div>
              <div className="text-sm text-[var(--text-primary)]">&ldquo;You did.&rdquo;</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10 — PRIVACY */}
      <section className="px-6 md:px-10 py-24 max-w-3xl mx-auto w-full text-center">
        <Reveal>
          <div className="text-2xl mb-4">🛡️</div>
          <h2 className="font-display text-3xl md:text-4xl mb-5">
            Your thoughts belong to you.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto">
            Every account is private and securely authenticated. Your
            messages are isolated at the database level — no one else can
            read, edit, or access your echoes. Ever.
          </p>
        </Reveal>
      </section>

      {/* 11 — STORIES */}
      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto w-full">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-2">
            Messages that came back at the right time.
          </h2>
          <p className="text-center text-xs text-[var(--text-muted)] mb-12">
            Illustrative examples of how people use Echo
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STORIES.map((s, i) => (
            <Reveal key={s.quote} delay={i * 100}>
              <div className="card p-5 h-full">
                <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed mb-4">
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div className="text-xs text-[var(--text-muted)]">— {s.who}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 12 — FINAL CTA */}
      <section className="relative px-6 py-28 text-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(500px circle at 50% 50%, rgba(124,111,240,0.16), transparent 70%)",
          }}
        />
        <Reveal className="relative">
          <h2 className="font-display text-3xl md:text-5xl mb-4">
            Your future self is waiting.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Write something today. Let time take care of the rest.
          </p>
          <Link href="/signup" className="btn-primary">
            Create your first echo →
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
