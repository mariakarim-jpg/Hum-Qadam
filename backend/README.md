# Hum Qadam — Backend

WhatsApp bot + coach dashboard API. Source of truth for behavior is `../plan/`
(the split implementation plan) and `../CLAUDE.md` (hard rules and style).

## Stack

Node.js 20 + Express, Supabase (Postgres), Anthropic Claude, Twilio WhatsApp
(swap for Meta Cloud API at scale — see `plan/13-whatsapp-integration-workflow.md`
and `plan/22-scaling-strategy.md`).

## Setup

```bash
cp .env.example .env   # fill in real Supabase/Anthropic/Twilio credentials
npm install
```

Run `src/db/schema.sql` against your Supabase project (SQL editor, or `psql`)
before starting the server — it creates all 8 tables from `plan/10-database-schema.md`.

```bash
npm run dev     # node --watch, local development
npm start        # production
npm test         # runs test/*.test.js
```

## Scheduling: two ways, pick one per environment

`src/jobs/morningCheckin.js` and `eveningReflection.js` are the actual job
logic (plan/13). They can be triggered two ways:

- **In-process `node-cron`** (`src/jobs/scheduler.js`) — only works if the
  host never sleeps. Enable with `ENABLE_INTERNAL_CRON=true`.
- **External HTTP trigger** (`src/routes/internal.js`,
  `POST /internal/jobs/morning-checkin` + `/evening-reflection`, guarded by
  `JOB_TRIGGER_SECRET`) — works regardless of whether the host sleeps,
  because the triggering request itself wakes it. This is the default
  (`ENABLE_INTERNAL_CRON=false`), used by `.github/workflows/*.yml` against
  the free Render deploy — see `../DEPLOYMENT.md`.

If you deploy somewhere always-on later, either works; internal cron is
simpler if you don't need the external scheduler for anything else.

## What's real vs. stubbed

**Actually implemented, not just scaffolded:**
- The conversation state machine (`src/conversation/`) — onboarding, planning,
  reflection, and command flows, matching `plan/08` state-for-state
- The six-component + banned-resource plan validator
  (`src/services/planValidationService.js`) — has real unit tests in `test/`
  that pass without any external credentials
- WhatsApp message splitting at 1,000 characters
  (`src/services/whatsappService.js`), per CLAUDE.md §4
- School-day / public-holiday logic (`src/services/schoolDayService.js`)
- Coach-scoping on every dashboard query (`src/repositories/coachRepository.js`)
  — the Hard Rule "never share a teacher's data with anyone outside their
  assigned coach" is enforced here, not left to each route to remember
- Both scheduling paths above — verified by actually booting the server and
  hitting `/internal/jobs/morning-checkin` with no secret (401), the wrong
  secret (401), and the right secret (ran, failed gracefully against a
  placeholder Supabase URL rather than crashing the process)

**Needs real credentials/integration work before it actually runs:**
- Every Supabase, Anthropic, and Twilio call — this scaffold assumes valid
  keys in `.env`; nothing here has been run against live services
- PDF/CSV report export (`plan/14` Page 5) — `src/routes/dashboard/reports.js`
  returns JSON only
- The offline message queue / retry-on-API-downtime NFR from `plan/06` — sends
  are inline; a production build should put them behind a real queue
- Postgres Row-Level Security policies — the backend currently relies on its
  own coach-scoping logic plus the Supabase service-role key, not RLS

## Project layout

```
src/
  config/        env loading, Supabase client, hard-rule constants
  db/            schema.sql (source: plan/10)
  repositories/  one file per table, thin Supabase query wrappers
  services/      aiService (plan/09 prompts), whatsappService, plan
                 validation, school-day logic, dashboard analytics
  conversation/  state machine + one handler per flow (plan/08)
  routes/        webhook.js (inbound WhatsApp), internal.js (job triggers)
                 + routes/dashboard/* (coach-scoped API for the frontend)
  middleware/    auth (Supabase JWT -> coach), error handling
  jobs/          morning check-in, evening reflection (plan/13) + the
                 optional in-process node-cron scheduler
```
