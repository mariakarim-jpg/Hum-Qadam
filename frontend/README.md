# Hum Qadam — Coach Dashboard

The **only** web UI in this project. Teachers never see a screen — per
CLAUDE.md's Purpose, they interact entirely through WhatsApp. This dashboard
is for coaches, head teachers, and program managers (`plan/03-user-personas.md`
personas 2-4), matching the 5 pages in `../plan/14-dashboard-design.md`.

## Setup

```bash
cp .env.example .env   # fill in Supabase URL/anon key + backend API URL
npm install
npm run dev             # http://localhost:5173, proxies /api to :3000
```

## Pages (plan/14)

| Route | Page | Status |
|---|---|---|
| `/` | Overview | Real — metric cards + flagged-teacher alert panel |
| `/teachers` | Teacher List | Real — filterable by status/school |
| `/teachers/:id` | Teacher Detail | Real — profile, timeline, plans, challenges, AI brief, send-message |
| `/analytics` | Analytics | Real charts for 3 of 4; school comparison is a bar chart, not yet the school×week heatmap plan/14 describes |
| `/reports` | Reports | Weekly summary only; monthly/individual report templates and PDF/CSV export aren't built |

## Auth

Supabase magic-link email auth (`src/pages/Login.jsx`). A signed-in email
must match a row in the backend's `coaches` table with `dashboard_access =
true`, or every API call will 403 — see `backend/src/middleware/auth.js`.

## Structure

```
src/
  lib/         supabaseClient (auth), apiClient (fetch wrapper, attaches the
               Supabase session token to every backend call)
  components/  StatusBadge, MetricCard, AlertPanel, layout/Sidebar+Header
  pages/       one file per plan/14 page, plus Login
```
