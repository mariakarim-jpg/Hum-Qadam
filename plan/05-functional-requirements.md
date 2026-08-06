## 5. Functional Requirements

### FR-01: Teacher Profile Management
- System stores and retrieves a complete teacher profile per phone number
- Profile includes: name, school, grades taught, subjects, textbooks, curriculum version, preferred language, resource limitations
- Teachers can update their profile via WhatsApp conversation
- Profile is automatically loaded into every AI interaction — teachers never re-enter context

### FR-02: Automated Morning Check-In
- System sends a personalized morning message to every active teacher at 5:00 AM daily (school days only)
- Message includes teacher's name, warm greeting, and binary planning readiness prompt
- System handles both "ready" and "not ready" response paths
- Unresponsive teachers are flagged in coach dashboard

### FR-03: Multigrade Lesson Plan Generation
- System collects minimum required input: subject, grade levels, textbook page, SLO/objective
- AI generates a structured multigrade lesson plan within 15 seconds
- Plan always includes: shared opener, simultaneous differentiated activities, teacher movement instructions, peer learning opportunity, low-resource adaptation, shared closing
- Plan is formatted for WhatsApp readability (short paragraphs, numbered steps, emojis for section breaks)
- Plan references teacher's specific textbook and page number

### FR-04: Resource Constraint Adaptation
- Teachers can indicate constraints (no worksheets, no printing, mixed-age group, outdoor-only)
- AI adapts lesson plan based on stated constraints
- Constraint preferences are saved to teacher profile for future plans

### FR-05: End-of-Day Reflection
- System sends reflection prompt at 2:00 PM (or configurable time) on school days
- Reflection captures: plan success rating, challenges faced, plan completion status
- If challenges reported, system asks 1–2 follow-up questions
- Responses stored and linked to the morning's lesson plan record

### FR-06: Lesson Plan History
- Every generated lesson plan is stored with date, subject, grades, and teacher ID
- Teachers can request "last plan" via WhatsApp command
- Coaches can view all plans for a given teacher on the dashboard

### FR-07: Coach Dashboard
- Web-based dashboard accessible by coaches and school leaders
- Shows: daily/weekly check-in response rates, planning completion by teacher, subject coverage gaps, challenge frequency, engagement trends
- Exportable as PDF or CSV for reporting

### FR-08: Multi-language Support
- All teacher-facing messages available in Urdu (default) and English
- Teacher sets language preference during onboarding
- Language can be changed at any time via "Language English" or "زبان اردو" command

### FR-09: Teacher Onboarding Flow
- New teacher onboarded via a structured WhatsApp conversation (under 5 minutes)
- System collects all profile fields conversationally
- Onboarding confirmation sent with summary of stored profile
- Coach can also pre-register teachers via dashboard

### FR-10: Coaching Alerts
- Dashboard automatically flags teachers who: missed 3+ consecutive check-ins, reported challenges 3+ times in a week, have not generated a plan in 5+ school days
- Coach receives a daily digest of flagged teachers via email or WhatsApp

### FR-11: Vacation and Pause Mode
*(Merged in 2026-08-06 from `notes/planning.md` — this requirement backs CLAUDE.md's Hard Rule "Always allow a teacher to pause messages by sending Stop and resume by sending Start," but had never been captured as a numbered FR. See `notes/decisions.md` Decision 4.)*
- Teachers can pause daily messages by sending "Stop". Messages resume when the teacher sends "Start".
- Coaches can also activate vacation mode for a teacher via the dashboard.
- No messages are sent to teachers in vacation mode.

### FR-12: Help and Command Menu
*(Merged in 2026-08-06 from `notes/planning.md` — the Help/Command flow was already documented in `plan/08-conversation-flows.md`, but was missing from this FR list.)*
- Any teacher can send "Help" or "مدد" at any time to receive a list of available commands in their preferred language.
- Available commands include: Plan, Last plan, Profile, Update, Language English, زبان اردو, Stop, and Start.
