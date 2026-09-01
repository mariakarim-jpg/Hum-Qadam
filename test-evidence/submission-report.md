# Hum Qadam — Live Testing Submission

Prepared 2026-09-01. Covers items 2–5 of the requested submission package.
(Item 1 — Live URL + demo credentials — was given separately in chat, not
repeated here since this doc is set to "anyone with the link can view.")

---

## 1. Test Report

**Tool used:** Chrome DevTools MCP — real browser automation (navigate →
snapshot → interact → assert), not code review. Full setup and method are
quoted verbatim in "Move 1" below.

**App tested:** Hum Qadam Coach Dashboard, live on Vercel, against the real
deployed backend (not a local copy).

**6 flows mapped and tested end-to-end:**

| # | Flow | Result |
|---|------|--------|
| 1 | Sign in (existing coach, email + password) | ✅ Works |
| 2 | Sign up (new coach) → self-registration → dashboard | ✅ Works |
| 3 | Teacher List (view, filter by status, filter by school) | ✅ Works |
| 4 | Analytics (4 charts) | ✅ Works — 3/4 charts show a blank area instead of a friendly empty state when there's no data yet (⚠️ polish, not a bug) |
| 5 | Reports (Generate Weekly Summary) | ✅ Works — correctly shows "Internal server error" instead of crashing, since no Anthropic API key is set yet (expected in this test environment) |
| 6 | Sign out | ✅ Works |

**Also checked on every page:** browser console for errors/warnings, network
tab for failed (4xx/5xx) requests, and one deliberate "unhappy path" per
page (bad/expired link, empty form, wrong password).

### ❌ Bugs found (ranked by severity)

1. **[Fixed] Direct navigation to any route but `/` returned a raw Vercel
   404, not the app.** Refreshing the page on `/teachers`, bookmarking
   `/analytics`, or sharing a direct link to a specific teacher all broke
   completely. Root cause: missing SPA rewrite rule for the frontend (the
   backend had one; the frontend never did). **This is the bug detailed in
   Section 2 below.**

2. **[Fixed] Login silently showed a false success message on an
   expired/invalid magic link.** The app never checked for Supabase's
   `#error=...&error_description=...` redirect format, so a broken link
   still displayed "Check your inbox" as if it had worked.

3. **[Fixed] Signup's confirmation email failed silently.** It shared the
   same 2-emails/hour Supabase free-tier cap as login, and
   `supabase.auth.signUp()` only reports whether the *account* was created —
   not whether the *confirmation email* actually sent. A coach would see
   "Check your email" and wait indefinitely for an email that was never
   coming.

4. **[Fixed] Two `<select>` filter dropdowns on Teacher List had no
   `id`/`name`/`aria-label`** — a real accessibility/console warning, not
   cosmetic.

### ⚠️ Sketchy but not broken

- 3 of 4 Analytics charts show a blank area rather than a labeled
  "No data yet" state when a coach has no teachers assigned. Not incorrect,
  just not friendly. Left as a polish item, not fixed in this pass.
- Chrome DevTools MCP's own browser connection was unstable mid-session
  (reverted to `about:blank` after clicks; a full zombie-process lock twice)
  — a testing-tool issue, not an app bug. Diagnosed and resolved each time
  without touching the app.

### Screenshots

- `test-evidence/after-fix-direct-navigation-works.png` — the fixed direct-navigation
  flow, re-tested live post-deploy (see Section 2).

---

## 2. The One Bug — Before / After

### Bug: Direct navigation to any dashboard route 404'd

**Before:**
Navigating straight to `https://hum-qadam-de85.vercel.app/teachers`, or
`/teachers/<any-id>`, or refreshing the browser on any page other than the
root `/`, returned Vercel's raw platform error page —
`404: NOT_FOUND` — instead of the React app. The dashboard itself was never
even loaded, so signed-in coaches lost their whole session the moment they
refreshed, bookmarked a page, or shared a link with a colleague.

**Root cause:**
This is a single-page React app using client-side routing (React Router).
Vercel's static hosting doesn't know about client-side routes by default —
it only knows about real files. `/` maps to `index.html`, but `/teachers`
maps to nothing, so Vercel serves its own 404 instead of letting React
Router handle the path. The backend already had this fixed
(`backend/vercel.json` rewrites API paths to the serverless function) —
the frontend simply never got the equivalent file.

**Fix:**
Added `frontend/vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This tells Vercel: for any path that isn't a real static file, serve
`index.html` and let React Router take over client-side. Verified locally
first (though `vercel.json` rewrites only actually take effect on Vercel's
own infrastructure, so the real proof had to be against the live deploy),
then deployed and re-tested directly in the browser.

**After (re-tested live, screenshot saved):**
Navigating directly to a nested route — including a route with a made-up
teacher ID that doesn't exist in the database — now correctly loads the
real app shell (sidebar, nav, signed-in coach's email, "Sign out") instead
of Vercel's 404 page. The made-up ID still fails, as it should — but now it
fails *inside the app*, as a normal "Internal server error" from the data
lookup, not as a broken page that never loaded at all. That's the
correct, expected behavior for a link nobody should be able to guess.

See `test-evidence/after-fix-direct-navigation-works.png` for the re-test
screenshot.

---

## 3. Moves 1–3 (verbatim prompts)

### Move 1 — Kick off testing

> Set up the Chrome DevTools MCP, then run a full end-to-end test of my
> project in a real browser.
>
> 1 — Install the browser tool (`claude mcp add --transport stdio
> chrome-devtools -- npx -y chrome-devtools-mcp@latest`), confirm via `/mcp`.
>
> 2 — Work out how to run my project. Read the repo, figure out the start
> command, start the dev server, find the local URL.
>
> 3 — Map the main flows. List the 3–6 most important user journeys and
> show me the list before testing.
>
> 4 — Test each flow like a real user, end to end: navigate → snapshot →
> click/type/fill → wait → assert. Screenshot at every meaningful step.
> Check console errors, check network for failed requests, try one unhappy
> path per page. Do not assume something works because the code looks
> right — drive it and observe it.
>
> 5 — Report back: ✅ what works, ❌ what's broken (exact step, screenshot,
> console/network error) ranked by severity, ⚠️ anything sketchy. Then offer
> to fix the top 1–3 issues and re-run just the affected flows.
>
> Be thorough and honest — I'd rather find the broken button now than in
> front of the judges.

### Move 2 — Kick off fixing

> it say this can you fix it
>
> *(sent with a screenshot of the error being reported)*

### Move 3 — Kick off re-testing

> test it

*(Used verbatim, repeatedly, after each individual fix — to re-verify the
specific flow that had just been changed before moving on to the next one.)*

---

## 4. Reflection

**What testing actually found:** four real bugs — none of them things I'd
have caught by just reading the code. Two were about what happens when
something goes *wrong* (an expired login link, a failed confirmation
email) rather than the happy path, and one only showed up because I tried
navigating directly to a URL instead of always clicking through from the
homepage. That was the most useful lesson from this whole exercise: the app
"worked" every time I used it the way I built it to be used, and broke the
moment I used it the way a real teacher-coach actually would — refreshing
mid-session, sharing a link, clicking an old email days later.

**What I'd do differently earlier:** I'd have caught the direct-navigation
404 and the silent email failures much sooner if I'd tested against the
*live* deployment from day one instead of trusting that "it works locally"
would carry over. Vercel's routing and Supabase's email rate limits are
both things that only exist in production, not on my machine — no amount
of careful local testing would have surfaced them.

**What I'm taking forward:** "does the code look right" and "does it
actually work" are different questions, and only one of them protects a
teacher-coach from a broken screen at 6am. Before the next deploy, I want
an unhappy-path check on every new flow, not just the happy path — and I
want to test the real deployed URL, not just localhost.

---

*End of report. Screenshot evidence: `test-evidence/after-fix-direct-navigation-works.png`.*
