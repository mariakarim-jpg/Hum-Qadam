# Agent Loop — Hum Qadam Teaching Assistant
### How the AI Agent Thinks, Acts, and Improves

The Hum Qadam agent does not wait to be asked for help. It watches teacher data
every day, decides what to do, takes action, checks whether that action worked,
and then adjusts. This cycle is called the agent loop.

Below is a real example from GPS Nilore.

---

## The Scenario

Maryam teaches Grade 3 and Grade 5 simultaneously at GPS Nilore. She is part of
Ahmed's coaching cluster. The agent has been sending her a morning check-in at
5 AM every school day. Something has changed this week.

---

## Step 1 — Observe

The agent queries the database every morning and collects Maryam's engagement data.

This is what it found:

- Morning check-in response rate: 0 out of 3 this week
- Lesson plans generated this week: 0
- Last active date: 3 school days ago
- Consecutive inactive days: 3
- Message delivery status: delivered, never read

The agent did not wait for Ahmed to notice this. It detected the pattern on its
own, the same way it monitors every teacher in the cluster every day.

---

## Step 2 — Decide

The agent compares what it observed against its alert rules.

Three consecutive missed check-ins with no plan generated crosses the threshold
for a "Needs Attention" flag. The agent decides its first action is to send
Maryam a warm, personalised re-engagement message before escalating to the coach.
It reasons that a soft outreach is more appropriate than an immediate alert — and
less disruptive to Ahmed's schedule if Maryam simply had a busy few days.

---

## Step 3 — Act

The agent sends Maryam this WhatsApp message:

> "Assalamu Alaikum Maryam! Aap ko 3 din se nahi dekha. Kya sab theek hai?
> Aaj ka lesson plan banane mein madad karein? Sirf 2 minute lagenge."

The message is logged in the whatsapp_messages table with a sent timestamp
and a delivery confirmation from the WhatsApp API.

---

## Step 4 — Get Feedback

The agent checks the message status 2 hours after delivery.

- Message was delivered to Maryam's phone: yes
- Message was read: no
- Maryam replied: no
- Lesson plan generated today: no

The soft re-engagement did not work. The agent now has new information: the
message reached her device but she did not open it. This is not the same as
the message failing — it means something else is going on.

---

## Step 5 — Improve

The agent updates its response based on what did not work.

It flags Maryam on Ahmed's coach dashboard under "Needs Attention" with the
alert reason: "No response in 3+ days. Re-engagement message unread."

It generates a recommended action for Ahmed: "Consider calling Maryam directly
today. WhatsApp messages are being delivered but not opened."

It also adjusts its own behaviour: tomorrow morning it will send a shorter,
warmer message at 6 AM instead of 5 AM, in case the timing was the issue for
a teacher with a long commute or early household responsibilities.

Nothing about this required Ahmed to manually check a spreadsheet or notice the
gap himself.

---

## Step 6 — How This Is Different from a Normal Chatbot

A normal chatbot only responds when a person messages it first, and it forgets
everything once the conversation ends. The Hum Qadam agent is different: it
watches Maryam's data every day without being asked, reaches out to her
proactively when something changes, learns from what did not work, and improves
its next action — all without Maryam or Ahmed doing anything manually.

---

## Summary Table

| Step | What Happened in Maryam's Case |
|---|---|
| Observe | Agent detected 3 missed check-ins, 0 plans generated, last active 3 days ago |
| Decide | Send a warm personalised re-engagement WhatsApp message first |
| Act | Sent: "Assalamu Alaikum Maryam! Aap ko 3 din se nahi dekha..." |
| Get Feedback | Message delivered but never read. No reply. No plan generated. |
| Improve | Flagged on Ahmed's dashboard. Recommended direct call. Adjusted next message to 6 AM. |
