-- =============================================================
-- Class Guestbook: database setup for Supabase
-- HOW TO USE: Supabase dashboard -> SQL Editor -> New query
--             Paste this whole file -> click "Run"
-- =============================================================

-- 1. Create the table that stores guestbook messages
create table if not exists public.feedback (
  id          bigint generated always as identity primary key,
  name        text not null check (char_length(name) between 1 and 50),
  message     text not null check (char_length(message) between 1 and 300),
  created_at  timestamptz not null default now()
);

-- 2. Turn ON Row Level Security (RLS).
--    With RLS on, nobody can read or write the table
--    unless a policy below allows it.
alter table public.feedback enable row level security;

-- 3. Policy: anyone visiting the website may READ messages
--    ("drop ... if exists" lets you run this file again without errors)
drop policy if exists "Anyone can read feedback" on public.feedback;
create policy "Anyone can read feedback"
  on public.feedback
  for select
  to anon
  using (true);

-- 4. Policy: anyone visiting the website may ADD a message
--    (they cannot edit or delete, because we add no policy for that)
drop policy if exists "Anyone can add feedback" on public.feedback;
create policy "Anyone can add feedback"
  on public.feedback
  for insert
  to anon
  with check (true);

-- 5. Allow the website (the "anon" role) to use the table through the API.
--    From 30 October 2026 Supabase no longer does this automatically
--    for new tables, so we do it ourselves. Running it earlier is harmless.
grant select, insert on public.feedback to anon;

-- 6. Policies for admin.html: a SIGNED-IN user may READ and DELETE.
--    This is what powers admin.html. Create the admin account in
--    Supabase: Authentication -> Users -> Add user (email + password).
--    Nobody can read or delete this way until they sign in with that account.
--    (A grant alone is not enough - RLS also needs a matching policy,
--    which is why read needs its own policy here even though anon
--    already has one.)
drop policy if exists "Signed-in users can read feedback" on public.feedback;
create policy "Signed-in users can read feedback"
  on public.feedback
  for select
  to authenticated
  using (true);

drop policy if exists "Signed-in users can delete feedback" on public.feedback;
create policy "Signed-in users can delete feedback"
  on public.feedback
  for delete
  to authenticated
  using (true);

grant select, delete on public.feedback to authenticated;

-- 7. Optional: add two sample messages so the page is not empty
insert into public.feedback (name, message) values
  ('Asha',  'Loved the quiz page!'),
  ('Rohan', 'Add a dark mode please');
