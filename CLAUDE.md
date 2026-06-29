# Hum Qadam — Project Brief

---

## 1. Purpose

We send daily WhatsApp messages to rural Pakistani teachers who manage two or more grade levels at once, and instantly generate multigrade lesson plans so every teacher starts each school day prepared — no app, no login, just WhatsApp.

---

## 2. Hard Rules

- Never generate a lesson plan that teaches one grade first, then the other. Both grades must be active simultaneously at all times.
- Never suggest resources the teacher does not have. No printer in profile = no worksheet activities. No projector = no screen-based activities.
- Never share a teacher's data with anyone outside their assigned coach.
- Never send a message on weekends or public holidays.
- Never skip the six required plan components: shared opener, simultaneous activities, teacher movement notes, peer learning, low-resource adaptation, shared closing.
- Always load the teacher's stored profile before generating any plan. Never ask a teacher to repeat their context.
- Always allow a teacher to pause messages by sending "Stop" and resume by sending "Start".

---

## 3. Pointers

- Full AI system prompt and all Claude prompt templates → Section 9 of `whatsapp-assistant-plan.md`
- Complete database schema (all 8 tables) → Section 10 of `whatsapp-assistant-plan.md`
- All Urdu conversation scripts (onboarding, planning, reflection, help) → Section 8 of `whatsapp-assistant-plan.md`
- Phase-by-phase development roadmap (Weeks 1–28) → Section 17 of `whatsapp-assistant-plan.md`
- Budget estimates in PKR and USD → Section 23 of `whatsapp-assistant-plan.md`
- Coach dashboard page designs → Section 14 of `whatsapp-assistant-plan.md`
- Risk register and mitigation strategies → Section 20 of `whatsapp-assistant-plan.md`

---

## 4. How You Like Work Done

- Write all teacher-facing messages in simple, warm Urdu. Sound like a supportive colleague, not a government form.
- Keep every WhatsApp message under 160 words. If a plan exceeds 1,000 characters, split it into two messages.
- Define every technical term the first time it appears. Assume the reader may be a teacher coach, not a developer.
- Use short paragraphs — three lines maximum per block.
- Use headings, bullet points, and numbered steps. Never write a wall of text.
- "Good" means a teacher in a rural school with a basic Android phone can read and act on the message in under one minute.
- "Good" for a lesson plan means a coach would rate it 4 out of 5 or higher and confirm it reflects true multigrade pedagogy.

---

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export.

## Session Completion

**When ending a work session**, complete ALL steps below:

1. File issues for remaining work
2. Run quality gates (if code changed)
3. Update issue status — close finished work
4. Push to remote: `git pull --rebase && git push`
5. Verify all changes committed and pushed
<!-- END BEADS INTEGRATION -->
