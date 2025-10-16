# ClozerX UI Starter — Instagram Style + Supabase (Posts)

This starter gives you:
- Instagram-like clean white UI (feed + composer + sidebars)
- Supabase integration for **real posting** (insert & list posts)
- No auth (public posting) for MVP simplicity (policies included below)

## 0) Create a Next.js app
```bash
npx create-next-app clozerx
cd clozerx
```

## 1) Install dependency
```bash
npm install @supabase/supabase-js
```

## 2) Add environment variables (`.env.local`)
Get your values from Supabase **Settings → API**:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3) Create tables in Supabase (SQL)
Open **SQL Editor → New Query** and run:
```sql
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  author_name text,
  content text,
  created_at timestamptz default now()
);

alter table posts enable row level security;

-- MVP policy (public read/insert). Remove or tighten later.
create policy "Public read posts" on posts
  for select using (true);

create policy "Public insert posts" on posts
  for insert with check (true);
```

## 4) Copy these files into your project
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/styles.module.css`
- `src/components/*`
- `src/lib/supabaseClient.ts`
- `public/logo.svg`

## 5) Run
```bash
npm run dev
```
Open http://localhost:3000

---

## Notes
- This MVP uses **client-side** Supabase for simplicity.
- Later, add Auth and switch to server actions/RLS per user.
