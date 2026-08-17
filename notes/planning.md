# Hum Qadam — Planning

A short index of where things stand and what's next — not a copy of the plan
itself. Keeping content in exactly one place (`plan/`) is deliberate; see
`decisions.md` Decision 4. If this file's content differs from `plan/`, `plan/`
wins.

## Where the Full Plan Lives

`whatsapp-assistant-plan.md` is the index into all 25 sections, split under
`plan/`. Don't copy section content into this file — link to it instead.

## Where Everything Else Lives

| Need | Look here |
|---|---|
| Project brief, hard rules | `../CLAUDE.md` |
| Why a past decision was made | `decisions.md` |
| Session-by-session history | `../memory.md` |
| Daily done/doing/next entries | `../log/` |
| AI-shaped task sort (skill vs. agent) | `backlog.md` |
| Built skills | `../.claude/skills/` |
| Built agents | `../.claude/agents/` |

## Current Status (as of 2026-08-17)

The project is still **pre-Phase-1** against the roadmap in
`plan/17-development-roadmap.md`. What's actually been built so far is
infrastructure and documentation, not the roadmap's own Phase 1 work:

**Done:**
- Full 25-section plan, split and indexed (`plan/`)
- `CLAUDE.md` project brief with hard rules, merged with Beads task tracking
- Decision log (`decisions.md`) and session journal (`../memory.md`)
- 4 agents built: `lesson-plan-generator`, `slo-extractor`, `coaching-brief`, `weekly-analytics-summary`
- 2 skills built: `whatsapp-message-formatter`, `daily-wrap-up`
- A `PostToolUse` hook auto-nudging a wrap-up log entry whenever `notes/` changes

**Not started yet (Phase 1 — Manual Validation, per `plan/17`):**
- `data/textbook-curriculum.csv` — still empty (see `data/SKILL.md`)
- No pilot teachers recruited
- No conversation scripts simulated with a real teacher
- No lesson plans generated and rated by a coach
- `outputs/` and `assets/` are both still empty

## Immediate Priorities

Pulled directly from the Phase 1 task table in `plan/17-development-roadmap.md`
— these are the next concrete things to do, in the order the roadmap lists them:

1. Design conversation scripts (Urdu + English) — Coach/PM
2. Recruit 10 pilot teachers via existing WhatsApp groups — Coach
3. Manually simulate a morning check-in with each pilot teacher
4. Manually generate 20 lesson plans (via `lesson-plan-generator`) and have a coach rate them
5. Collect teacher feedback and iterate the conversation scripts

**Milestone:** go/no-go decision for Phase 2, based on pilot teacher feedback and lesson plan quality scores.
