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

---

## Entry 4 — 2026-06-28

**Task:** Created `agent_loop.md` using a real project scenario — Maryam at GPS Nilore, 3 missed check-ins, 0 lesson plans, messages delivered but never read. Wrote out all five steps of the agent loop (Observe, Decide, Act, Get Feedback, Improve) with the exact Urdu re-engagement message and the downstream coaching dashboard alert.

**Lesson learned:** A real example is worth twenty abstract diagrams. When the agent loop was explained using Maryam's actual data — specific numbers, a specific WhatsApp message, a specific coach recommendation — it became instantly clear what made this an *agent* rather than a chatbot. Concrete always beats conceptual.

---

## Entry 5 — 2026-06-29

**Task:** Converted the 50-line paragraph summary of `whatsapp-assistant-plan.md` into the four-part project brief format (Purpose, Hard Rules, Pointers, How You Like Work Done) and saved it as `CLAUDE.md` so it auto-loads at the start of every future session.

**Lesson learned:** A CLAUDE.md file is only as useful as its hard rules are specific. "Write well" is useless. "Keep every WhatsApp message under 160 words — if a plan exceeds 1,000 characters, split it into two messages" is a rule the agent can actually follow without asking. Specificity is the whole job.

---
