## 8. Conversation Flows

### Flow Architecture
Every conversation state is stored in the database. The system tracks:
- `conversation_state` (onboarding | idle | planning | reflecting | support)
- `last_message_sent`
- `awaiting_input_for` (subject | page | slo | constraint | reflection)

### Complete Onboarding Flow

```
STATE: onboarding_start
  → Ask: name
STATE: onboarding_name_received
  → Ask: school name
STATE: onboarding_school_received
  → Ask: which grades do you teach? (e.g., "Grade 3 aur 4")
STATE: onboarding_grades_received
  → Ask: which subjects?
STATE: onboarding_subjects_received
  → Ask: textbook series (e.g., Punjab Textbook Board, KPK Textbook Board)
STATE: onboarding_textbooks_received
  → Ask: preferred language (Urdu / English)
STATE: onboarding_language_received
  → Ask: any resource limitations? (worksheets / blackboard only / outdoor / mixed-age)
STATE: onboarding_constraints_received
  → Confirm profile summary
  → Ask: "Kya yeh sab theek hai? 1 - Haan / 2 - Kuch change karna hai"
STATE: onboarding_complete
  → Welcome message + first morning check-in scheduled
```

### Lesson Planning Flow

```
STATE: planning_start
  → Ask: subject and grades
STATE: planning_subject_received
  → Ask: textbook page and today's SLO/objective
STATE: planning_slo_received
  → Ask: any constraints today? (optional — can skip with "0")
STATE: planning_constraints_received
  → CALL AI: generate_multigrade_lesson_plan()
  → Send plan
STATE: planning_delivered
  → Ask: "Koi section change karna hai?"
  → If yes: collect change request → regenerate section → resend
  → If no: mark plan as finalized, store in history
```

### Reflection Flow

```
STATE: reflection_prompt_sent
  → Awaiting: 1, 2, or 3
STATE: reflection_1_received (successful)
  → Send encouragement + tip for tomorrow
  → Log: plan_success = true
STATE: reflection_2_received (challenges)
  → Ask: "Kya challenge aaya?"
  → Store response
  → Send coaching tip
  → Log: plan_success = false, challenge_noted = true
STATE: reflection_3_received (incomplete)
  → Ask: "Kya wajah thi? (optional)"
  → Log: plan_complete = false
  → Flag for coach review
```

### Help and Command Flow

```
Teacher sends: "Help" / "مدد"
  → System sends: command menu

Available commands:
  "Plan" → Start new lesson plan
  "Last plan" → Resend most recent plan
  "Profile" → Show current profile
  "Update" → Start profile update flow
  "Language English" → Switch to English
  "زبان اردو" → Switch to Urdu
  "Stop" → Pause daily messages (vacation mode)
  "Start" → Resume daily messages
```
