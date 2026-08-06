# Hum Qadam — Project Memory Journal

A running record of work sessions, tasks completed, and one honest lesson from each.

---

## Entry 1 — 2026-06-25

**Task:** Wrote the first full product plan for Hum Qadam as a 16-section coaching assistant connecting observation feedback, professional development, and student learning data.

**Lesson learned:** Starting with a product vision document — before writing any code — forces you to name the real problem. The lesson: multigrade teachers do not have a planning problem, they have a *simultaneity* problem. That one word changed every design decision that followed.

---

## Entry 2 — 2026-06-26

**Task:** Wrote the complete 25-section WhatsApp multigrade teaching assistant plan and saved it as `whatsapp-assistant-plan.md`. Covered everything from user personas and conversation flows to database schema, AI prompt architecture, budget estimates, and a 28-week development roadmap.

**Lesson learned:** A plan that fits in one file is a plan you can actually follow. Every section pointed forward or backward within the same document — no link went to a Google Doc that might disappear. Keeping it all in one Markdown file turned out to be a better decision than using a wiki.

---

## Entry 3 — 2026-06-27

**Task:** Attempted to push all project files to GitHub at https://github.com/mariakarim-jpg/Hum-Qadam. Every push command failed. Diagnosed the root cause: Git was not installed on the machine.

**Lesson learned:** Check your tools before you build your plan around them. Git is not pre-installed on Windows — it needs a separate download from git-scm.com. The fix takes five minutes, but discovering the gap at push time costs an hour of troubleshooting. Always verify the full local toolchain on day one.

**Closed 2026-08-06:** Resolved — Git was installed and the repo has since been pushed to `github.com/mariakarim-jpg/Hum-Qadam` multiple times. Leaving this entry as history rather than deleting it; the journal is a record of what happened, not a live task list.

---

## Entry 6 — 2026-08-06

**Task:** Ran a weekly memory review across the whole project. Found three true byte-identical duplicate files (`memory.md`/`notes/memory.md`, `whatsapp-assistant-plan.md`/`instructions/whatsapp-assistant-plan.md`, `agent_loop.md`/`instructions/agent_loop.md`) and one stale pre-merge draft (`instructions/CLAUDE.md`, superseded by root `CLAUDE.md` since the Beads merge). Deleted all four.

`notes/planning.md` turned out to be a different case, and I got it wrong on the first pass: I initially deleted it as a "drifted offline copy," treating its extra length as noise. It wasn't noise — it was an independently-rewritten parallel draft of the same 25-section plan (nearly every heading is reworded, not copy-pasted), and buried in that rewrite were three genuinely new things the canonical plan never had: **FR-11 (Vacation/Pause Mode) and FR-12 (Help/Command Menu)** — both back actual Hard Rules in CLAUDE.md but were never captured as numbered FRs — **a `public_holidays` table plus three `teachers` scheduling fields** that other sections already depended on but the canonical schema never defined, and **a "Weekly Analytics Summary" prompt** with no equivalent anywhere in the canonical AI Prompt Architecture section. Restored the file from git, diffed every heading against the canonical `plan/` files to confirm nothing else was unique, merged all three gaps into `plan/05-functional-requirements.md`, `plan/10-database-schema.md`, and `plan/09-ai-prompt-architecture.md`, then deleted `notes/planning.md` for real. Also split `whatsapp-assistant-plan.md` — previously one 1,440-line file — into 25 section files under `plan/`, with the root file now acting as a short index (see Decision 4 in `notes/decisions.md`).

**Lesson learned:** "Longer and out of sync" isn't automatically "stale" — it can mean the opposite: a copy that kept evolving after the canonical file stopped being updated. Diff before you delete. If I'd trusted my first read, this project would have permanently lost two functional requirements and a database table that other sections were already silently assuming existed.

---

## Entry 7 — 2026-08-06

**Task:** Fresh-session check after the Entry 6 cleanup. Simulated opening a brand-new
session with no re-briefing and asked: "What are the current hard rules for a lesson
plan, and where's the full database schema?" Answer came back correctly from
`CLAUDE.md` §2 (the seven hard rules, unchanged) and the updated `plan/10-database-schema.md`
pointer (now including `public_holidays`) — with no need to check the now-deleted
`instructions/CLAUDE.md` or `notes/planning.md`, and no re-explaining the project.

**Lesson learned:** The real test of a cleanup isn't "does the file look tidier" —
it's "does the next session get the right answer without being told twice." Closing
duplicates and updating the pointers in `CLAUDE.md` is what made that possible; if
I'd only deleted the stale copies without updating what still pointed at them, a
fresh session would have loaded a broken reference instead of the right answer.

---

## Entry 4 — 2026-06-28

**Task:** Created `agent_loop.md` using a real project scenario — Maryam at GPS Nilore, 3 missed check-ins, 0 lesson plans, messages delivered but never read. Wrote out all five steps of the agent loop (Observe, Decide, Act, Get Feedback, Improve) with the exact Urdu re-engagement message and the downstream coaching dashboard alert.

**Lesson learned:** A real example is worth twenty abstract diagrams. When the agent loop was explained using Maryam's actual data — specific numbers, a specific WhatsApp message, a specific coach recommendation — it became instantly clear what made this an *agent* rather than a chatbot. Concrete always beats conceptual.

---

## Entry 5 — 2026-06-29

**Task:** Converted the 50-line paragraph summary of `whatsapp-assistant-plan.md` into the four-part project brief format (Purpose, Hard Rules, Pointers, How You Like Work Done) and saved it as `CLAUDE.md` so it auto-loads at the start of every future session.

**Lesson learned:** A CLAUDE.md file is only as useful as its hard rules are specific. "Write well" is useless. "Keep every WhatsApp message under 160 words — if a plan exceeds 1,000 characters, split it into two messages" is a rule the agent can actually follow without asking. Specificity is the whole job.

---
