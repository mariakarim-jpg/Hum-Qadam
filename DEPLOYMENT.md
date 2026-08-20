# Deploying Hum Qadam

Two supported paths — pick one. Both deploy the same code; the only
difference is how the 4:50am/1:55pm scheduled jobs (`plan/13`) actually fire.

- **Option A — Railway (paid, ~$5/mo Hobby plan).** Simpler: the host never
  sleeps, so the original in-process `node-cron` design just works.
- **Option B — Render (free tier).** More setup: Render's free Web Service
  spins down after 15 min idle, so scheduling is done externally instead
  (see that section for why and how). Free Static Site frontend either way
  doesn't sleep.

This repo supports both without any code changes — it's one env var
(`ENABLE_INTERNAL_CRON`) that decides which scheduling mode is active.

---

## Option A — Railway

### Before you start
- A Railway account with a payment method on file (Railway no longer offers
  a real free tier — trial credit only, then the Hobby plan)
- This repo pushed to GitHub (already true: `mariakarim-jpg/Hum-Qadam`)

### Step 1 — Create the project
1. railway.app → **New Project** → **Deploy from GitHub repo** → select
   `mariakarim-jpg/Hum-Qadam`
2. If GitHub isn't connected yet, Railway will ask to authorize — choose
   "Only select repositories" and pick `Hum-Qadam` (or "All repositories" if
   simpler)
3. Railway creates one service pointed at the repo root — you'll fix that
   in Step 2

### Step 2 — Backend service
1. Open the service Railway just created → **Settings → Root Directory** →
   set to `backend`. This is what makes the monorepo split work; Railway
   will now read `backend/railway.toml` (build/start/health-check config
   already in the repo)
2. **Variables** tab — add:
   ```
   SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=
   SUPABASE_ANON_KEY=
   ANTHROPIC_API_KEY=
   ANTHROPIC_MODEL=claude-sonnet-5
   WHATSAPP_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   TIMEZONE=Asia/Karachi
   ENABLE_INTERNAL_CRON=true
   MORNING_CHECKIN_CRON=50 4 * * 1-5
   EVENING_REFLECTION_CRON=55 13 * * 1-5
   ```
   `ENABLE_INTERNAL_CRON=true` is the key line for this path — it turns the
   in-process scheduler back on, which is safe here because Railway doesn't
   sleep. Leave `JOB_TRIGGER_SECRET` and `FRONTEND_URL` for now (the latter
   comes back in Step 4). Don't set `PORT` — Railway injects it.
3. Deploy → **Settings → Networking → Generate Domain** for a public URL
4. Verify: `curl https://<backend-url>/health` → `{"ok":true}`

### Step 3 — Frontend service
Vite bakes `VITE_*` vars in **at build time**, so backend has to exist
first — that's why it's Step 2, not Step 3.

1. Same Railway project → **New → GitHub Repo** → same repo again
2. **Root Directory** → `frontend` (reads `frontend/railway.toml`)
3. **Variables**:
   ```
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   VITE_API_BASE_URL=https://<backend-url-from-step-2>
   ```
4. Deploy → **Generate Domain** for this service too

### Step 4 — Close the loop
Back on the **backend** service → **Variables** → set:
```
FRONTEND_URL=https://<frontend-url-from-step-3>
```
This is what locks the backend's CORS to just your dashboard. Redeploy.

### Step 5 — Database schema
Run `backend/src/db/schema.sql` against your Supabase project once (SQL
Editor, or `psql`) — creates all 8 tables from `plan/10-database-schema.md`.

### Step 6 — Point Twilio at the webhook
```
https://<backend-url>/webhook/whatsapp
```

### Railway checklist
- [ ] Real Supabase/Anthropic/Twilio credentials set
- [ ] `schema.sql` run against Supabase
- [ ] `ENABLE_INTERNAL_CRON=true` set on the backend
- [ ] `VITE_API_BASE_URL` set on frontend, `FRONTEND_URL` set on backend
- [ ] Webhook URL pointed at the backend
- [ ] At least one row in `coaches` (your email) — otherwise
      `requireCoach` 403s everyone, including you
- [ ] Confirm the Railway plan doesn't sleep the service — the whole point
      of `ENABLE_INTERNAL_CRON=true` depends on that

---

## Option B — Render (free tier)

### The one real trade-off
Render's free Web Services genuinely never expire, but spin down after 15
min idle — the in-process cron would silently miss the 4:50am job on a
sleeping process. The fix already built into the repo: two endpoints,
`POST /internal/jobs/morning-checkin` and `/evening-reflection`
(`backend/src/routes/internal.js`), triggered by an external always-on
scheduler instead of `node-cron`, gated by `JOB_TRIGGER_SECRET`. The
external trigger's own HTTP request is what wakes the sleeping service.

Two ways to run that external trigger — pick one:
- **GitHub Actions** (`.github/workflows/`) — free on a public repo, but
  creating the workflow files requires either a GitHub token with `workflow`
  scope, or pasting them in via GitHub's web editor (fiddly — the exact
  `.github/workflows/...` path with the leading dot has to be typed
  correctly, starting fresh from `github.com/mariakarim-jpg/Hum-Qadam/new/main`
  each time, not from inside a folder you already navigated into)
- **A free web-form cron service** (e.g. cron-job.org) — no code or file
  paths at all: just paste the URL, a custom header, and a schedule into a
  web form. Simpler if the GitHub file editor gives you trouble.

### Steps
1. Render dashboard → **New + → Blueprint** → connect GitHub if needed →
   select `Hum-Qadam` → Render reads `render.yaml` and creates both
   `hum-qadam-backend` (Web Service) and `hum-qadam-dashboard` (Static Site)
2. Fill in the prompted env vars (blank/placeholder is fine for now, except
   leave `JOB_TRIGGER_SECRET` for Render to auto-generate)
3. Get both services' URLs once deployed; verify `/health` on the backend
4. Set `VITE_API_BASE_URL` (frontend) and `FRONTEND_URL` (backend) same as
   Railway Steps 3-4 above — frontend needs a manual redeploy after, since
   static sites don't rebuild on their own from an env var change
5. Wire up whichever external trigger you picked (GitHub Actions secrets +
   workflow files, or cron-job.org job config) to call the two
   `/internal/jobs/*` endpoints with the `X-Job-Secret` header
6. Run `schema.sql` against Supabase, point Twilio's webhook at the backend
   — same as Railway Steps 5-6

### Render checklist
Same as the Railway list above, plus:
- [ ] `ENABLE_INTERNAL_CRON` left `false` (the default) — the external
      trigger is what's actually firing the jobs on this path
- [ ] External scheduler (GitHub Actions or cron-job.org) actually
      configured and test-triggered at least once, confirmed it returns
      success — don't just assume the schedule will fire correctly

---

## What neither path covers yet

- Custom domains (both platforms support it per-service; not required to launch)
- Postgres Row-Level Security — the backend relies on its own coach-scoping
  logic plus the service-role key, not RLS (see `backend/README.md`)
- The offline message-queue NFR from `plan/06` — sends are inline; fine at
  pilot scale, worth revisiting before Phase 5 scaling
- PDF/CSV report export (`plan/14` Page 5) — JSON only right now
