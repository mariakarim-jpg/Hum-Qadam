# Hum Qadam — Project Skill File

## What This Project Does

Hum Qadam sends daily WhatsApp messages to rural Pakistani teachers who manage two or more grade levels simultaneously, and generates multigrade lesson plans on demand — no app, no login, just WhatsApp. The core problem it solves is the "simultaneity problem": teachers default to sequential teaching (Grade 3 for 30 min, then Grade 5 for 30 min). Hum Qadam enforces and enables true simultaneous multigrade teaching.

---

## Core Purpose in One Sentence

Replace the daily planning burden of a rural multigrade teacher with a 2-minute WhatsApp conversation that produces a pedagogically sound, resource-appropriate lesson plan every morning.

---

## Key Technologies

| Technology | Role |
|---|---|
| **WhatsApp Business API** | Sole delivery channel — all teacher interactions happen here |
| **Claude AI** (claude-haiku-4-5 or claude-sonnet-4-6) | Generates lesson plans, coaching tips, pre-observation briefs |
| **Supabase (PostgreSQL)** | Stores teacher profiles, plans, check-ins, reflections — 8-table schema |
| **Beads (bd)** | Issue tracker; Dolt-backed local DB at `.beads/`; binary at `C:\Users\HP\AppData\Local\Programs\bd\bd.exe` |
| **Node.js / Python** | Planned webhook handler for WhatsApp message events |
| **React / Next.js** | Planned coach dashboard (web) |
| **GitHub** | Remote: `https://github.com/mariakarim-jpg/Hum-Qadam` |

---

## Project Files Map

| File / Folder | Purpose |
|---|---|
| `instructions/whatsapp-assistant-plan.md` | Full 25-section implementation plan — primary source of truth |
| `instructions/CLAUDE.md` | Project brief loaded at session start: hard rules, pointers, work style |
| `instructions/agent_loop.md` | Observe → Decide → Act → Feedback → Improve cycle with a real example |
| `notes/decisions.md` | Architectural decision log |
| `notes/memory.md` | Dated session journal — one real lesson per entry |
| `data/textbook-curriculum.csv` | PCTB curriculum SLO database (not yet built) |
| `.claude/agents/` | Custom Claude Code sub-agents for repetitive workflows |
| `AGENTS.md` | Beads agent integration instructions |

---

## Hard Rules — Never Violate These

1. **No sequential plans** — Both grade levels must be active simultaneously at all times. Never teach one grade first, then the other.
2. **No unavailable resources** — No worksheets if teacher has no printer. No projector-based activities if none confirmed in profile.
3. **No cross-coach data sharing** — Teacher data is visible only to their assigned coach.
4. **No weekend or holiday messages** — Messages are sent on school days only.
5. **All 6 plan components required** — shared opener, simultaneous activities, teacher movement notes, peer learning, low-resource adaptation, shared closing.
6. **Always load teacher profile** — Never ask a teacher to repeat their context.
7. **Stop / Start commands** — Always honour these to pause and resume messages.

---

## Six Required Lesson Plan Components

| # | Component | Description |
|---|---|---|
| 1 | Shared opener | 5 min — one activity that engages all grade levels together |
| 2 | Simultaneous differentiated activities | One grade independent, the other teacher-led — at the same time |
| 3 | Teacher movement notes | Explicit timing: when and how the teacher moves between groups |
| 4 | Switch | Grades swap roles mid-lesson |
| 5 | Peer learning | One cross-grade interaction moment |
| 6 | Shared closing | 5 min — all grades together |

---

## Common Tasks

```bash
# File a new issue
& "C:\Users\HP\AppData\Local\Programs\bd\bd.exe" create --title "Task title" --type task

# Claim and close an issue
& "C:\Users\HP\AppData\Local\Programs\bd\bd.exe" update <id> --claim
& "C:\Users\HP\AppData\Local\Programs\bd\bd.exe" close <id>

# Commit and push a file
git add <file>
git commit -m "Short description"
git push

# List all open issues
& "C:\Users\HP\AppData\Local\Programs\bd\bd.exe" ready
```

---

## Coding Conventions and Patterns

- **Urdu messages** — all teacher-facing text is in simple Urdu; use "aap" (respectful second person); warm and collegial tone
- **Message length** — under 160 words per WhatsApp message; split at 1,000 characters
- **Plan formatting** — use emoji section headers (🌟 Opener, 📚 Grade X, 👩‍🏫 Teacher with Grade Y), numbered steps, short paragraphs
- **Prompt templates** — runtime templates use `{teacher_name}`, `{grades}`, `{subject}`, `{slo_1}`, `{constraints}` placeholder syntax
- **Conversation state machine** — states named `onboarding_start`, `planning_slo_received`, etc.; stored in `conversation_sessions` table
- **Database IDs** — all primary keys are UUID; all foreign keys reference `id` columns
- **Timestamps** — all stored as `TIMESTAMPTZ`; system timezone is `Asia/Karachi` (PKT, UTC+5)

---

## Project-Specific Gotchas

- `bd` is NOT on PATH in PowerShell by default — use full path: `& "C:\Users\HP\AppData\Local\Programs\bd\bd.exe"`
- `structure.md` documents an intended folder layout that does not fully exist on disk — verify before referencing
- `data/` folder is currently empty — `textbook-curriculum.csv` has not been built yet
- The database schema is in **Section 10** of `whatsapp-assistant-plan.md` — 8 tables total
- Two PAT tokens were exposed in chat history and must be revoked on GitHub — go to GitHub Settings → Developer Settings → Personal Access Tokens and revoke any tokens created during the initial setup session (2026-06-26 to 2026-06-28)
- PCTB = Punjab Curriculum and Textbook Board — publisher of government school textbooks used in this project
- SLO = Student Learning Outcome — the measurable lesson objective tied to a textbook page
