# Notes Folder — Skill File

## What Lives Here

Session memory, architectural decisions, and planning notes. This folder documents the thinking behind the project — not the plan itself.

---

## Key Files

| File | Purpose |
|---|---|
| `memory.md` | Dated session journal — one entry per work session, one real lesson per entry |
| `decisions.md` | Architectural decision log — what was chosen, why, what was ruled out |
| `planning.md` | Full copy of implementation plan (89,770 bytes) — for offline reference only |
| `project_brief.md` | Early project brief — superseded by `instructions/CLAUDE.md` |

---

## memory.md Format and Standard

Each entry must have three parts:

```markdown
## Entry N — YYYY-MM-DD

**Task:** What was done this session (one sentence).

**Lesson learned:** The specific, actionable insight — not a summary of what happened,
but what a future session should know or do differently.
```

**Standard:** 5+ entries minimum. A "real lesson" means it is specific enough that a future session could act on it. "Write clearly" fails. "Keep every hard rule specific enough to test — not 'write well' but 'under 160 words, split at 1,000 characters'" passes.

---

## decisions.md Format and Standard

Each entry must have four parts:

```markdown
## Decision N — Title

**Date:** YYYY-MM-DD
**What we decided:** The specific choice made.

**Why:** The real constraint, insight, or evidence that drove the choice.

**What we ruled out:**
- Alternative A — why rejected
- Alternative B — why rejected
- Alternative C — why rejected
```

**Standard:** 3+ entries. The "What we ruled out" section is mandatory — it proves the decision was deliberate and preserves the reasoning for future challenge.

---

## Common Tasks

- **Log a new decision** → Copy entry format from `decisions.md`, fill in all four sections, append to bottom
- **Log a session** → Add new entry to bottom of `memory.md` with today's date in `YYYY-MM-DD` format
- **Check a past decision** → Read `decisions.md`; check "What we ruled out" before re-raising an already-rejected alternative
- **Check what was learned** → Read `memory.md`

---

## Gotcha

`planning.md` is a large file (89,770 bytes) — it is a copy of the implementation plan made before `instructions/whatsapp-assistant-plan.md` became the canonical version. For any authoritative reference, always prefer `instructions/whatsapp-assistant-plan.md`. Do not edit `planning.md` directly.
