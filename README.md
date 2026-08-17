# Hum-Qadam

An AI-powered WhatsApp coaching and lesson-planning assistant designed for multigrade teachers in rural schools, providing personalized daily planning support, instructional coaching, and data-driven insights for teacher development.

## Project Layout

| Path | What it is |
|---|---|
| `CLAUDE.md` | Project brief — purpose, hard rules, work style. Read this first. |
| `plan/` | The full 25-section implementation plan, one file per section (index: `whatsapp-assistant-plan.md`) |
| `notes/` | Decision log (`decisions.md`), planning index (`planning.md`), session journal (`../memory.md`) |
| `.claude/skills/`, `.claude/agents/` | Reusable AI skills and agents built for this project |
| `backend/` | Node/Express API — WhatsApp bot logic + coach dashboard API (see `backend/README.md`) |
| `frontend/` | React coach dashboard (see `frontend/README.md`) — the only web UI; teachers interact entirely via WhatsApp |

## Getting Started

This is still pre-Phase-1 against the roadmap (`plan/17-development-roadmap.md`)
— see `notes/planning.md` for current status and immediate priorities.

To run the scaffolded application locally:

```bash
# Backend
cd backend && cp .env.example .env   # fill in real Supabase/Anthropic/Twilio keys
npm install && npm test              # unit tests run with zero external credentials
npm run dev                          # http://localhost:3000

# Frontend (separate terminal)
cd frontend && cp .env.example .env  # fill in Supabase URL/anon key
npm install
npm run dev                          # http://localhost:5173
```

Both boot and serve requests even before real credentials are filled in
(`/health` on the backend returns 200); anything that actually needs
Supabase/Anthropic/Twilio will fail loudly at call time until `.env` is real.
See each package's README for what's genuinely implemented vs. still stubbed.
