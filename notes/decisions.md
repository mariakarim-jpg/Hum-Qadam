# Hum Qadam — Decision Log

A record of real choices made during this project, why we made them, and what we ruled out.

---

## Decision 1 — WhatsApp as the only delivery channel

**Date:** 2026-06-26
**What we decided:** Deliver everything — onboarding, lesson plans, reflection prompts, coaching tips — through WhatsApp only. No app to install, no login, no website.

**Why:**
Rural teachers in KPK and Punjab already have WhatsApp on their phones. Asking them to install a new app, create an account, or remember a password adds friction that kills adoption before day one. WhatsApp works on the cheapest Android phones, works on slow mobile data, and teachers check it every morning anyway.

**What we ruled out:**
- A custom Android app — higher barrier to install, requires Play Store access and storage space
- A web portal — requires remembering a URL and login credentials, doesn't work well on small screens with poor connectivity
- SMS — cannot handle the structured back-and-forth needed to collect lesson plan details, and cannot display formatted lesson plans clearly

---

## Decision 2 — Both grades active simultaneously, enforced as a hard rule

**Date:** 2026-06-26
**What we decided:** Every generated lesson plan must keep both grade levels active at the same time. This is a non-negotiable enforced at the system level — the AI validates all six components before delivery and retries if any are missing. It is not a preference or a guideline.

**Why:**
The entire problem we are solving is that teachers default to sequential teaching — 30 minutes for Grade 3, then 30 minutes for Grade 5 — because that is what their training covered and what textbooks assume. An AI assistant that generates sequential plans would replicate the exact harm we are trying to fix. Making it a hard rule, not a soft suggestion, means the system cannot drift back to the wrong default even as prompts evolve.

**What we ruled out:**
- Treating simultaneity as a quality guideline the AI should "try" to follow — too easy for the model to rationalise exceptions
- Letting coaches decide on a case-by-case basis — adds review overhead and introduces inconsistency across clusters
- Flagging sequential plans with a warning instead of blocking them — a teacher receiving a sequential plan would use it, defeating the purpose

---

## Decision 3 — One Markdown file for the full plan, not a wiki or shared doc

**Date:** 2026-06-26
**What we decided:** Store the entire 25-section implementation plan in a single file — `whatsapp-assistant-plan.md` — inside the project folder. All cross-references point to section numbers within that one file.

**Why:**
A Google Doc or Notion wiki requires a login, can go offline, and breaks when links change. A single Markdown file lives with the code, opens instantly, works offline, is readable in any text editor, and can be version-controlled alongside everything else. Every pointer in CLAUDE.md points to a section number in this file — so the agent always knows exactly where to look without following external links.

**What we ruled out:**
- Google Docs — requires internet and a Google account; formatting is not portable
- Notion — adds a third-party dependency; content is locked behind a proprietary format
- Splitting the plan into one file per section — creates navigation overhead and makes it harder to search the full document in one pass
