# Echo

Talk to your future self. Write a message, prediction, promise, or goal, seal it until a
future date, and answer what actually happened once it unlocks.

**Stack:** Next.js (App Router) + TypeScript + Tailwind + Neon (Postgres) + Auth.js
(credentials-based auth, bcrypt-hashed passwords, no third-party auth service).

## 1. Set up the database

1. Create a free project at neon.tech.
2. Copy the connection string from your project dashboard.
3. Run the schema against it:
   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```
   Or paste the contents of `db/schema.sql` into Neon's built-in SQL Editor and run it.
4. Confirm it worked: Neon's Tables view should show `users`, `echoes`,
   `echo_answers`, and `notifications`.

## 2. Environment variables

Copy `.env.local.example` to `.env.local`:

```
DATABASE_URL=postgres://user:password@ep-xxxx.neon.tech/neondb?sslmode=require
AUTH_SECRET=
```

Generate `AUTH_SECRET` with:
```bash
openssl rand -base64 32
```

Both values are private — `DATABASE_URL` contains your database password and
`AUTH_SECRET` encrypts session tokens. Never commit `.env.local` or expose either
value to the browser.

## 3. Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## 4. Test the persistence requirement

1. Sign up with a new account at `/signup`.
2. You're redirected to `/dashboard`. Create an echo with today's date as the unlock
   date so it's immediately "ready."
3. Refresh the page — the echo is still there (it's in Postgres, not local state).
4. Log out, close the tab, come back later, log back in — same echo, same data.
5. Open a second browser (or incognito window), sign up as a second user, confirm you
   see zero echoes — not the first user's data.
6. Try navigating directly to `/dashboard` while logged out — you're redirected to
   `/login`.

## Security model

Unlike Supabase, plain Postgres on Neon doesn't have Row Level Security wired to your
app's sessions out of the box. Instead, authorization is enforced in code:

- Every read/write server action pulls `user_id` from the server-side Auth.js session
  (`auth()`), never from client-submitted form data.
- Every SQL query that touches `echoes` or `echo_answers` includes
  `where user_id = $currentUser` in the `WHERE` clause — see
  `src/app/actions/echoes.ts`.
- Passwords are hashed with bcrypt before being stored; the app never stores or logs
  plaintext passwords.
- `src/middleware.ts` redirects unauthenticated requests away from `/dashboard` and
  `/timeline` before any page code runs, as defense in depth on top of the query-level
  checks.

## What's implemented vs. architected-only

**Fully working:** signup, login, logout, session persistence across refresh/restart,
protected routes, create/seal/open/answer echoes, dashboard stats, timeline view,
per-query authorization.

**Architected but not wired to a live provider:**
- Email notifications — the `notifications` table exists, but no email actually
  sends. Wiring this up means adding an email provider (e.g. Resend) and a scheduled
  job that checks `unlock_at` against `now()`.
- AI insights — not built yet. Would mean a server action that reads a user's own
  echoes and calls the Anthropic API to summarize patterns.

## Folder structure

```
src/
  app/
    actions/         server actions (auth.ts, echoes.ts) — every write goes through here
    api/auth/         Auth.js route handler
    dashboard/        protected dashboard page + client component
    timeline/         protected timeline page + client component
    login/ signup/    auth pages
    page.tsx          public landing page
  components/         EchoCard, CreateEchoModal, OpenEchoModal, Nav
  lib/
    db.ts             Postgres connection pool + query helper
    types.ts          shared TypeScript types
    echo-helpers.ts   countdown/date formatting
  auth.ts             Auth.js config (credentials provider, bcrypt check)
  middleware.ts        protects /dashboard and /timeline
db/
  schema.sql           tables, indexes — run this against your Neon database
