# Memory Tune-Up — Reflection

**Project:** Hum Qadam (WhatsApp multigrade lesson-planning assistant)
**Date:** 2026-08-06

## What Changed in the Project

I ran a real weekly memory review on Hum Qadam rather than a toy example. It
surfaced genuine clutter that had built up over the project's life:

- Three files were byte-identical duplicates of files already living elsewhere
  (`memory.md`, `whatsapp-assistant-plan.md`, `agent_loop.md` all existed twice,
  once at the project root and once under `instructions/`) — removed.
- `instructions/CLAUDE.md` was a pre-merge draft of the project brief, already
  superseded by the root `CLAUDE.md` — removed.
- `notes/planning.md` looked like a stale offline copy at first, but turned out
  to be an independently-rewritten draft carrying real content the canonical
  plan never had: two functional requirements (Vacation/Pause Mode, Help/Command
  Menu), a `public_holidays` database table other sections already assumed
  existed, and a "Weekly Analytics Summary" prompt with no equivalent anywhere
  else. I merged all three back into the canonical files before deleting it —
  catching this on a second pass after an initial wrong assumption.
- The 1,440-line `whatsapp-assistant-plan.md` is now a short index pointing to
  25 individual section files under `plan/`, and `CLAUDE.md`'s pointers now link
  directly to the relevant file instead of a section number inside one giant
  document.
- Added a new skill file (`whatsapp-message-formatter`) for the formatting rules
  every teacher-facing message has to follow, and a new agent
  (`weekly-analytics-summary`) for the one piece of judgment-heavy, cross-teacher
  synthesis work that wasn't covered by an agent yet.

## What I Understood From the Assignment

The assignment wasn't really about producing five isolated artifacts — it was
about proving I could apply five specific moves *to a real, lived-in project*
without being told exactly what to fix. The hardest part wasn't the mechanical
work (splitting a file, writing a skill template); it was the judgment calls
underneath each move:

- "Flag stale info" required actually diffing files against each other, not
  just eyeballing which one looked older.
- I initially got the `notes/planning.md` call wrong — I assumed a longer,
  out-of-sync file was noise, when it was actually the opposite: a draft that
  kept evolving after the canonical file froze. The real lesson of the
  assignment showed up right there: don't delete on the assumption of
  staleness — diff first, because "out of sync" and "worthless" are not the
  same thing.
- Sorting skills vs. agents wasn't just a checklist — it required asking, for
  each task, whether there was a single correct output shape (skill) or a
  judgment call about what mattered most across multiple sources (agent).

## How I Will Apply This to My Main Project

Hum Qadam *is* my main project, so this was already applied, not a rehearsal
for later:

- I'll treat "keep an offline copy" as a red flag going forward — Decision 4 in
  `notes/decisions.md` explicitly rules out ever letting a second copy of the
  plan exist again, because that's exactly what let `notes/planning.md` drift.
- Before deleting anything that looks like a duplicate or stale file, I'll diff
  it against its supposed "canonical" counterpart first, not just compare file
  age or length.
- As the plan keeps growing, I'll keep it split by section in `plan/` rather
  than letting it re-merge into one file, so future sessions only load what
  they actually need.
- When a new AI-shaped task comes up, I'll explicitly ask "is there one correct
  output shape, or does this need judgment across multiple sources" before
  deciding whether it becomes a skill or an agent, using `notes/backlog.md` as
  the template for that reasoning.
