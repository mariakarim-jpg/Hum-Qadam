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

---

## Decision 4 — Supersedes Decision 3: split the plan into one file per section after all

**Date:** 2026-08-06
**What we decided:** `whatsapp-assistant-plan.md` is no longer one 1,440-line file. It is now a short index file, with the 25 sections split into individual files under `plan/`. The index links to each section by name.

**Why:** Decision 3's reasoning was about *searchability* — one file is easier to search in a single pass, and cross-references don't break. That reasoning still holds for a human skimming the doc in a text editor. It does not hold for an AI agent loading project context at the start of every session: loading all 1,440 lines to answer a question about, say, the database schema (Section 10) means paying the token cost of 24 irrelevant sections every single time. As the project has grown, that cost compounds. Splitting by section means a session only loads what it actually needs. Cross-references (e.g. CLAUDE.md's pointers) now link straight to the relevant file instead of a section number inside one large document — if anything, this makes references *more* precise, not less.

**What we ruled out:**
- Reverting once we hit this problem again and re-merging into one file — treats the same tradeoff as unresolved instead of picking a direction
- Splitting a different file instead (e.g. `notes/memory.md`) to preserve Decision 3 as originally written — avoids the actual long file the lazy-loading problem was about
- Keeping both the merged file and the split files in sync manually — this is exactly the kind of dual-source-of-truth setup that let `notes/planning.md` silently accumulate two real functional requirements (FR-11, FR-12) and a database table (`public_holidays`) that never made it back into this file (see Entry 6, `memory.md`); not repeating that mistake here — `plan/` is now the only place these sections live

---

## Decision 5 — Coach dashboard auth: email+password instead of magic-link

**Date:** 2026-09-01
**What we decided:** The coach dashboard (`frontend/src/pages/Login.jsx`) uses Supabase email+password sign-in/sign-up, not magic-link email OTP. This only affects coaches — teachers still interact purely through WhatsApp, untouched by this decision.

**Why:** Found during real end-to-end browser testing (Chrome DevTools MCP), not a theoretical concern: Supabase's free-tier project uses its built-in email service, which has a **fixed 2-emails/hour limit that cannot be raised without configuring custom SMTP** (confirmed directly in the Supabase dashboard — the rate-limit field is locked with that exact message). Magic-link auth sends one email *per login attempt*, so this cap was exhausted almost immediately during testing and blocked verifying every authenticated flow (Overview, Teacher List, Analytics, Reports, self-registration) for an extended stretch. Password auth needs at most one email per coach, ever (the signup confirmation) — not one per login — so the same 2/hour cap stops being an operational bottleneck.

**The trade-off, accepted knowingly:** coaches now manage a password instead of just clicking a link. Per `plan/03-user-personas.md`, coach tech-comfort varies (Nadia is described as "low"), so this is a real cost, not a free win — accepted because the alternative (magic-link) was actively blocking both testing today and, by the same mechanism, would block real coaches from logging in more than twice an hour once the product has any real usage.

**What we ruled out:**
- Waiting out the rate limit each time it's hit — doesn't fix the underlying ceiling, just defers hitting it again
- The Admin API's `generate_link` endpoint (bypasses the email-send limit since it doesn't send an email) as a permanent fix — solves testing, not real coaches logging in from their own devices day to day
- Setting up custom SMTP right now to keep magic-link — legitimate future option, but a bigger, separate piece of setup than this project needs to unblock today

---

## Decision 6 — Turned off "Confirm email" for new coach signups

**Date:** 2026-09-01
**What we decided:** Supabase's email-confirmation requirement is disabled project-wide. `POST /auth/v1/signup` now returns an active session immediately — no confirmation email, no wait, no dependency on Supabase's email quota at all for the signup step.

**Why:** Testing surfaced a second real gap, not just the original login-email problem: our own signup flow's confirmation email is *also* subject to the same 2-emails/hour cap (Decision 5), and — worse — a rate-limited confirmation email fails *silently* from the user's point of view. `Login.jsx` showed "Check your email to confirm your account" as if it had succeeded, because `supabase.auth.signUp()` only reports whether the *account* was created, not whether the *confirmation email* actually sent — those are two separate steps server-side that can diverge. A coach in this state would wait indefinitely for an email that was never coming, with the app telling them everything was fine. Turning off confirmation removes that entire failure class by removing the dependency itself, not just handling the error better.

**The trade-off, accepted knowingly:** anyone can now register a coach account with an email address they don't own or control — there's no proof of identity at signup anymore. Accepted because this system already has a second, independent gate that a bogus signup can't get past: registering only ever creates a `coaches` row with zero assigned teachers (see `backend/src/routes/dashboard/coaches.js` — `POST /register` never touches `teachers.coach_id`). A fabricated account sees an empty dashboard forever unless someone deliberately assigns real teachers to it. The actual sensitive data — teacher profiles, lesson plans, reflections — stays gated by that assignment step, not by email ownership.

**What we ruled out:**
- Leaving it on and just fixing the silent-failure UI bug instead — would have correctly surfaced the failure, but doesn't remove the underlying 2/hour ceiling that caused it, so the same wall reappears with real usage
- Custom SMTP as the fix instead of disabling confirmation — legitimate, but bigger setup than this project needs right now; revisit once there's a real reason to re-add identity verification at signup (e.g. once teacher assignment isn't a separate manual step and a bogus account could self-assign real data)
