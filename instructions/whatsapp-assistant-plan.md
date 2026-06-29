# WhatsApp Multigrade Teaching Assistant — Comprehensive Implementation Plan

> An AI-powered WhatsApp coaching and lesson-planning assistant for multigrade rural school teachers in Pakistan.

---

## 1. Product Vision

### Vision Statement
To put an expert multigrade instructional coach in every rural Pakistani teacher's pocket — available every morning, free of charge, in their own language — so that no teacher ever faces an empty classroom unprepared.

### Mission
Deliver daily, personalized, pedagogically sound lesson-planning support and coaching through WhatsApp so that teachers in multigrade rural schools can plan better lessons faster, reflect on their practice, and receive targeted coaching support — without needing a laptop, internet browser, or technical training.

### Core Belief
The biggest leverage point in improving student learning is not curriculum reform or infrastructure investment alone — it is the daily instructional decision-making of the teacher inside the classroom. This system exists to strengthen those decisions at scale.

### What Makes This Different
Most EdTech tools are designed for single-grade, well-resourced classrooms in urban settings. This system is designed specifically for the Pakistani multigrade rural classroom reality:
- One teacher, two or more grades, at the same time
- Limited or no printed materials
- Urdu-speaking teachers with low digital literacy
- Inconsistent connectivity
- No daily instructional support structure

---

## 2. Problem Statement

### The Multigrade Teaching Challenge in Pakistan
An estimated 30–40% of government primary schools in rural Pakistan operate with fewer teachers than grades, forcing teachers to manage two or more grade levels simultaneously in a single classroom. This is called a multigrade classroom.

### Specific Problems Identified Through Coaching
1. **No multigrade planning support exists** — national curriculum and textbooks are designed for single-grade delivery
2. **Teachers plan sequentially, not simultaneously** — they teach Grade 3 for 30 minutes, then Grade 5 for 30 minutes, leaving one group idle and disengaged
3. **Lesson planning is time-consuming** — teachers report spending 1–2 hours per night on planning with poor results
4. **Coaching is infrequent** — a teacher may see their coach once per month at best
5. **No reflection loop** — without structured end-of-day reflection, teachers repeat ineffective approaches
6. **SLO data is not connected to daily planning** — teachers receive assessment results but don't know how to adapt instruction

### Problem Impact
- Students in the idle grade disengage or cause disruption
- Learning gaps compound across grades
- Teacher burnout and planning fatigue increase
- Coach visits are reactive, not proactive

### The Opportunity
WhatsApp penetration in rural Pakistan exceeds smartphone penetration. Most teachers already use WhatsApp daily. A well-designed conversational assistant requires zero learning curve, zero installation, and works on any Android phone with basic data.

---

## 3. User Personas

### Persona 1 — Maryam (Primary Multigrade Teacher)
- **Age:** 26
- **Location:** Rural school, Khyber Pakhtunkhwa
- **Teaches:** Grade 3 and Grade 5 simultaneously
- **Subjects:** Math, Urdu, Science, Social Studies
- **Phone:** Android, WhatsApp daily user
- **Language:** Urdu preferred
- **Daily reality:** Arrives at school 7:30 AM, 35 students across two grades, one blackboard, no printer, weak mobile signal
- **Pain points:** Spends evenings creating plans that don't work; one grade always sits idle; feels unsupported
- **Motivation:** Wants to be a good teacher; feels proud when lessons go well; responds well to encouragement

### Persona 2 — Ahmed (Instructional Coach)
- **Age:** 34
- **Role:** District Coach, supports 18 teachers across 6 schools
- **Tools currently used:** Paper registers, WhatsApp group chats, monthly school visits
- **Pain points:** Cannot tell which teachers need support before visiting; data collection is manual; visits feel reactive
- **Goal:** Use data to prioritize visits; show evidence of teacher development to his manager
- **Tech comfort:** Moderate — uses Google Sheets, WhatsApp, can navigate a web dashboard

### Persona 3 — Nadia (School Leader / Head Teacher)
- **Age:** 45
- **Role:** Head Teacher, responsible for 6 teachers
- **Goal:** Ensure all teachers plan daily; improve SLO results; demonstrate school improvement to district
- **Pain points:** No visibility into what teachers are doing between observations
- **Tech comfort:** Low — prefers simple summaries, not complex dashboards

### Persona 4 — Zara (Cluster / Program Manager)
- **Age:** 38
- **Role:** Education Program Manager overseeing 5 clusters
- **Goal:** Identify systemic teacher development needs; allocate coaching resources efficiently
- **Tech comfort:** High — uses Excel, dashboards, presentation tools

---

## 4. Success Criteria

### Phase 1 (Validation)
- At least 8 out of 10 pilot teachers respond to morning check-in messages for 5 consecutive days
- Teachers rate conversation flow as "easy to use" (4/5 or above)
- At least 6 out of 10 teachers request a lesson plan within the first week

### Phase 2 (Core Build)
- System generates a multigrade lesson plan in under 15 seconds after teacher input
- 100% of generated plans include all 6 multigrade components (shared opener, differentiated activities, teacher movement notes, peer learning, low-resource adaptation, shared closing)
- Coach confirms plans are pedagogically appropriate in quality review

### Phase 3 (Automation)
- Morning messages delivered to all enrolled teachers by 5:05 AM daily
- Evening reflection prompts delivered by 2:30 PM daily
- 70% or more of teachers respond to morning check-ins within 2 hours

### Phase 4 (Dashboard)
- Coach can view weekly planning completion rate for all teachers within 3 clicks
- Dashboard loads in under 3 seconds
- At least 80% of coaches report the dashboard helps them prioritize school visits

### Phase 5 (Scale)
- System supports 500+ teachers without performance degradation
- Average lesson plan generation cost under PKR 5 per plan
- 60% of teachers show improvement in planning quality as assessed by coaches over 6 months

---

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

---

## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Availability | 99.5% uptime during school hours (6 AM – 4 PM PKT) |
| Response latency | Lesson plan generated and delivered within 15 seconds of final teacher input |
| Message delivery | 98% of scheduled messages delivered within 5 minutes of scheduled time |
| Data privacy | Teacher data stored in Pakistan or compliant region; no data shared with third parties |
| Scalability | Architecture supports 1,000 concurrent teachers without redesign |
| Offline resilience | System queues outbound messages if WhatsApp API is temporarily unavailable |
| Language accuracy | Urdu messages reviewed by native speakers before deployment |
| Cost efficiency | Lesson plan generation cost under PKR 10 per plan at launch; target PKR 3–5 at scale |
| Accessibility | Works on any Android phone with WhatsApp; no app installation required |
| Audit trail | All AI-generated content logged with timestamp, teacher ID, and input context |

---

## 7. User Journeys

### Journey 1 — First-Time Teacher Onboarding

```
Teacher sends "Hello" or is invited by coach
    ↓
System: "Assalamu Alaikum! Main aapka multigrade teaching assistant hoon.
         Pehle aapka profile banate hain. Aapka naam kya hai?"
    ↓
Teacher: "Maryam"
    ↓
System: "Maryam! Aapka school ka naam?"
    ↓
[Continues collecting: school, grades, subjects, textbooks, language pref, resource limits]
    ↓
System: "Shukriya Maryam! Aapka profile ready hai.
         Kal subah 5 baje aapko pehla check-in message ayega. ✅"
```

### Journey 2 — Daily Morning Planning (Lesson Needed)

```
5:00 AM — System sends:
"Assalamu Alaikum Maryam! 🌅 Aaj ka din mubarak ho.
Aaj ke lesson plans ready hain?
1 - Haan, ready hain ✅
2 - Abhi nahi bani ❌"
    ↓
Teacher: "2"
    ↓
System: "Koi baat nahi! Milke banate hain. Konsa subject aur kaun si classes?"
    ↓
Teacher: "Math, Grade 3 aur Grade 5"
    ↓
System: "Textbook ka konsa page hai aur aaj ka SLO ya topic kya hai?"
    ↓
Teacher: "Grade 3 page 45, addition. Grade 5 page 67, fractions."
    ↓
[AI generates multigrade lesson plan — delivered in under 15 seconds]
    ↓
System: [Sends formatted lesson plan]
"Lesson plan ready hai! 📋 Koi cheez change karni ho toh batayein."
```

### Journey 3 — End-of-Day Reflection

```
2:00 PM — System sends:
"Aaj ki class kaisi rahi Maryam? 🏫
1 - Plan successful raha ✅
2 - Kuch challenges aaye 🤔
3 - Plan complete nahi ho saka ⏳"
    ↓
Teacher: "2"
    ↓
System: "Kya challenge aaya? Briefly batayein."
    ↓
Teacher: "Grade 5 ke bachche independent kaam nahi kar rahe the"
    ↓
System: "Shukriya share karne ke liye. Kal ke plan mein Grade 5 ke liye
         aur structured independent activity include karenge. 💡
         Aapka yeh feedback save ho gaya hai."
    ↓
[Challenge logged; coach dashboard updated; tomorrow's plan context enriched]
```

### Journey 4 — Coach Reviews Dashboard

```
Ahmed (Coach) logs into dashboard
    ↓
Views weekly summary: "18/24 teachers planned this week"
    ↓
Clicks on flagged alert: "3 teachers missed 3+ check-ins"
    ↓
Views teacher detail: Maryam — last active 4 days ago, last challenge: "students off-task"
    ↓
Exports school report for upcoming visit
    ↓
Sends targeted coaching note to Maryam via dashboard (delivered via WhatsApp)
```

---

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

---

## 9. AI Prompt Architecture

### Master System Prompt

```
You are an expert multigrade instructional coach for rural Pakistani primary schools.
Your role is to generate practical, classroom-ready lesson plans that follow
true multigrade pedagogy — where multiple grade levels learn simultaneously,
not sequentially.

CONTEXT YOU WILL RECEIVE:
- Teacher name and school
- Grade levels being taught simultaneously (e.g., Grade 3 and Grade 5)
- Subject, textbook, page number
- Today's learning objectives or SLOs for each grade
- Resource constraints (e.g., no worksheets, blackboard only)
- Teacher's previous challenges (if any from reflection history)

LESSON PLAN REQUIREMENTS — ALWAYS INCLUDE ALL 6 COMPONENTS:
1. SHARED OPENER (5 min): A single activity that engages ALL grade levels together.
   Use real-world connections, questions, or physical activity.

2. DIFFERENTIATED SIMULTANEOUS ACTIVITIES:
   - Grade [X] INDEPENDENT work: A self-directed activity this grade can do alone.
     Must be completable without teacher presence. Low-resource.
   - Grade [Y] TEACHER-LED instruction: Direct instruction with the other grade.
     Should be the more complex concept requiring teacher support.

3. TEACHER MOVEMENT NOTES: Explicit instructions on when and how the teacher
   moves between groups. Include specific timing and monitoring checkpoints.
   Example: "After 8 minutes, check Grade 3 work, then move to Grade 5."

4. SWITCH: Reverse roles — the grade that had teacher-led instruction now works
   independently while the teacher supports the other grade.

5. PEER LEARNING OPPORTUNITY: One moment where students from different grades
   interact — older helping younger, mixed group discussion, or shared task.

6. SHARED CLOSING (5 min): A single closing activity involving ALL students.
   Can be a question, physical response, or brief sharing circle.

FORMATTING RULES FOR WHATSAPP:
- Use short paragraphs (max 3 lines each)
- Use numbered steps within each section
- Use emoji section headers: 🌟 Opener, 📚 Grade X Work, 👩‍🏫 Teacher with Grade Y, etc.
- Keep total plan under 600 words
- Use simple Urdu or English depending on teacher preference
- Never suggest activities that require printed worksheets unless teacher confirmed available
- Never suggest activities requiring projectors, computers, or expensive materials
- Always reference the specific textbook page number provided

TONE:
- Warm, practical, collegial
- Write as a fellow experienced teacher, not a textbook
- Use "aap" (respectful) in Urdu responses
- Acknowledge constraints without judgment

CRITICAL: Never generate a sequential lesson (teach one grade, then the other).
Every plan must have both grades active simultaneously.
```

### Prompt for Plan Generation (Runtime Template)

```
Teacher: {teacher_name}
School: {school_name}
Grades teaching simultaneously: {grades}
Subject: {subject}
Textbook: {textbook_name}
Pages: {pages_per_grade}
Learning objectives:
  - Grade {grade_1}: {slo_1}
  - Grade {grade_2}: {slo_2}
Resource constraints: {constraints}
Previous challenge (if any): {last_challenge}
Language preference: {language}

Generate a complete multigrade lesson plan following all 6 required components.
Format for WhatsApp delivery.
```

### Prompt for Coaching Tip (Post-Reflection)

```
Teacher reported this challenge: "{challenge_text}"
Teacher's context: {grades}, {subject}, {school_context}

Generate a single, practical coaching tip (3–4 sentences max) that:
1. Acknowledges the challenge without judgment
2. Offers one specific, low-resource strategy to address it tomorrow
3. Ends with an encouraging sentence

Language: {language}
Tone: warm, collegial, brief
```

### Prompt for Pre-Observation Brief (Coach Dashboard)

```
Teacher: {teacher_name}
Recent lesson plans (last 5): {plan_summaries}
Reflection responses (last 10): {reflection_data}
Challenges reported: {challenge_list}
Planning completion rate (last 30 days): {completion_rate}%
Subjects frequently skipped: {skipped_subjects}

Generate a 1-paragraph coaching brief for the coach preparing to visit this teacher.
Include: key patterns, suggested observation focus, conversation starter.
Keep under 150 words.
```

---

## 10. Database Schema

### Table: teachers
```sql
id                    UUID PRIMARY KEY
phone_number          VARCHAR(20) UNIQUE NOT NULL
name                  VARCHAR(100)
school_name           VARCHAR(200)
district              VARCHAR(100)
province              VARCHAR(100)
grades_taught         TEXT[]        -- e.g., ['3', '5']
subjects_taught       TEXT[]        -- e.g., ['Math', 'Urdu', 'Science']
textbook_series       VARCHAR(100)  -- e.g., 'Punjab Textbook Board'
curriculum_version    VARCHAR(50)
language_preference   VARCHAR(10)   -- 'urdu' | 'english'
resource_constraints  TEXT[]        -- e.g., ['no_worksheets', 'blackboard_only']
onboarding_complete   BOOLEAN DEFAULT FALSE
active                BOOLEAN DEFAULT TRUE
vacation_mode         BOOLEAN DEFAULT FALSE
coach_id              UUID REFERENCES coaches(id)
created_at            TIMESTAMPTZ DEFAULT NOW()
updated_at            TIMESTAMPTZ DEFAULT NOW()
```

### Table: lesson_plans
```sql
id                    UUID PRIMARY KEY
teacher_id            UUID REFERENCES teachers(id)
generated_at          TIMESTAMPTZ
subject               VARCHAR(100)
grades                TEXT[]
textbook_pages        JSONB         -- {"3": "45", "5": "67"}
slos                  JSONB         -- {"3": "addition", "5": "fractions"}
constraints_applied   TEXT[]
plan_content          TEXT          -- full generated plan
plan_version          INT DEFAULT 1
teacher_finalized     BOOLEAN DEFAULT FALSE
ai_model              VARCHAR(50)
prompt_tokens         INT
completion_tokens     INT
created_at            TIMESTAMPTZ DEFAULT NOW()
```

### Table: daily_checkins
```sql
id                    UUID PRIMARY KEY
teacher_id            UUID REFERENCES teachers(id)
checkin_date          DATE
message_sent_at       TIMESTAMPTZ
teacher_responded     BOOLEAN DEFAULT FALSE
response_value        VARCHAR(10)   -- '1' | '2' | null
responded_at          TIMESTAMPTZ
plan_generated        BOOLEAN DEFAULT FALSE
plan_id               UUID REFERENCES lesson_plans(id)
created_at            TIMESTAMPTZ DEFAULT NOW()
```

### Table: reflections
```sql
id                    UUID PRIMARY KEY
teacher_id            UUID REFERENCES teachers(id)
lesson_plan_id        UUID REFERENCES lesson_plans(id)
reflection_date       DATE
prompt_sent_at        TIMESTAMPTZ
response_value        VARCHAR(10)   -- '1' | '2' | '3'
challenge_text        TEXT
challenge_category    VARCHAR(100)  -- AI-classified
coaching_tip_sent     TEXT
responded_at          TIMESTAMPTZ
created_at            TIMESTAMPTZ DEFAULT NOW()
```

### Table: conversation_sessions
```sql
id                    UUID PRIMARY KEY
teacher_id            UUID REFERENCES teachers(id)
session_start         TIMESTAMPTZ
session_end           TIMESTAMPTZ
conversation_state    VARCHAR(50)
awaiting_input_for    VARCHAR(50)
session_data          JSONB         -- temporary slot values during conversation
last_message_id       VARCHAR(100)  -- WhatsApp message ID
created_at            TIMESTAMPTZ DEFAULT NOW()
```

### Table: coaches
```sql
id                    UUID PRIMARY KEY
name                  VARCHAR(100)
email                 VARCHAR(200) UNIQUE
phone_number          VARCHAR(20)
district              VARCHAR(100)
schools_assigned      TEXT[]
role                  VARCHAR(50)   -- 'coach' | 'leader' | 'manager'
dashboard_access      BOOLEAN DEFAULT TRUE
created_at            TIMESTAMPTZ DEFAULT NOW()
```

### Table: whatsapp_messages
```sql
id                    UUID PRIMARY KEY
teacher_id            UUID REFERENCES teachers(id)
direction             VARCHAR(10)   -- 'inbound' | 'outbound'
message_id            VARCHAR(100)  -- WhatsApp message ID
content               TEXT
media_url             TEXT
status                VARCHAR(20)   -- 'sent' | 'delivered' | 'read' | 'failed'
sent_at               TIMESTAMPTZ
delivered_at          TIMESTAMPTZ
read_at               TIMESTAMPTZ
created_at            TIMESTAMPTZ DEFAULT NOW()
```

---

## 11. Teacher Profile Structure

### Complete Profile Object
```json
{
  "id": "uuid",
  "phone_number": "+923001234567",
  "personal": {
    "name": "Maryam",
    "preferred_name": "Maryam",
    "language": "urdu"
  },
  "school": {
    "name": "GPS Darra Khel",
    "district": "Swabi",
    "province": "KPK",
    "school_type": "government_primary"
  },
  "teaching_context": {
    "grades_taught": ["3", "5"],
    "subjects_taught": ["Math", "Urdu", "Science", "Social Studies"],
    "total_students": 38,
    "is_multigrade": true,
    "textbook_series": "KPK Textbook Board",
    "curriculum_version": "SNC 2022"
  },
  "resource_constraints": {
    "has_blackboard": true,
    "has_worksheets": false,
    "has_printer": false,
    "has_projector": false,
    "has_manipulatives": false,
    "notes": "Blackboard and chalk only. Students have textbooks."
  },
  "coaching_history": {
    "coach_id": "uuid",
    "last_coach_visit": "2026-05-10",
    "recurring_challenges": ["student_engagement", "independent_work"],
    "strengths_noted": ["questioning_technique"]
  },
  "engagement_stats": {
    "checkin_response_rate_30d": 0.82,
    "plans_generated_30d": 14,
    "reflection_response_rate_30d": 0.71,
    "last_active": "2026-06-17"
  },
  "system": {
    "active": true,
    "vacation_mode": false,
    "onboarding_complete": true,
    "morning_message_time": "05:00",
    "evening_message_time": "14:00",
    "timezone": "Asia/Karachi",
    "created_at": "2026-01-15"
  }
}
```

---

## 12. Lesson Plan Generation Workflow

### Step-by-Step Generation Pipeline

```
Step 1: INPUT COLLECTION
  ├── Retrieve teacher profile from database (phone_number lookup)
  ├── Extract: grades, subjects, textbooks, constraints, recent challenges
  └── Collect from conversation: subject, page, SLO for each grade

Step 2: CONTEXT ASSEMBLY
  ├── Load master system prompt
  ├── Inject teacher profile fields into prompt template
  ├── Append last 1–2 reflection challenges (if any)
  └── Set language flag (Urdu/English)

Step 3: AI GENERATION (Claude Sonnet API)
  ├── Send assembled prompt to Claude
  ├── Temperature: 0.7 (creative but consistent)
  ├── Max tokens: 800
  └── Stream response for faster delivery

Step 4: QUALITY VALIDATION
  ├── Check plan contains all 6 required sections (regex/keyword check)
  ├── Check plan does not contain banned resource references (projector, internet, etc.)
  ├── Check word count is within WhatsApp limits
  └── If validation fails: retry with corrective instruction appended

Step 5: FORMATTING
  ├── Apply WhatsApp markdown (bold with *, line breaks)
  ├── Add emoji section headers
  ├── Split into 2–3 messages if plan exceeds 1,000 characters
  └── Prepend: "📋 Aaj ka Lesson Plan — {subject} Grade {grades}"

Step 6: DELIVERY
  ├── Send via WhatsApp API
  ├── Log message IDs and delivery status
  └── Store full plan in lesson_plans table

Step 7: POST-DELIVERY
  ├── Update daily_checkins: plan_generated = true
  ├── Ask: "Koi section change karna hai? (1 - Haan / 2 - Theek hai)"
  └── Handle revision request if received
```

### Plan Output Format (Example — Urdu)

```
📋 Aaj ka Lesson Plan
Math | Grade 3 & Grade 5

🌟 OPENER (5 min — Sab saath)
Bachon se puchein: "Agar aapke paas 10 aam hain aur aap 3 doston ko barabar dena
chahte hain, toh kaise denge?" Haath uthane ko kahein. Dono grades discuss karein.

📚 GRADE 3 — Akele kaam (15 min)
Kitaab page 45 — Exercise 1, sawaal 1–6.
Har sawaal likhein aur jawab dein. Agar phas jayein, pehla sawaal dobara parhein.

👩‍🏫 TEACHER GRADE 5 KE SAATH (15 min)
Page 67 — Fractions ka concept board par likhein.
3 examples board par halal karein. 2 bachon se board par likhwaein.

🔄 TEACHER KI MOVEMENT
15 min baad: Grade 5 ko 3 practice sawaal dein (akele).
Ab Grade 3 ke paas jayein. 3 copies check karein. Ek common ghalti board par likhein.

🤝 PEER LEARNING (5 min)
Ek Grade 5 student ek Grade 3 student ko ek sawaal samjhaye.
Pairs banayein: ek bara, ek chota.

🎯 CLOSING (5 min — Sab saath)
Sab khare ho jayen. Teacher sawaal puchein. Jo sahi jawab de, baith jaye.
Grade 3: addition. Grade 5: fraction sawaal.
```

---

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

---

## 14. Dashboard Design

### Coach Dashboard — Pages and Components

#### Page 1: Overview (Home)
- **Header:** "Good morning, Ahmed. Here's your cluster update."
- **Metric cards (row):**
  - Teachers active today: 18/24
  - Plans generated this week: 67
  - Reflection responses this week: 54
  - Teachers flagged for support: 3
- **Alert panel:** List of flagged teachers with reason and last activity
- **Quick action:** "Send coaching note to teacher" button

#### Page 2: Teacher List
- Table: Name | School | Last Active | Plans (30d) | Check-in Rate | Status
- Filterable by: school, status (active/flagged/inactive), grade
- Click row → Teacher Detail page

#### Page 3: Teacher Detail
- Profile summary card
- Activity timeline: last 14 days of check-ins and reflections
- All lesson plans list (subject, date, grades)
- Challenge log: all reported challenges with dates
- AI coaching brief: "Prepare for your visit to Maryam"
- Send message box: coach sends a WhatsApp message from dashboard

#### Page 4: Analytics
- **Planning by subject (bar chart):** Which subjects planned most/least across all teachers
- **Weekly completion heatmap:** School × Week grid showing completion rate
- **Challenge frequency (pie chart):** Most common challenge categories
- **Engagement trend (line chart):** Check-in response rate over last 8 weeks
- **School comparison:** Planning completion rate by school

#### Page 5: Reports
- Generate: Weekly summary | Monthly school report | Individual teacher report
- Format: PDF download or email delivery
- Pre-built report templates for program/district reporting

### Dashboard UI Principles
- Mobile-responsive (coaches may access on phone)
- Load time under 3 seconds (server-side rendering)
- Color coding: Green (on track) | Amber (attention) | Red (urgent)
- Minimal clicks: most critical info visible on home screen
- Urdu name display support

---

## 15. Analytics Framework

### Data Collected Per Teacher (Daily)
- Morning check-in: sent, delivered, read, responded, response value, response time
- Lesson plan: requested, generated, subject, grades, plan ID
- Evening reflection: sent, responded, response value, challenge text
- Conversation turns: number of messages exchanged per session

### Metrics Computed (Weekly Aggregation)
```
planning_completion_rate = plans_generated / school_days_in_period
checkin_response_rate = checkins_responded / checkins_sent
reflection_response_rate = reflections_responded / reflections_sent
avg_response_time_minutes = avg(responded_at - message_sent_at)
challenge_frequency = count(reflections where response = '2')
subjects_skipped = subjects_in_profile NOT IN plans_generated_subjects
consecutive_inactive_days = days since last any_response
```

### Challenge Classification (AI-assisted)
When a teacher reports a challenge, Claude classifies it into one of:
- `student_engagement` — students off-task or disengaged
- `independent_work` — one grade cannot work without teacher
- `time_management` — plan took too long or ran out of time
- `content_difficulty` — teacher unsure about subject content
- `classroom_management` — behaviour issues
- `resource_limitation` — lacked materials to execute plan
- `other` — unclassified

### Coach Alerting Rules
| Condition | Alert Type | Action |
|---|---|---|
| 3+ consecutive missed check-ins | Amber | Add to "needs attention" list |
| 5+ school days no plan generated | Amber | Flag on dashboard |
| Same challenge reported 3x in a week | Red | Push notification to coach |
| Check-in response rate drops below 50% in a week | Amber | Weekly digest alert |
| School-level completion rate below 60% | Red | School leader alert |

---

## 16. Technical Architecture

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    TEACHER (WhatsApp)                        │
└─────────────────────────┬────────────────────────────────────┘
                          │ HTTPS webhook / API calls
┌─────────────────────────▼────────────────────────────────────┐
│            WhatsApp Business API (Meta / Twilio)             │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                   NODE.JS BACKEND (Railway)                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  EXPRESS API SERVER                  │    │
│  │  /webhook/whatsapp  /api/dashboard  /api/teachers   │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐    │
│  │              CONVERSATION ROUTER                     │    │
│  │  OnboardingHandler | PlanningHandler | ReflectionH  │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐    │
│  │              AI SERVICE LAYER                        │    │
│  │  LessonPlanGenerator | CoachingTipGenerator |        │    │
│  │  ChallengeClassifier | CoachBriefGenerator           │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │ Anthropic API                      │
│  ┌──────────────────────▼──────────────────────────────┐    │
│  │              SCHEDULER (node-cron)                   │    │
│  │  MorningCheckInJob | EveningReflectionJob |          │    │
│  │  WeeklyReportJob | CoachAlertJob                     │    │
│  └──────────────────────┬──────────────────────────────┘    │
└───────────────────────────────────────────────────────────── ┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                   SUPABASE (Database + Auth)                  │
│  PostgreSQL | Row-level security | Realtime subscriptions    │
└──────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│              REACT DASHBOARD (Vercel / Railway)               │
│  Coach view | Analytics | Teacher details | Report export    │
└──────────────────────────────────────────────────────────────┘
```

### Tech Stack — Detailed

| Layer | Technology | Version | Reason |
|---|---|---|---|
| Backend runtime | Node.js | 20 LTS | Async-native, large ecosystem |
| Backend framework | Express.js | 4.x | Lightweight, sufficient for API |
| AI | Anthropic Claude Sonnet API | claude-sonnet-4-6 | Best instruction-following, cost-efficient |
| WhatsApp (MVP) | Twilio WhatsApp API | Latest | Fast setup for pilot |
| WhatsApp (Scale) | Meta Cloud API | v18+ | Direct, lower cost at volume |
| Database | Supabase (PostgreSQL) | Latest | Managed Postgres + auth + realtime |
| Job scheduling | node-cron | 3.x | Simple cron in-process |
| Frontend dashboard | React + Vite | React 18 | Component ecosystem |
| Dashboard UI | Tailwind CSS + shadcn/ui | Latest | Fast, consistent UI |
| Charts | Recharts | Latest | React-native, accessible |
| Auth (dashboard) | Supabase Auth | Latest | JWT, role-based |
| Hosting (backend) | Railway | Latest | Simple deploy, Pakistan-region available |
| Hosting (frontend) | Vercel | Latest | Fast CDN, free tier |
| Environment config | dotenv | Latest | Secrets management |
| Logging | Winston + Railway logs | Latest | Structured logging |
| Error monitoring | Sentry | Latest | Error alerting |

---

## 17. Development Roadmap

### Phase 1 — Manual Validation (Weeks 1–3)
**Goal:** Validate conversation design and lesson plan quality before writing any code.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Design conversation scripts in Google Doc | Coach/PM | 3 days | Full conversation flow in both languages |
| Recruit 10 pilot teachers via existing WhatsApp groups | Coach | 3 days | 10 confirmed pilot teachers |
| Manually simulate morning check-in with each teacher | Coach | 5 days | 50+ conversation records |
| Manually generate 20 lesson plans using Claude directly | Coach + developer | 5 days | 20 sample plans rated by coach |
| Collect teacher feedback via voice note or form | Coach | 3 days | Feedback report |
| Iterate conversation language and plan format | PM + Coach | 3 days | Finalized scripts and plan template |
| Document all conversation states and decision trees | Developer | 2 days | Conversation flow diagram |

**Milestone:** Go/no-go decision for Phase 2 based on teacher feedback and plan quality scores

---

### Phase 2 — Core Build (Weeks 4–8)
**Goal:** Build the minimal working WhatsApp bot with lesson plan generation.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Set up Node.js project, Supabase, Railway, Twilio sandbox | Developer | 2 days | Dev environment live |
| Build teacher onboarding conversation flow | Developer | 4 days | Onboarding works end-to-end |
| Build teacher profile CRUD (DB + API) | Developer | 2 days | Profile stored and retrievable |
| Build lesson planning conversation flow | Developer | 4 days | 5-message planning conversation works |
| Integrate Claude API for plan generation | Developer | 3 days | Plans generated from conversation context |
| Build WhatsApp message logging | Developer | 1 day | All messages stored in DB |
| Write and test AI system prompt (30+ test cases) | Coach + Developer | 5 days | Prompt achieving 90%+ plan quality |
| Build plan revision flow (teacher can request changes) | Developer | 2 days | Revision flow works |
| Internal testing with 5 real teachers | Coach + Developer | 5 days | Bug fixes; UX refinements |

**Milestone:** 5 real teachers using system daily; plans rated 4/5+ by coach

---

### Phase 3 — Automation (Weeks 9–12)
**Goal:** Add automated daily messaging, reflection loop, and history.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Build morning check-in scheduler (cron) | Developer | 2 days | Messages sent at 5:00 AM daily |
| Build school-day calendar logic (holidays, weekends) | Developer | 2 days | No messages on non-school days |
| Build evening reflection scheduler | Developer | 2 days | Reflection prompt sent at 2:00 PM |
| Build reflection conversation flow | Developer | 3 days | Full reflection flow works |
| Build challenge classification (AI-assisted) | Developer | 2 days | Challenges tagged automatically |
| Build lesson plan history retrieval ("last plan" command) | Developer | 1 day | Teacher can request last plan |
| Build coaching tip generation on challenge report | Developer | 2 days | Tip sent after challenge reported |
| Build vacation mode (stop/start commands) | Developer | 1 day | Teachers can pause messages |
| Expand pilot to 25 teachers | Coach | 5 days | 25 teachers onboarded |

**Milestone:** 25 teachers receiving automated daily check-ins; 70%+ response rate

---

### Phase 4 — Coach Dashboard (Weeks 13–18)
**Goal:** Build web dashboard for coaches and school leaders.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Design dashboard wireframes | PM + Designer | 3 days | Figma wireframes approved |
| Build React dashboard scaffold + auth (Supabase) | Developer | 3 days | Dashboard login works |
| Build overview page (metric cards + alerts) | Developer | 4 days | Home page live |
| Build teacher list page with filters | Developer | 3 days | Teacher list with status indicators |
| Build teacher detail page | Developer | 4 days | Individual teacher view with history |
| Build analytics page (charts) | Developer | 5 days | All 4 chart types live |
| Build coach alert system (email/WhatsApp digest) | Developer | 3 days | Alerts firing correctly |
| Build report export (PDF) | Developer | 3 days | Weekly report downloadable |
| Build coach-to-teacher message (dashboard → WhatsApp) | Developer | 2 days | Coaches can send messages from dashboard |
| UAT with 5 coaches | Coaches + PM | 5 days | Bug fixes; UX improvements |

**Milestone:** 5 coaches using dashboard weekly; coaches report it improves visit prioritization

---

### Phase 5 — Scale and Depth (Weeks 19–28)
**Goal:** Scale to 500+ teachers; add curriculum integration and advanced coaching features.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Switch from Twilio to Meta WhatsApp Business API | Developer | 1 week | Direct API live; cost reduced |
| Apply for Meta WhatsApp Business verification | PM | Ongoing (start Week 12) | Verified business account |
| Build curriculum SLO library (province-wise) | PM + Content | 2 weeks | SLOs selectable from menu |
| Build activity suggestion library | Content + Developer | 2 weeks | Low-resource activity bank searchable |
| Build peer learning module (teachers share plans) | Developer | 1 week | Opt-in plan sharing between teachers |
| Build multi-province support (language, curriculum) | Developer | 1 week | Punjab + KPK + Sindh profiles |
| Load testing: simulate 500 concurrent teachers | Developer | 3 days | System stable at scale |
| Build admin panel (add coaches, schools, bulk onboard) | Developer | 1 week | Admin tools live |
| Build offline message queue (retry on failure) | Developer | 3 days | No lost messages on API downtime |

**Milestone:** 500+ teachers; system stable; cost per plan under PKR 5

---

## 18. Testing Strategy

### Unit Tests
- `generateLessonPlan()` — given valid input, returns plan with all 6 components
- `classifyChallenge()` — given challenge text, returns correct category
- `isSchoolDay()` — returns false for weekends and holidays
- `buildSystemPrompt()` — correctly injects all profile fields
- `parseTeacherResponse()` — correctly extracts subject and grades from natural language

### Integration Tests
- WhatsApp webhook receives message → conversation state updates correctly
- Cron job fires → morning messages sent to all active teachers
- Plan generation → plan stored in database → plan retrievable via "last plan"
- Reflection response → challenge logged → coaching tip generated and sent

### Conversation Flow Tests
- Full onboarding flow (10-step happy path)
- Onboarding with invalid inputs (handles gracefully)
- Planning flow with single grade (should still apply multigrade thinking)
- Planning flow with 3 grades simultaneously
- Reflection with challenge → follow-up → coaching tip
- Vacation mode → no messages sent → resume → messages resume

### AI Prompt Quality Tests (Manual, Weekly)
Run 30 test cases with varying inputs and rate each plan:
- [ ] Contains shared opener
- [ ] Both grades active simultaneously (not sequential)
- [ ] Teacher movement instructions present
- [ ] Peer learning moment present
- [ ] No banned resources mentioned
- [ ] Word count under 600
- [ ] Correct language used
- [ ] Textbook page referenced

**Target:** 95% of generated plans pass all 8 checks

### Load Tests
- Simulate 100 simultaneous inbound messages
- Simulate morning cron sending 500 messages in sequence
- Measure Claude API latency under concurrent requests
- Verify Supabase handles 50 concurrent DB queries

### User Acceptance Testing
- 5 pilot teachers test full flow for 1 week
- 2 coaches test dashboard for 3 days
- Collect SUS (System Usability Scale) score: target 70+

---

## 19. Pilot Implementation Plan

### Pilot Design
- **Duration:** 4 weeks
- **Teachers:** 15–20 multigrade rural teachers
- **Coaches:** 2–3 instructional coaches
- **Geography:** 1 district (KPK or Punjab preferred for connectivity)
- **Selection criteria:** Teachers already in coach's cluster, willing to participate, Android phone with WhatsApp

### Pilot Week-by-Week

**Week 1: Onboarding and Baseline**
- Coach manually onboards all teachers via WhatsApp
- System sends first morning check-ins
- Baseline data collected: current planning habits, lesson plan quality, time spent planning
- Daily check-in calls with coach to surface issues

**Week 2: Daily Use — Planning Focus**
- Teachers use system every morning
- Coach monitors dashboard (if Phase 4 complete) or manual log
- Coach contacts 2–3 teachers mid-week for qualitative feedback
- Lesson plans reviewed by coach for quality

**Week 3: Reflection Loop**
- Evening reflections begin
- Challenges logged and coaching tips delivered
- Coach reviews challenge data and visits 2 flagged teachers

**Week 4: Consolidation and Feedback**
- Final week of data collection
- End-of-pilot survey with all teachers
- Focus group with 5 teachers (voice call)
- Debrief with coaches

### Pilot Data to Collect
- Morning check-in response rate (target: 70%+)
- Lesson plan generation rate (target: 60%+ of teachers per week)
- Teacher-reported time savings on planning
- Plan quality score (coach assessment of 5 plans per teacher)
- Teacher NPS: "Would you recommend this assistant to another teacher?" (target: 8+/10)
- Challenges reported (qualitative)

### Pilot Success/Fail Criteria
**Continue to Phase 3:** response rate > 60%, plan quality > 3.5/5, teacher NPS > 7
**Iterate before continuing:** response rate 40–60%, quality 2.5–3.5
**Pause and redesign:** response rate < 40% or NPS < 5

---

## 20. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| WhatsApp API approval delayed | High | High | Use Twilio sandbox for pilot; apply for Meta verification in Week 1 |
| Teachers don't respond to morning messages | High | High | Test message timing in Phase 1; offer opt-in for different times; use coach encouragement |
| AI generates sequential (non-multigrade) plans | Medium | High | Explicit prompt instruction + validation check; human review of first 50 plans |
| Poor connectivity causes message failures | High | Medium | Retry queue; offline caching; coach as backup for plan sharing |
| Teachers share the bot number and unknown users message | Medium | Low | Phone number whitelist; "not registered" response with onboarding link |
| Urdu text rendering issues on older Android phones | Medium | Medium | Test on low-end Android (Samsung A03); avoid complex Unicode; test with 5 devices |
| Meta WhatsApp policy violation (template rejected) | Medium | High | Review all templates with Meta policy team early; have fallback text-only versions |
| Claude API cost exceeds budget at scale | Low | Medium | Set token limits; cache repeated prompts; use Haiku for classification tasks |
| Teacher data privacy breach | Low | High | Row-level security in Supabase; no PII in logs; data retention policy 12 months |
| Coach disengages from dashboard | Medium | Medium | Weekly digest via WhatsApp; keep dashboard to 1 key screen; mobile-responsive |
| Multigrade plans are too generic for specific textbooks | Medium | Medium | Curate textbook-specific prompt examples; build SLO library in Phase 5 |

---

## 21. Teacher Adoption Strategy

### The Adoption Barrier
Teachers in rural Pakistan will not adopt a new tool if:
- It feels like surveillance or evaluation
- It adds work without immediately reducing other work
- It requires technical skills they don't have
- It doesn't work reliably on their phone

### Adoption Principles
1. **Coach as champion** — every teacher is introduced to the system by their coach, not by an institution. Trust is transferred.
2. **Value in first 10 minutes** — the onboarding flow ends with a full lesson plan. Teachers feel the benefit immediately.
3. **WhatsApp is the interface** — no new app, no browser, no login. If teachers already use WhatsApp, they can use this.
4. **Language is everything** — warm, supportive Urdu that sounds like a colleague, not a government form.
5. **Low stakes reflection** — framing reflection as "sharing, not reporting" reduces anxiety about negative responses.

### Onboarding Campaign (Per Cluster)
1. Coach holds a 30-minute orientation session (in person or WhatsApp group)
2. Coach demonstrates the system live: "Let me show you what happened when I asked for a Math lesson"
3. Teachers onboard together during the session (coach available for help)
4. First morning message sent to all participants that same evening
5. Coach follows up individually with any teacher who didn't receive or respond to the first message

### Retention Campaign
- Week 2: Coach shares anonymized examples of strong plans from pilot group ("Look what Maryam's class did with this activity")
- Week 3: Coach highlights one teacher's positive reflection in group chat
- Monthly: Auto-generated "Your month in numbers" message to each teacher (e.g., "You created 14 lesson plans this month! 🎉")
- Quarterly: Coach shares aggregate planning data with school leader to show teacher effort

### Addressing "This is just surveillance" Concern
- Be transparent: tell teachers what data is stored and who sees it
- Frame coach dashboard as "helps your coach help you better"
- Teachers can delete their profile at any time
- Coach cannot see individual lesson plan content without teacher's permission (optional toggle in Phase 5)

---

## 22. Scaling Strategy

### Scale Targets
| Milestone | Teachers | Schools | Coaches |
|---|---|---|---|
| Pilot | 20 | 5 | 2 |
| District rollout | 200 | 50 | 15 |
| Provincial rollout | 2,000 | 500 | 100 |
| National scale | 20,000 | 5,000+ | 500+ |

### Technical Scaling Approach
- **Database:** Supabase scales to ~100k rows without change; at national scale, migrate to dedicated PostgreSQL cluster
- **Backend:** Railway supports horizontal scaling; add load balancer at 500+ concurrent users
- **WhatsApp API:** Meta Cloud API handles unlimited volume; rate limits can be increased via Meta support
- **Claude API:** Anthropic enterprise tier for volume pricing; implement response caching for identical prompts
- **Cron jobs:** Move from in-process cron to dedicated job queue (BullMQ + Redis) at 1,000+ teachers

### Organizational Scaling Approach
- Train coaches to train other coaches (train-the-trainer model)
- Build self-service onboarding (teacher registers via a link, no coach required)
- Build bulk onboarding (upload CSV of teachers → all onboarded automatically)
- Partner with provincial education departments for official endorsement
- Integrate with existing teacher registration systems (TEMIS, EMIS)

### Content Scaling
- Hire Urdu-speaking curriculum specialists to curate textbook-specific SLO libraries
- Build community contribution model: coaches submit effective plans to a shared library
- Regional variants: Sindhi, Pashto, Balochi language support for frontier provinces

---

## 23. Budget Estimates

### Phase 1 — Manual Validation (Month 1)
| Item | Cost (PKR) |
|---|---|
| Coach time (coordination, simulation) | Internal |
| Twilio WhatsApp sandbox (100 messages) | ~500 |
| Claude API for manual plan testing (100 calls) | ~2,000 |
| **Total** | **~PKR 2,500 / ~$9 USD** |

### Phase 2–3 — Core Build + Automation (Months 2–4)
| Item | Monthly Cost (PKR) |
|---|---|
| Railway backend hosting | ~3,000 |
| Supabase (free tier sufficient at pilot scale) | 0 |
| Twilio WhatsApp (25 teachers × 2 msg/day × 30 days) | ~15,000 |
| Claude API (25 plans/day × 30 days @ ~500 tokens each) | ~8,000 |
| Vercel frontend hosting | 0 (free tier) |
| **Monthly Total** | **~PKR 26,000 / ~$93 USD** |

### Phase 4 — Dashboard (Month 5–6)
| Item | One-time Cost (PKR) |
|---|---|
| Developer time (part-time, 6 weeks) | ~120,000 |
| Design (Figma, wireframes) | ~15,000 |
| **Total** | **~PKR 135,000 / ~$480 USD** |

### Phase 5 — Scale to 500 Teachers
| Item | Monthly Cost (PKR) |
|---|---|
| Meta WhatsApp Business API (500 × 2 msg/day) | ~40,000 |
| Claude API (300 plans/day) | ~45,000 |
| Railway (2 instances) | ~8,000 |
| Supabase Pro | ~15,000 |
| **Monthly Total** | **~PKR 108,000 / ~$385 USD** |
| **Cost per plan** | **~PKR 5 per lesson plan** |

### National Scale Estimate (20,000 teachers)
| Item | Monthly Cost (USD) |
|---|---|
| WhatsApp API | ~$800 |
| Claude API (enterprise pricing) | ~$1,200 |
| Infrastructure | ~$500 |
| **Total** | **~$2,500/month for 20,000 teachers (~$0.13/teacher/month)** |

---

## 24. Team Requirements

### Minimum Team for MVP (Phase 1–3)
| Role | Time Commitment | Responsibilities |
|---|---|---|
| Instructional Coach / PM (you) | 50% | Conversation design, prompt testing, teacher onboarding, quality review |
| Backend Developer | 100% | Node.js API, WhatsApp integration, DB, cron jobs, Claude API integration |
| Content Specialist (Urdu) | 25% | Urdu translations, message review, cultural appropriateness check |

### Expanded Team for Phase 4–5
| Role | Addition | Responsibilities |
|---|---|---|
| Frontend Developer | Add at Phase 4 | React dashboard build |
| QA Engineer | Add at Phase 4 | Test automation, regression testing |
| DevOps Engineer (part-time) | Add at Phase 5 | Scaling, monitoring, CI/CD |
| Curriculum Content Lead | Add at Phase 5 | SLO library, activity bank |
| Community Manager | Add at Phase 5 | Teacher community, onboarding campaigns |

### Skills Required in Lead Developer
- Node.js / Express (required)
- PostgreSQL / Supabase (required)
- REST API design (required)
- Twilio or WhatsApp Business API (required)
- Anthropic Claude API (required)
- React (required for Phase 4)
- Cron / job scheduling (required)
- Basic DevOps (Railway, Vercel) (required)

---

## 25. Monitoring and Evaluation Framework

### Daily Monitoring (Automated)
- Morning message delivery rate (alert if < 95%)
- Claude API error rate (alert if > 2%)
- Average plan generation latency (alert if > 20 seconds)
- Unhandled conversation states (alert if > 5/day)

### Weekly Review (Coach + PM)
- Teacher engagement scorecard (check-in rate, planning rate, reflection rate)
- Plan quality spot-check: 5 randomly selected plans reviewed by coach against rubric
- New challenges emerged (review challenge log)
- System errors and resolution log

### Monthly Evaluation
| Metric | Source | Target |
|---|---|---|
| Planning completion rate | Database | 70%+ of school days |
| Morning check-in response rate | Database | 70%+ |
| Lesson plan quality score | Coach assessment | 4.0/5.0+ |
| Teacher satisfaction (survey) | Monthly SMS survey | 4.0/5.0+ |
| Coach dashboard usage | Auth logs | 80%+ of coaches weekly |
| Cost per plan | API billing | Under PKR 10 |

### Quarterly Program Evaluation
- Compare SLO scores for students taught by system users vs. non-users (where available)
- Teacher focus groups: qualitative feedback on impact
- Coach interviews: how has visit preparation changed?
- Lesson observation: coach rates a live lesson — is multigrade quality improving?
- Generate impact report for program leadership

### 6-Month Outcomes Review
The ultimate purpose of this system is to improve student learning. At 6 months, evaluate:
1. Have teacher planning habits changed? (frequency, quality, multigrade approach)
2. Have coaches changed how they allocate school visits?
3. Is there evidence of improved student engagement or learning outcomes?
4. What challenges remain unaddressed by the system?

---

## Appendix A — Conversation Script Library

### Urdu Morning Message Templates

**Standard (Monday–Thursday):**
```
Assalamu Alaikum {name}! 🌅
Aaj ka din mubarak ho.
Aaj ke lesson plans ready hain?

1️⃣ - Haan, ready hain ✅
2️⃣ - Abhi nahi bani ❌
```

**Friday variant:**
```
Assalamu Alaikum {name}! 🌙
Juma Mubarak! Aaj ka din accha jaye.
Aaj ke plans ready hain?

1️⃣ - Haan ✅
2️⃣ - Madad chahiye ❌
```

**After 3 consecutive missed check-ins:**
```
Assalamu Alaikum {name}!
Kuch din se aapki khabar nahi aayi.
Sab theek hai? 🤔

0 - Haan sab theek hai, main active hoon
```

### Urdu Evening Reflection Templates

**Standard:**
```
Aaj ki class kaisi rahi {name}? 🏫

1️⃣ - Plan successful raha ✅
2️⃣ - Kuch challenges aaye 🤔
3️⃣ - Plan complete nahi ho saka ⏳
```

**After successful reflection (previous day):**
```
Kal ka din bahut acha raha Maryam! 🌟
Aaj bhi wahi jazba rakhein.

Aaj ki class kaisi rahi?
1️⃣ - Acha ✅  2️⃣ - Challenges 🤔  3️⃣ - Incomplete ⏳
```

---

## Appendix B — Recommended First Actions This Week

1. **Today:** Copy the AI system prompt from Section 9 and test it manually in Claude.ai with 5 real lesson plan requests
2. **Day 2:** Draft all Urdu conversation messages with a native speaker review
3. **Day 3:** Identify 10 willing pilot teachers through your existing coaching network
4. **Day 4:** Set up a free Twilio sandbox account and test sending/receiving WhatsApp messages
5. **Day 5:** Create the Supabase project and implement the `teachers` and `lesson_plans` tables
6. **Week 2:** Begin manual simulation of the full conversation flow with 3 pilot teachers

---

*This system is not a replacement for human coaching. It is a daily presence between coaching visits — a warm, reliable, pedagogically grounded companion that helps teachers face each classroom morning better prepared than the day before.*
