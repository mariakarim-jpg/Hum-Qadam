# Hum Qadam — AI Task Backlog: Skills vs. Agents

Sorting the AI-shaped work this project actually needs, from the real requirements
and prompts in `plan/`, into "single mechanical pass → skill file" vs. "multi-step,
judgment-heavy, needs to synthesize across data → agent." Written 2026-08-06.

## Skill-shaped (single pass, deterministic, no exploration needed)

1. **Format any teacher-facing message to house style** (`plan/09`, CLAUDE.md §4) —
   fixed rules (word/char limits, tone, structure) applied the same way every time.
   → Built: `.claude/skills/whatsapp-message-formatter/SKILL.md`
2. **Classify a reported challenge into a category** (`plan/15` — student_engagement,
   independent_work, time_management, etc.) — one input, one output, fixed category
   list, no cross-referencing other data.
3. **Generate a coaching tip after a single reported challenge** (`plan/09`'s
   "Prompt for Coaching Tip") — one prompt template, one challenge, one tip. No
   need to look at the teacher's broader history.
4. **Draft the daily morning check-in / evening reflection message** (`plan/25`
   Appendix A templates) — pure templating from teacher name + day of week.

## Agent-shaped (multi-step, needs judgment, synthesizes across sources)

5. **Generate a full multigrade lesson plan** (`plan/12`) — collects several
   inputs, applies pedagogy rules, validates its own output against 6 required
   components, retries on failure. → Already built: `.claude/agents/lesson-plan-generator.md`
6. **Extract SLOs from raw textbook content into the curriculum database** (`data/SKILL.md`) —
   reads unstructured source material, makes judgment calls about what counts as
   an SLO, formats for a specific CSV schema. → Already built: `.claude/agents/slo-extractor.md`
7. **Generate a pre-observation coaching brief** (`plan/09`) — pulls plans,
   reflections, challenges, and completion rate for one teacher and synthesizes a
   pattern + observation focus. → Already built: `.claude/agents/coaching-brief.md`
8. **Generate the weekly cluster analytics summary** (`plan/09`'s "Prompt for
   Weekly Analytics Summary") — pulls check-in rates, planning rates, subject
   coverage, challenge frequency, and flagged-teacher counts across an entire
   cluster, then has to *judge* which single pattern matters most and what the
   highest-priority action is. Cross-teacher synthesis + a real judgment call,
   not a template fill. **Not yet built — strongest remaining agent candidate.**
   → Built: `.claude/agents/weekly-analytics-summary.md`

## Why the split holds

Items 1–4 have exactly one correct shape of output per input — there's no
"which piece of context matters most" decision to make, so a skill file (steps +
example) covers them completely. Items 5–8 all require pulling from more than one
source and deciding what's salient before writing anything — that's the judgment
call a skill's fixed steps can't capture, which is what an agent's system prompt
and reasoning are for.
