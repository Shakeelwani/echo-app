-- Echo database schema for Neon (plain Postgres, no Supabase-specific features)
-- Run once: paste into the Neon SQL Editor (or `psql $DATABASE_URL -f db/schema.sql`)

create extension if not exists pgcrypto;

-- ============================================================
-- 1. USERS
-- Our own auth table since we're not using Supabase Auth.
-- Passwords are hashed with bcrypt before ever reaching the database.
-- ============================================================
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  avatar_url text,
  timezone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_email_idx on users(email);

-- ============================================================
-- 2. ECHOES
-- ============================================================
create type echo_type as enum ('todo','question','prediction','promise','letter','goal','freeform');
create type echo_status as enum ('sealed','ready','opened','answered');

create table if not exists echoes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type echo_type not null,
  title text not null,
  content text not null,
  unlock_at timestamptz not null,
  timezone text not null default 'UTC',
  status echo_status not null default 'sealed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  opened_at timestamptz,
  answered_at timestamptz
);

create index if not exists echoes_user_id_idx on echoes(user_id);
create index if not exists echoes_unlock_at_idx on echoes(unlock_at);
create index if not exists echoes_status_idx on echoes(status);
create index if not exists echoes_created_at_idx on echoes(created_at);

-- ============================================================
-- 3. ECHO ANSWERS
-- ============================================================
create type echo_result as enum ('correct','partially_correct','wrong','completed','partially_completed','not_completed');

create table if not exists echo_answers (
  id uuid primary key default gen_random_uuid(),
  echo_id uuid not null references echoes(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  answer text not null,
  result echo_result,
  created_at timestamptz not null default now()
);

create index if not exists echo_answers_echo_id_idx on echo_answers(echo_id);
create index if not exists echo_answers_user_id_idx on echo_answers(user_id);

-- ============================================================
-- 4. NOTIFICATIONS (architecture only — sending requires an email
--    provider to be wired up separately; see README)
-- ============================================================
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  echo_id uuid references echoes(id) on delete cascade,
  type text not null default 'echo_ready',
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_id_idx on notifications(user_id);
create index if not exists notifications_scheduled_for_idx on notifications(scheduled_for);

-- ============================================================
-- 5. updated_at triggers
-- ============================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on echoes;
create trigger set_updated_at before update on echoes
  for each row execute procedure set_updated_at();

drop trigger if exists set_updated_at on users;
create trigger set_updated_at before update on users
  for each row execute procedure set_updated_at();

-- ============================================================
-- NOTE ON SECURITY MODEL
-- Supabase's Postgres gave us Row Level Security tied to auth.uid().
-- Plain Neon Postgres has RLS available too, but wiring it to Auth.js
-- sessions requires setting a Postgres session variable per request,
-- which adds real complexity for a hobby-scale app. Instead, every
-- query in this app is written to always filter by user_id, taken
-- from the server-side Auth.js session — never from client input.
-- See src/lib/db.ts and src/app/actions/echoes.ts.
-- ============================================================
