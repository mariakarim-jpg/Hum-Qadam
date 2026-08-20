# Deploying Hum Qadam

Three supported paths. Same code, same repo, every time — the difference is
who's hosting it and how the 4:50am/1:55pm scheduled jobs (`plan/13`)
actually fire.

- **Option C — Vercel (free, no card required). Recommended if you don't
  want to pay or hand over payment info.** Verified against Vercel's own
  docs: the Hobby plan is free with no billing cycle at all, and a card is
  only ever asked for if you explicitly choose to upgrade to Pro — never for
  Hobby usage itself. The trade-off: Vercel runs the backend as serverless
  functions, not a persistent process, so scheduling is external (same
  `/internal/jobs/*` + external-trigger pattern as Option B).
- **Option A — Railway (paid, ~$5/mo Hobby plan).** Simpler if cost isn't a
  concern: the host never sleeps, so the original in-process `node-cron`
  design just works. Railway no longer has a real free tier.
- **Option B — Render (free tier per their docs, but required a card at
  signup for this project's account — never fully resolved why).** Kept
  here for reference; Option C is the one actually recommended now.

This repo supports all three without rewriting anything — `ENABLE_INTERNAL_CRON`
picks the scheduling mode, and the backend has two interchangeable entry
points: `src/server.js` (persistent process — Railway/Render) and
`api/index.js` (serverless function — Vercel), both built from the same
`src/app.js`. Verified locally before writing this: booted `server.js`
normally, and separately proved `api/index.js`'s exported handler works
correctly with zero `app.listen()` calls anywhere in the process (the exact
thing Vercel's runtime does) — see `backend/test/vercel-handler.smoke.js`.

---

## Option C — Vercel (recommended: free, no card)

### Before you start
- A Vercel account — vercel.com, sign up with GitHub (no card needed for Hobby)
- A free web-form cron service for the scheduled jobs, since Vercel has no
  persistent process to run `node-cron` in. **cron-job.org** is a good pick:
  free, no card, supports custom headers and POST — confirmed before
  recommending it.

### Step 1 — Deploy the backend
1. Vercel dashboard → **Add New... → Project**
2. Import `mariakarim-jpg/Hum-Qadam` (authorize GitHub access if it's your
   first time — same kind of "which repos can Vercel see" prompt as any
   GitHub integration)
3. **Root Directory** → click **Edit** → select `backend`
4. Framework Preset: Vercel should auto-detect **Other** / Node — leave
   Build Command and Output Directory as their defaults (there's no build
   step needed; `api/index.js` + `vercel.json` handle everything)
5. **Environment Variables** — add:
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
   ENABLE_INTERNAL_CRON=false
   JOB_TRIGGER_SECRET=
   ```
   Leave the blank ones as placeholders for now. For `JOB_TRIGGER_SECRET`,
   type any long random string yourself — Vercel doesn't auto-generate one
   the way Render does. `ENABLE_INTERNAL_CRON` **must** stay `false` here —
   unlike Railway/Render this isn't just a recommendation, in-process cron
   structurally cannot run on Vercel's serverless model at all.
6. **Deploy**. Once it's live, the project page shows a URL like
   `https://hum-qadam-backend.vercel.app`
7. Verify: `curl https://hum-qadam-backend.vercel.app/health` → `{"ok":true}`

### Step 2 — Deploy the frontend
Vite bakes `VITE_*` vars in at build time, so backend needs to exist first.

1. **Add New... → Project** again, same repo
2. **Root Directory** → `frontend`
3. Framework Preset: Vercel auto-detects **Vite** — leave Build Command
   (`npm run build`) and Output Directory (`dist`) as the defaults
4. **Environment Variables**:
   ```
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   VITE_API_BASE_URL=https://hum-qadam-backend.vercel.app
   ```
5. **Deploy**. Get its URL, e.g. `https://hum-qadam-dashboard.vercel.app`

### Step 3 — Close the loop
Back on the **backend** project → **Settings → Environment Variables** →
set `FRONTEND_URL` to the frontend's URL from Step 2 → this triggers a
redeploy automatically (or trigger one manually from the Deployments tab).
This is what locks CORS down to just your dashboard.

### Step 4 — Set up the external scheduler (cron-job.org)
1. Sign up at cron-job.org (free, no card)
2. Create a new cronjob:
   - **Title:** Hum Qadam — Morning Check-in
   - **URL:** `https://hum-qadam-backend.vercel.app/internal/jobs/morning-checkin`
   - **Request method:** POST
   - **Custom header:** `X-Job-Secret` = the exact value you typed for
     `JOB_TRIGGER_SECRET` in Step 1
   - **Schedule:** if the interface offers a timezone picker, set it to
     Asia/Karachi (or Pakistan) and schedule 4:50 AM, Monday-Friday. If it's
     UTC-only, use 23:50, Sunday-Thursday instead (same PKT→UTC conversion
     explained in `.github/workflows/morning-checkin.yml`, kept in the repo
     as a reference even though we're not using GitHub Actions here)
3. Create a second cronjob the same way for evening reflection:
   - **URL:** `.../internal/jobs/evening-reflection`
   - **Schedule:** 1:55 PM PKT Mon-Fri, or 8:55 UTC Mon-Fri if UTC-only
4. Most cron-job.org-style services let you **manually trigger a test run**
   — do that for both before trusting the schedule, and confirm you get a
   success response, not a 401 (secret mismatch) or timeout.

### Step 5 — Database schema
Run `backend/src/db/schema.sql` against your Supabase project once (SQL
Editor, or `psql`) — creates all 8 tables from `plan/10-database-schema.md`.

### Step 6 — Point Twilio at the webhook
```
https://hum-qadam-backend.vercel.app/webhook/whatsapp
```

### Vercel checklist
- [ ] Real Supabase/Anthropic/Twilio credentials set on the backend project
- [ ] `schema.sql` run against Supabase
- [ ] `ENABLE_INTERNAL_CRON=false` (must stay this way on Vercel)
- [ ] `VITE_API_BASE_URL` set on frontend, `FRONTEND_URL` set on backend
- [ ] cron-job.org (or similar) configured for both jobs, each manually
      test-triggered and confirmed successful
- [ ] Webhook URL pointed at the backend
- [ ] At least one row in `coaches` (your email) — otherwise `requireCoach`
      403s everyone, including you

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
