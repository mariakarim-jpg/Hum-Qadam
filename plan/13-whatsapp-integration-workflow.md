## 13. WhatsApp Integration Workflow

### Provider Selection

**Recommended: Meta WhatsApp Business Cloud API (direct)**
- Lower cost per message than Twilio at scale
- Direct integration, no intermediary
- Requires Meta Business verification (2–4 weeks)

**Alternative for MVP/Pilot: Twilio WhatsApp Sandbox**
- No approval required for testing
- Easy setup in 1 hour
- Higher per-message cost at scale
- Use for Phase 1 and Phase 2 testing

### Message Types Used

| Type | Use Case | Template Required? |
|---|---|---|
| Template message | Morning check-in, evening reflection | Yes — must be pre-approved by Meta |
| Session message (reply) | Lesson plan content, coaching tips | No — free-form within 24-hour window |
| Interactive message (buttons) | "1 - Haan / 2 - Nahi" options | Yes — button templates |

### Inbound Message Handling

```
WhatsApp API → Webhook (POST /webhook/whatsapp)
    ↓
Extract: from_number, message_body, message_id, timestamp
    ↓
Lookup teacher by phone_number in database
    ↓
Load conversation_state for this teacher
    ↓
Route to appropriate handler:
  ├── state = 'onboarding_*' → OnboardingHandler
  ├── state = 'planning_*' → PlanningHandler
  ├── state = 'reflecting_*' → ReflectionHandler
  ├── message = 'help' → HelpHandler
  └── state = 'idle' → IntentClassifier → route to correct handler
    ↓
Update conversation_state in database
    ↓
Send response via WhatsApp API
    ↓
Log message in whatsapp_messages table
```

### Outbound Message Scheduling

```
Cron Job: every day at 4:50 AM PKT (school days only)
    ↓
Query: SELECT all active teachers WHERE vacation_mode = false
    ↓
For each teacher:
  ├── Personalize morning message template
  ├── Send via WhatsApp API
  ├── Log in daily_checkins table
  └── Handle API errors with retry (max 3 attempts)

Cron Job: every day at 1:55 PM PKT (school days only)
    ↓
Query: SELECT teachers who received morning check-in today AND responded
    ↓
Send evening reflection prompt
    ↓
Log in reflections table
```

### School Day Logic
```javascript
function isSchoolDay(date) {
  const day = date.getDay();
  // Pakistan: Mon–Fri school week
  if (day === 0 || day === 6) return false;
  // Check against public holidays table
  const isHoliday = checkHolidaysTable(date);
  return !isHoliday;
}
```
