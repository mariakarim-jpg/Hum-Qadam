---
name: whatsapp-message-formatter
description: Format any teacher-facing text into a WhatsApp-ready message following Hum Qadam's house style
---

# WhatsApp Message Formatter

## When to use

Every single teacher-facing message this project sends — onboarding steps, morning
check-ins, reflection prompts, coaching tips, lesson plans — goes through the same
formatting rules before it ships. That rule set is spelled out once in `CLAUDE.md`
§4 but has to be re-applied by hand to every new message, so it's the same
mechanical pass done over and over. This skill is that pass.

## Steps

1. Identify the message type: a **short conversational message** (greeting, prompt,
   confirmation, coaching tip) or a **lesson plan**. They have different limits.
2. For a short conversational message:
   - Keep it under 160 words.
   - Warm, simple Urdu (or English if the teacher's `language_preference` is
     `english`) — sound like a supportive colleague, not a government form.
   - Max 3 lines per paragraph block.
3. For a lesson plan:
   - Target 400–600 words (per `plan/09-ai-prompt-architecture.md`).
   - If the rendered message exceeds 1,000 characters, split it into two WhatsApp
     messages rather than sending one long block.
4. Either way:
   - Define any technical term the first time it appears (the reader may be a
     coach, not a developer).
   - Use headings/numbered steps/emoji section breaks — never a wall of text.
   - Define "done": a teacher on a basic Android phone can read and act on it in
     under one minute.
5. Return only the formatted message — ready to send, no extra commentary.

## Example

Pulled directly from the real templates already in this project
(`plan/25-monitoring-and-evaluation-framework.md`, Appendix A) — this is what
"correctly formatted" looks like for a standard morning check-in:

**Input (raw content to convey):** remind the teacher it's morning, wish them a
good day, ask if today's lesson plans are ready, give two reply options.

**Output:**
```
Assalamu Alaikum {name}! 🌅
Aaj ka din mubarak ho.
Aaj ke lesson plans ready hain?

1️⃣ - Haan, ready hain ✅
2️⃣ - Abhi nahi bani ❌
```

Three lines max per block, warm tone, no jargon, numbered reply options, well
under 160 words — this is the bar every teacher-facing message in this project is
held to.
