# Loop vs. Hook — Reflection

**Project:** Hum Qadam (WhatsApp multigrade lesson-planning assistant)
**Date:** 2026-08-17

## Loop vs. Hook, In My Own Words

A **loop** (the scheduled routine / `/schedule` approach) is *time-triggered*: it doesn't care what I do or don't do — it wakes up on its own clock, in its own isolated cloud environment, and runs regardless. I set it up to run the daily-wrap-up skill every day at 6am, whether or not anything actually happened in the repo that day. It has zero awareness of my actions; it only knows the calendar.

A **hook** is *event-triggered*: it doesn't care what time it is — it cares what just happened. The `PostToolUse` hook I built fires the instant a `notes/` file is written or edited, inside the same session doing the work. It has zero awareness of the clock; it only knows the event.

The practical difference I felt directly: the loop needed its own execution environment (a cloud checkout of the repo, its own git access, its own auth) because it runs independently of me. The hook needed none of that — it runs inside the session I'm already in, using files and state that already exist locally. A loop is automation that happens *without* me. A hook is automation that happens *because of* me.

## What I Learned

- **They solve genuinely different problems, not two flavors of the same thing.** I originally reached for the loop because "every day at 6am" sounds like the obvious way to run something regularly. But the loop is blind to whether there's anything worth summarizing — it would have dutifully run at 6am even on a day with zero repo activity. The hook, by contrast, only fires when there's an actual file change to react to, which is exactly the signal a wrap-up entry should be conditioned on.
- **A loop's isolation is a real cost, not just a technicality.** Because the cloud routine runs in its own environment, it needed its own GitHub authorization — separate from anything already working on my machine. That authorization didn't exist, and the routine failed at creation time. A hook has no equivalent tax: it inherits the session's existing access entirely.
- **"Automatic" needs a precise definition before you build it.** I initially assumed a shell "command" hook could directly force the skill to run. It can't — a command hook can only inject a system-level nudge (`additionalContext`) back into the conversation; the actual skill invocation still depends on the running session acting on that nudge. That's a meaningfully different guarantee than a loop's cloud agent, which does the work itself with no dependency on anything else being "listening." I had to prove this distinction rather than assume it — pipe-testing the raw script, then actually triggering real Write calls inside and outside `notes/` to confirm the nudge fired exactly where it should and nowhere else.

## How I'll Use It

- **Default to a hook whenever the trigger is really "something changed," not "some time passed."** The daily-wrap-up skill's real dependency was always "a notes/ file got touched," not "it's 6am" — the loop was solving the wrong variable. Going forward, I'll ask which one the task actually cares about before picking either.
- **Reserve loops for work that has to happen even if nobody is working** — things like a scheduled digest, a health check, or a reminder that must fire on a calendar regardless of activity. Those are the cases where paying the isolation cost (separate auth, separate environment) is actually buying something: independence from any session being open at all.
- **When I do build a hook, verify it the same way this time, every time** — pipe-test the script in isolation first, then prove it with a real matching event *and* a real non-matching control event, and only then remove the debug instrumentation. Skipping the control case would have left me unsure whether the hook was truly scoped to `notes/` or just firing on everything.
