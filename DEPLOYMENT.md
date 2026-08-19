# Deploying Hum Qadam to Render (free tier)

> Originally planned for Railway (see `plan/16-technical-architecture.md`),
> but Railway no longer has a real free tier — it now requires a paid Hobby
> plan (with a payment method on file) to deploy from GitHub at all. This
> doc covers the free path instead: **Render**. `backend/railway.toml` and
> `frontend/railway.toml` are still in the repo in case you switch back
> later; they're unused by this walkthrough.

## Why this setup, and the one real trade-off

- **One thing verified before writing this doc:** Render's free tier has no
  expiration or trial credit (unlike Railway's current model) — free Web
  Services and free Static Sites can run indefinitely at $0. The catch: a
  free **Web Service** spins down after **15 minutes with no inbound
  traffic**, and takes about a minute to wake back up on the next request.
  Free **Static Sites** do not spin down at all — they're served directly,
  no cold start.
- **That spin-down is a real problem for this app specifically.** The
  backend's whole job is to fire a WhatsApp message at 4:50am and 1:55pm PKT
  every school day (`plan/13`) using `node-cron` running *inside* the Node
  process. If the process is asleep at 4:50am — which it will be, since
  nothing hits it overnight — the timer never fires. Silently missing the
  morning check-in breaks this product's entire daily promise.
- **The fix, already built into the repo:** scheduling was moved out of the
  process entirely. Two endpoints — `POST /internal/jobs/morning-checkin`
  and `POST /internal/jobs/evening-reflection` (`backend/src/routes/internal.js`)
  — run the exact same job functions the old in-process cron called, but are
  triggered by an **external, always-on scheduler**: two GitHub Actions
  workflows (`.github/workflows/morning-checkin.yml`,
  `evening-reflection.yml`), each on a `schedule:` cron, converted to UTC.
  GitHub's own scheduler doesn't sleep, and the HTTP request it sends is
  exactly what wakes Render's sleeping backend up. Protected by a shared
  secret (`JOB_TRIGGER_SECRET`) so it can't be triggered by anyone else.
- **Split of services:** backend = free Web Service (Node), frontend = free
  Static Site (just the built `dist/` folder, no Node process needed —
  simpler *and* doesn't sleep). Supabase stays external either way.

## Before you start

- A Render account (render.com — email or GitHub sign-in, no card required
  for the free tier itself)
- This repo pushed to GitHub (already true: `mariakarim-jpg/Hum-Qadam`)
- You're deploying now with placeholder credentials, filling in real
  Supabase/Anthropic/Twilio values after — that's fine, same as before.

## Step 1 — Deploy both services from `render.yaml`

The repo has a Render **Blueprint** (`render.yaml`) that defines both
services at once, so you don't hand-configure each one.

1. Render dashboard → **New +** → **Blueprint**
2. Connect your GitHub account if you haven't (same kind of authorization
   flow as any GitHub integration — Render asks which repos it can see;
   select or allow `mariakarim-jpg/Hum-Qadam`)
3. Select the repo → Render reads `render.yaml` and shows you both services
   it's about to create: `hum-qadam-backend` (Web Service) and
   `hum-qadam-dashboard` (Static Site)
4. You'll be prompted for every env var marked `sync: false` in
   `render.yaml` — for now, leave the ones you don't have yet blank (or type
   a placeholder), **except** `JOB_TRIGGER_SECRET`, which Render generates
   for you automatically (`generateValue: true`) — you don't type that one.
5. Click **Apply** / **Create**. Render builds and deploys both.

If you'd rather do it by hand instead of via Blueprint: **New + → Web
Service** for the backend (Root Directory `backend`, Build Command
`npm install`, Start Command `npm start`, Health Check Path `/health`,
Plan: Free), then **New + → Static Site** for the frontend (Root Directory
`frontend`, Build Command `npm install && npm run build`, Publish Directory
`dist`, Plan: Free) — then add the same env vars from `render.yaml` manually
in each service's **Environment** tab.

## Step 2 — Get both URLs, then close the loop

1. Once deployed, each service's dashboard page shows its public URL —
   something like:
   - Backend: `https://hum-qadam-backend.onrender.com`
   - Frontend: `https://hum-qadam-dashboard.onrender.com`
2. Verify the backend: `curl https://hum-qadam-backend.onrender.com/health`
   → `{"ok":true}`. Works even with every credential still a placeholder.
3. Vite bakes `VITE_*` vars in **at build time** — go to the frontend
   service's **Environment** tab, set `VITE_API_BASE_URL` to the backend's
   URL from step 1, then trigger a **Manual Deploy** so it rebuilds with the
   right value baked in.
4. Go to the backend service's **Environment** tab, set `FRONTEND_URL` to
   the frontend's URL, save (this redeploys automatically) — this is what
   locks the backend's CORS down to just your dashboard instead of allowing
   any origin.

## Step 3 — Wire up the external scheduler (GitHub Actions)

This is the piece that makes the 4:50am/1:55pm jobs actually fire despite
the backend sleeping when idle.

1. In this GitHub repo: **Settings → Secrets and variables → Actions → New
   repository secret**. Add two:
   - `BACKEND_URL` = your backend's Render URL (no trailing slash), e.g.
     `https://hum-qadam-backend.onrender.com`
   - `JOB_TRIGGER_SECRET` = the exact value Render generated for
     `JOB_TRIGGER_SECRET` on the backend service (copy it from the backend's
     **Environment** tab)
2. That's it — `.github/workflows/morning-checkin.yml` and
   `evening-reflection.yml` are already in the repo, already scheduled.
3. **Test it manually before trusting the schedule:** GitHub repo → **Actions**
   tab → select "Trigger morning check-in" (or the evening one) → **Run
   workflow** → confirm it goes green. A red X here usually means the two
   secrets above don't match, or `BACKEND_URL` has a typo/trailing slash.

## Step 4 — Database schema

Run `backend/src/db/schema.sql` against your Supabase project once (SQL
Editor in the Supabase dashboard, or `psql`) — creates all 8 tables from
`plan/10-database-schema.md`. Nothing in the app creates tables on its own.

## Step 5 — Point Twilio at the deployed webhook

Twilio WhatsApp Sandbox (or Meta Cloud API once past pilot, per `plan/13`) —
set the inbound webhook URL to:

```
https://<your-backend-url>/webhook/whatsapp
```

Twilio's request will hit a sleeping backend the same way any request does
— expect roughly a one-minute delay on the very first message after a quiet
period, not a failure.

## Checklist before calling this "live"

- [ ] Real Supabase URL + service-role key + anon key set on the backend
- [ ] `schema.sql` run against that Supabase project
- [ ] Real Anthropic API key set
- [ ] Real Twilio credentials set, webhook URL pointed at the backend
- [ ] `VITE_API_BASE_URL` set on the frontend, then **manually redeployed**
      (env var changes alone don't rebuild a static site — it needs a new build)
- [ ] `FRONTEND_URL` set on the backend (Step 2.4)
- [ ] `BACKEND_URL` + `JOB_TRIGGER_SECRET` GitHub Actions secrets set, both
      workflows manually run once and confirmed green (Step 3.3)
- [ ] At least one row in `coaches` (with your email) — otherwise the
      dashboard's `requireCoach` middleware will 403 everyone, including you

## What this doesn't cover yet

- Custom domains (Render supports it per-service under **Settings → Custom
  Domains**; not required to get this live)
- The ~1 minute cold-start delay on the backend's first request after 15 min
  idle — acceptable for a pilot, worth revisiting (a paid "keep warm" plan,
  or moving back to Railway/similar once there's budget) before wider rollout
- Postgres Row-Level Security — the backend relies on its own coach-scoping
  logic plus the service-role key, not RLS (see `backend/README.md`)
- The offline message-queue NFR from `plan/06` — sends are inline; fine at
  pilot scale, worth revisiting before Phase 5 scaling
