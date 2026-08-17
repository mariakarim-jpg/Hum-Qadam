---
name: daily-wrap-up
description: Read today's notes and write a short dated done/doing/next summary to a log/ file
---

# Daily Wrap-Up

## When to use

At the end of a work session, before closing out for the day — so the next
session (yours or a coach's) can see what happened without re-reading every
file that changed. Use it once per work day, not once per message.

## Steps

1. Gather today's notes. Check, for whatever is dated today:
   - `git diff` / `git status` — what actually got changed
   - The latest entry (or entries) in `memory.md`
   - Any new/edited files in `notes/`, `plan/`, `.claude/`
2. Sort what you found into three buckets:
   - **Done** — finished and committed/verified today
   - **Doing** — started today but not finished (partial edits, open questions, a decision not yet logged)
   - **Next** — the concrete next step, not a vague intention. If nothing is queued, write "Nothing queued — pick up from `bd ready`" rather than leaving it blank.
3. Write it as a short dated block — a few bullets per section, not paragraphs.
   No wall of text; this should be readable in under 30 seconds.
4. Save it to `log/YYYY-MM-DD.md` (one file per day, not one growing file —
   keeps each entry lazy-loadable on its own, same reasoning as
   `notes/decisions.md` Decision 4). If a file for today already exists, add to
   it rather than overwriting.

## Example

Pulled from a real day in this project's history — 2026-08-06, the day the
Memory Tune-Up assessment work happened (see `memory.md` Entries 6 and 7):

**`log/2026-08-06.md`:**
```
# 2026-08-06

**Done:**
- Removed 3 duplicate files and 1 stale CLAUDE.md draft (weekly review)
- Recovered notes/planning.md from git after wrongly deleting it, merged its
  3 unique pieces (FR-11, FR-12, public_holidays table) into plan/
- Split whatsapp-assistant-plan.md into 25 section files under plan/
- Added .claude/skills/whatsapp-message-formatter and
  .claude/agents/weekly-analytics-summary

**Doing:**
- Nothing left mid-flight — all five Memory Tune-Up tasks closed out and pushed

**Next:**
- Reflection doc still needs to be pasted into an actual Google Doc and shared
  (blocked on Google Drive connector auth, not on me)
```
