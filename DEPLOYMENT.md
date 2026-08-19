# Deploying Hum Qadam to Railway

## Why this setup

- **One Railway project, two services** (`backend`, `frontend`) — Railway
  supports a monorepo by letting each service point at a different **Root
  Directory** within the same GitHub repo, so one project covers both.
- **Backend must be an always-on service, not serverless.** It does two
  things a cold-starting/scale-to-zero platform can't do reliably: hold a
  persistent WhatsApp webhook listener, and run `node-cron` jobs *in-process*
  at 4:50am/1:55pm PKT (`plan/13`). If the service were asleep at 4:50am, the
  morning check-in — this product's entire daily promise — just wouldn't
  fire. Railway services stay running by default (unlike some competitors'
  free tiers), which is exactly what this needs.
- **Supabase stays external** — it's not something Railway hosts. Both
  services just need its URL/keys as environment variables.
- **Frontend is a static Vite build**, so it needs a tiny static file server
  in front of it. `frontend/package.json` now has `serve` wired up for this
  (`npm start` → `serve -s dist`, listening on Railway's injected `PORT` —
  verified locally before writing this doc).

## Before you start

- A Railway account, with this repo (`github.com/mariakarim-jpg/Hum-Qadam`)
  connected/accessible to it.
- You said you'll fill in real Supabase/Anthropic/Twilio credentials
  *after* deploying — that's fine. Everything below still works: the app
  boots and `/health` responds; anything needing those credentials fails
  loudly (logged, not crashed) until you add them as Railway env vars.

## Step 1 — Create the Railway project

1. railway.app → **New Project** → **Deploy from GitHub repo** → select
   `mariakarim-jpg/Hum-Qadam`.
2. Railway will create one service from the repo root — you'll turn this
   into the backend service in Step 2, then add a second service for the
   frontend in Step 3.

## Step 2 — Backend service

1. Open the service Railway just created → **Settings**.
2. **Root Directory** → set to `backend`. (This is what makes the monorepo
   split work — Railway will now only look inside `backend/` for this
   service, including its `railway.toml`, which already sets the health
   check path and restart policy.)
3. Railway auto-detects Node via Nixpacks from `backend/package.json` — no
   build command needed beyond the default `npm install`. Start command is
   already set via `backend/railway.toml` (`npm start` → `node src/server.js`).
4. **Variables** tab — add these now (placeholders are fine per your choice
   above; you can edit them later without recreating the service):

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
   MORNING_CHECKIN_CRON=50 4 * * 1-5
   EVENING_REFLECTION_CRON=55 13 * * 1-5
   ```

   Don't set `PORT` — Railway injects it automatically, and `backend/src/config/env.js` already reads it.
   Leave `FRONTEND_URL` unset for now; you'll come back to it in Step 4.

5. Deploy. Once it's live, open **Settings → Networking** and click
   **Generate Domain** to get a public URL, e.g.
   `https://hum-qadam-backend-production.up.railway.app`.
6. Verify it: `curl https://<your-backend-url>/health` should return
   `{"ok":true}`. This works even with every credential still a placeholder —
   confirmed locally before writing this (see `log/2026-08-17.md`).

## Step 3 — Frontend service

Vite bakes `VITE_*` env vars in **at build time**, not runtime — this is why
the backend has to exist and have a URL *before* you build the frontend.
That's why backend is Step 2 and frontend is Step 3, not the other way round.

1. In the same Railway project: **New → GitHub Repo** → same repo again.
2. **Root Directory** → `frontend`.
3. Build/start commands come from `frontend/railway.toml` (`npm run build`,
   then `npm start` → `serve -s dist`).
4. **Variables**:

   ```
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   VITE_API_BASE_URL=https://<your-backend-url-from-step-2>
   ```

5. Deploy. **Settings → Networking → Generate Domain** for the frontend too,
   e.g. `https://hum-qadam-dashboard-production.up.railway.app`.

## Step 4 — Close the loop: tell the backend about the frontend

Now that the frontend has a real URL, go back to the **backend** service →
**Variables** → set:

```
FRONTEND_URL=https://<your-frontend-url-from-step-3>
```

This is what `server.js`'s CORS config uses to lock the dashboard API down to
just your deployed frontend, instead of allowing any origin (fine for local
dev, not fine once this is public). Redeploy the backend for it to take effect.

## Step 5 — Database schema

Run `backend/src/db/schema.sql` against your Supabase project once (SQL
Editor in the Supabase dashboard, or `psql`) — it creates all 8 tables from
`plan/10-database-schema.md`. Nothing in the app creates tables on its own.

## Step 6 — Point Twilio at the deployed webhook

In the Twilio WhatsApp Sandbox (or your Meta Cloud API config once you're
past pilot, per `plan/13`), set the inbound webhook URL to:

```
https://<your-backend-url>/webhook/whatsapp
```

## Checklist before calling this "live"

- [ ] Real Supabase URL + service-role key + anon key set on the backend
- [ ] `schema.sql` run against that Supabase project
- [ ] Real Anthropic API key set
- [ ] Real Twilio credentials set, webhook URL pointed at the backend
- [ ] `FRONTEND_URL` set on the backend (Step 4)
- [ ] At least one row in `coaches` (with your email) — otherwise the
      dashboard's `requireCoach` middleware will 403 everyone, including you
- [ ] Confirm the Railway plan doesn't sleep/scale-to-zero the backend — the
      whole point of the always-on service is the 4:50am/1:55pm cron jobs

## What this doesn't cover yet

- Custom domains (Railway supports it under each service's Networking
  settings; not required to get this live)
- Postgres Row-Level Security — the backend currently relies on its own
  coach-scoping logic plus the service-role key, not RLS (see
  `backend/README.md`)
- The offline message-queue NFR from `plan/06` — sends are inline; fine at
  pilot scale, worth revisiting before Phase 5 scaling
