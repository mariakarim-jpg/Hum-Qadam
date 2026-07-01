# Instructions Folder — Skill File

## What Lives Here

AI rules, the full 25-section implementation plan, and the agent loop documentation. This folder is the source of truth for all design decisions, prompt templates, and system behaviour.

---

## Key Files

| File | Purpose |
|---|---|
| `CLAUDE.md` | Project brief loaded at every session start — hard rules, section pointers, work style |
| `whatsapp-assistant-plan.md` | 25-section master plan — do not duplicate content; always point here |
| `agent_loop.md` | Observe → Decide → Act → Feedback → Improve cycle with real GPS Nilore example |

---

## Navigating whatsapp-assistant-plan.md

| Section | Contents |
|---|---|
| Section 7 | User journeys — onboarding, daily planning, reflection, coach dashboard |
| Section 8 | All Urdu conversation scripts + state machine flows |
| Section 9 | Master AI system prompt + runtime prompt templates (plan / coaching tip / observation brief) |
| Section 10 | Complete 8-table database schema with column definitions |
| Section 11 | Full teacher profile JSON structure |
| Section 12 | Lesson plan generation workflow |
| Section 13 | WhatsApp integration workflow |
| Section 14 | Coach dashboard page designs |
| Section 17 | 28-week development roadmap |
| Section 20 | Risk register and mitigation strategies |
| Section 23 | Budget estimates in PKR and USD |

---

## AI Prompt Templates (Section 9)

Three Claude prompt templates exist in the plan:

### 1. Plan Generation Template
Fills teacher context into the master system prompt. Required inputs:
- `{teacher_name}`, `{school_name}`, `{grades}`
- `{subject}`, `{textbook_name}`, `{pages_per_grade}`
- `{slo_1}`, `{slo_2}` (one per grade)
- `{constraints}`, `{last_challenge}`, `{language}`

### 2. Coaching Tip Template
Given a `{challenge_text}` and teacher context, returns a 3–4 sentence practical tip. Must acknowledge the challenge, offer one low-resource strategy, end with encouragement.

### 3. Pre-Observation Brief Template
Given teacher's last 5 plans and 10 reflections, returns a 1-paragraph brief under 150 words for a coach preparing a school visit. Includes: key patterns, observation focus, conversation starter.

---

## Agent Loop Pattern (agent_loop.md)

The Hum Qadam agent proactively monitors all teachers daily — it does not wait to be messaged.

| Step | What Happens |
|---|---|
| Observe | Query DB every morning — detect missed check-ins, unread messages, zero plans |
| Decide | 3 consecutive misses = "Needs Attention" flag. Try soft re-engagement first |
| Act | Send warm Urdu re-engagement WhatsApp message |
| Get Feedback | Check read/reply status 2 hours later |
| Improve | If unread: escalate to coach dashboard + adjust next send time |

Threshold for coach escalation: 3+ missed check-ins, OR 3+ challenges reported in one week, OR no plan in 5+ school days.

---

## Conversation State Machine

States follow the pattern `{flow}_{step}`, e.g.:
- `onboarding_start` → `onboarding_name_received` → ... → `onboarding_complete`
- `planning_start` → `planning_subject_received` → `planning_slo_received` → `planning_delivered`
- `reflection_prompt_sent` → `reflection_1_received` / `reflection_2_received` / `reflection_3_received`

Current state is stored in `conversation_sessions.conversation_state` (Supabase).

---

## Common Tasks Here

- **Update the system prompt** → Edit the code block in Section 9 of `whatsapp-assistant-plan.md`
- **Add a conversation flow** → Add to Section 8 using the STATE machine naming pattern
- **Update agent loop behaviour** → Edit `agent_loop.md`
- **Add a hard rule** → Edit `CLAUDE.md` Section 2 AND update the system prompt in Section 9 to enforce it

---

## Gotchas

- The master system prompt ends with `CRITICAL: Never generate a sequential lesson...` — this line must remain on every prompt version
- WhatsApp message format rules: emoji headers, max 3 lines per paragraph, numbered steps, plan under 600 words
- Language switch commands: `Language English` / `زبان اردو` — must be handled at the routing layer before reaching the AI
