# WhatsApp Multigrade Teaching Assistant
## Complete Implementation Plan

**Project Name:** Hum Qadam Teaching Assistant
**Version:** 1.0
**Prepared by:** Teacher Coach / AI Product Lead
**Date:** June 2026

---

## Table of Contents

1. Product Vision
2. Problem Statement
3. User Personas
4. Success Criteria
5. Functional Requirements
6. Non-Functional Requirements
7. User Journeys
8. Conversation Flows
9. AI Prompt Architecture
10. Database Schema
11. Teacher Profile Structure
12. Lesson Plan Generation Workflow
13. WhatsApp Integration Workflow
14. Dashboard Design
15. Analytics Framework
16. Technical Architecture
17. Development Roadmap
18. Testing Strategy
19. Pilot Implementation Plan
20. Risk Analysis
21. Teacher Adoption Strategy
22. Scaling Strategy
23. Budget Estimates
24. Team Requirements
25. Monitoring and Evaluation Framework

---

## 1. Product Vision

### Vision Statement
To put an expert multigrade instructional coach in every rural Pakistani teacher's pocket — available every morning, free of charge, in their own language — so that no teacher ever faces an empty classroom unprepared.

### Mission
Deliver daily, personalized, pedagogically sound lesson planning support and coaching through WhatsApp so that teachers in multigrade rural schools can plan better lessons faster, reflect on their practice, and receive targeted coaching support — without needing a laptop, internet browser, or technical training.

### Core Belief
The biggest leverage point in improving student learning is not curriculum reform or infrastructure investment alone. It is the daily instructional decision-making of the teacher inside the classroom. This system exists to strengthen those decisions at scale.

### What Makes This Different

| Generic EdTech Tools | This System |
|---|---|
| Designed for single-grade classrooms | Designed specifically for multigrade classrooms |
| Requires a laptop or app installation | Works entirely through WhatsApp |
| English-only interface | Urdu-first with English option |
| Assumes printed materials and projectors | Assumes blackboard and chalk only |
| Urban school context | Rural Pakistan classroom reality |
| Teacher logs in and pulls support | System proactively pushes support every morning |
| No coach integration | Coach dashboard powered by teacher data |

### Design Principles
- **Continuity** — the system remembers every teacher's context so they never repeat themselves
- **Proactive** — the system reaches out to teachers, not the other way around
- **Multigrade-first** — every lesson plan assumes two or more grades in one room simultaneously
- **Low-resource by default** — plans assume blackboard and chalk unless teacher confirms otherwise
- **Coach-enabling** — data from daily interactions helps coaches prioritize and personalize support
- **Privacy by design** — teacher data is used to support them, never to evaluate or rank them punitively

---

## 2. Problem Statement

### The Multigrade Teaching Challenge in Pakistan
An estimated 30 to 40 percent of government primary schools in rural Pakistan operate with fewer teachers than grade levels, forcing teachers to manage two or more grade levels simultaneously in a single classroom. This is called a multigrade classroom.

### Specific Problems Identified Through Coaching

**Problem 1 — No multigrade planning support exists**
The national curriculum and all textbooks are designed for single-grade delivery. There is no official guidance, resource, or tool that helps teachers plan for multiple grades at the same time.

**Problem 2 — Teachers plan sequentially, not simultaneously**
Without a framework, teachers teach Grade 3 for 30 minutes then Grade 5 for 30 minutes. One group always sits idle and disengaged. This wastes half the lesson time and causes behaviour problems.

**Problem 3 — Lesson planning is exhausting and time-consuming**
Teachers report spending one to two hours per evening creating plans that still do not address the multigrade challenge. Many give up and teach without a plan entirely.

**Problem 4 — Coaching is infrequent and reactive**
A teacher may see their instructional coach once per month at best. Coaches arrive without structured information about what has happened since their last visit. Follow-up is inconsistent.

**Problem 5 — SLO data does not connect to daily instruction**
Teachers receive assessment results but have no system for translating them into adjusted daily plans. Learning gaps are identified but not addressed.

**Problem 6 — No reflection loop exists**
Without structured end-of-day reflection, teachers repeat ineffective approaches without realising it. There is no mechanism for capturing what worked and what did not.

### Problem Impact
- Students in the idle grade disengage, fall behind, or cause disruption
- Learning gaps compound across grades without correction
- Teacher burnout and planning fatigue increase year over year
- Coach visits are reactive and anecdotal rather than data-driven
- System-level patterns go undetected until they become crises

### The Opportunity
WhatsApp penetration in rural Pakistan exceeds smartphone penetration. Most teachers already use WhatsApp daily for personal communication. A well-designed conversational assistant requires zero learning curve, zero installation, and works on any Android phone with a basic data plan. The marginal effort required from a teacher is sending a few messages — which they already do every day.

---

## 3. User Personas

### Persona 1 — Maryam (Multigrade Primary Teacher)
- **Age:** 26
- **Location:** Rural school, Khyber Pakhtunkhwa
- **Classroom:** Grade 3 and Grade 5 simultaneously, 35 students total
- **Subjects:** Math, Urdu, Science, Social Studies
- **Phone:** Android, WhatsApp active daily user
- **Language:** Urdu strongly preferred
- **Daily reality:** Arrives at school at 7:30 AM. One blackboard. No printer. Mobile signal is weak but usually available. Leaves at 2:00 PM.
- **Planning habit:** Spends one hour every evening creating plans. Plans often only address one grade. Feels guilty about the other grade being ignored.
- **Pain points:** Does not know how to keep both grades engaged at the same time. Repeats the same lesson structure every day because she has no alternative models. Feels unsupported between coaching visits.
- **Motivations:** Wants to be an effective teacher. Feels proud when a lesson goes well. Responds positively to encouragement. Shares successes with her family.
- **Technology comfort:** Uses WhatsApp for voice notes and text. Has never used a web app or educational platform.

### Persona 2 — Ahmed (Instructional Coach)
- **Age:** 34
- **Role:** District-level instructional coach supporting 18 teachers across 6 schools
- **Tools currently used:** Paper register, personal WhatsApp group for school updates, monthly school visit schedule
- **Current challenge:** Visits 6 schools per month. Cannot tell in advance which teachers need the most support. Arrives at schools without current information. Coaching conversations are based on memory, not data.
- **Goal:** Use evidence to prioritize visits. Demonstrate teacher development progress to his district manager. Reduce the time he spends on administrative reporting.
- **Technology comfort:** Uses Google Sheets and WhatsApp confidently. Has navigated web dashboards before. Not a developer.

### Persona 3 — Nadia (Head Teacher / School Leader)
- **Age:** 45
- **Role:** Head Teacher responsible for 6 teachers in her school
- **Goal:** Ensure all teachers plan daily. Understand why SLO results are low. Demonstrate school improvement to her cluster manager.
- **Pain points:** No visibility into what teachers are doing between formal observations. Cannot easily produce a school-level planning report for her manager.
- **Technology comfort:** Uses WhatsApp and basic phone apps. Finds web dashboards overwhelming unless they are very simple.

### Persona 4 — Zara (Cluster / Program Manager)
- **Age:** 38
- **Role:** Education Program Manager overseeing 5 district clusters and 100+ teachers
- **Goal:** Identify systemic professional development needs. Allocate coaching resources efficiently. Report program outcomes to funders.
- **Technology comfort:** Proficient with Excel, dashboards, and presentation tools. Needs exportable reports.

---

## 4. Success Criteria

### Phase 1 — Validation (Weeks 1 to 3)
- At least 8 out of 10 pilot teachers respond to simulated morning check-in messages for 5 consecutive days
- Teachers rate the conversation experience 4 out of 5 or higher on ease of use
- Teachers rate generated lesson plans 4 out of 5 or higher on usefulness
- At least 6 out of 10 teachers report using the generated plan in their actual class

### Phase 2 — Core Build (Weeks 4 to 8)
- System generates a complete multigrade lesson plan within 15 seconds of receiving the final teacher input
- 100 percent of generated plans contain all 6 required multigrade components
- Coach quality review confirms at least 90 percent of plans are pedagogically appropriate
- Zero plans suggest resources the teacher indicated they do not have

### Phase 3 — Automation (Weeks 9 to 12)
- Morning check-in messages delivered to all active teachers by 5:05 AM on every school day
- Evening reflection prompts delivered by 2:05 PM on every school day
- Zero messages sent on weekends or public holidays
- 70 percent or more of active teachers respond to morning check-ins within two hours

### Phase 4 — Dashboard (Weeks 13 to 18)
- Coach can see weekly planning completion rate for all their teachers within three clicks from login
- Dashboard page loads in under three seconds
- At least 80 percent of pilot coaches report the dashboard helps them prioritize school visits
- All five alert conditions fire correctly in automated testing

### Phase 5 — Scale (Weeks 19 to 28)
- System remains stable and responsive with 500 or more active teachers
- Average lesson plan generation and delivery time remains under 15 seconds under load
- Cost per generated lesson plan is under PKR 5
- After six months of use, 60 percent of active teachers show documented improvement in multigrade planning quality as assessed by coaches

---

## 5. Functional Requirements

### FR-01 Teacher Profile Management
The system stores a complete profile for every teacher linked to their WhatsApp phone number. The profile includes name, school, district, province, grade levels taught, subjects taught, textbook series, curriculum version, preferred language, resource constraints, and coaching history. Every AI interaction automatically loads the teacher's profile — teachers never re-enter this information. Teachers can update their profile at any time via a WhatsApp conversation.

### FR-02 Automated Morning Check-In
Every active teacher receives a personalised morning message at 5:00 AM on every school day. The message includes the teacher's name, a warm culturally appropriate greeting, and a binary question about planning readiness. The system handles both the "ready" and "not ready" response paths. Teachers who do not respond within two hours are flagged in the coach dashboard.

### FR-03 Multigrade Lesson Plan Generation
The system collects three inputs from the teacher: subject and grade levels, textbook page number, and today's learning objective or SLO. The Claude Sonnet API generates a structured multigrade lesson plan within 15 seconds. Every plan contains all six required components: shared opener, simultaneous differentiated activities, teacher movement instructions, peer learning opportunity, low-resource adaptation, and shared closing. Plans are formatted for WhatsApp readability with short paragraphs, numbered steps, and emoji section headers. The plan references the teacher's specific textbook and page numbers.

### FR-04 Resource Constraint Adaptation
Teachers can declare constraints at any time: no worksheets, no printing, mixed-age group, blackboard only, outdoor class. The AI adapts every generated plan to respect stated constraints. Constraint preferences are saved to the teacher profile and automatically applied to future plans.

### FR-05 End-of-Day Reflection
The system sends a reflection prompt to every teacher who received a morning check-in at 2:00 PM each school day. The prompt offers three response options: plan was successful, challenges occurred, or plan was not completed. If the teacher reports challenges, the system asks one follow-up question and records the response. A coaching tip is generated and sent based on the reported challenge. All responses are stored linked to the day's lesson plan record.

### FR-06 Lesson Plan History
Every generated lesson plan is stored with date, subject, grades, SLO, and teacher ID. Teachers can send "Last plan" at any time to receive their most recent plan. Coaches can view all plans for any of their teachers on the dashboard. Plans are retained for a minimum of 12 months.

### FR-07 Coach Dashboard
A web-based dashboard gives coaches and school leaders visibility into daily and weekly teacher engagement data. The dashboard shows check-in response rates, planning completion rates by teacher, subjects most and least frequently planned, challenge frequency by category, engagement trends over time, and automatically generated coaching priorities. The coach can send a message directly to any teacher from the dashboard.

### FR-08 Multi-Language Support
All teacher-facing messages are available in Urdu (default) and English. The teacher sets their language preference during onboarding and can change it at any time by sending "Language English" or "زبان اردو".

### FR-09 Teacher Onboarding Flow
New teachers are onboarded through a structured WhatsApp conversation that takes under five minutes. The system collects all required profile fields conversationally. Coaches can also pre-register teachers in bulk via the dashboard by uploading a CSV file. The system sends a confirmation message to each newly registered teacher with a summary of their stored profile.

### FR-10 Coaching Alerts and Notifications
The dashboard automatically identifies and flags teachers who have missed three or more consecutive morning check-ins, have not generated a lesson plan in five or more school days, have reported challenges three or more times in a single week, or show a declining check-in response rate. Coaches receive a daily digest of flagged teachers via email or WhatsApp.

### FR-11 Vacation and Pause Mode
Teachers can pause daily messages by sending "Stop". Messages resume when the teacher sends "Start". Coaches can also activate vacation mode for a teacher via the dashboard. No messages are sent to teachers in vacation mode.

### FR-12 Help and Command Menu
Any teacher can send "Help" or "مدد" at any time to receive a list of available commands in their preferred language. Available commands include: Plan, Last plan, Profile, Update, Language English, زبان اردو, Stop, and Start.

---

## 6. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.5 percent uptime during school hours 6 AM to 4 PM Pakistan Standard Time |
| Response latency | Lesson plan generated and delivered within 15 seconds of the teacher's final input message |
| Message delivery | 98 percent of scheduled messages delivered within 5 minutes of their scheduled time |
| Scalability | Architecture supports 1,000 concurrent active teachers without redesign |
| Offline resilience | System queues outbound messages if WhatsApp API is temporarily unavailable and retries automatically |
| Data privacy | Teacher data stored in a compliant region. No personally identifiable data shared with third parties. Data retention policy of 12 months with teacher-controlled deletion |
| Language accuracy | All Urdu messages reviewed by a native Urdu speaker fluent in Pakistani educational context before deployment |
| Cost efficiency | Lesson plan generation cost under PKR 10 per plan at launch. Target PKR 3 to 5 per plan at scale |
| Device compatibility | System works on any Android phone with WhatsApp installed. No minimum hardware requirement beyond WhatsApp compatibility |
| Audit trail | Every AI-generated response logged with timestamp, teacher ID, input context, model used, token count, and delivery status |
| Security | All API communications over HTTPS. Supabase row-level security enforced. Coach dashboard requires authenticated login. No teacher can view another teacher's data |

---

## 7. User Journeys

### Journey 1 — First-Time Teacher Onboarding

```
Step 1: Teacher sends "Hello" or is invited via a link shared by their coach
Step 2: System responds with a warm welcome message and explains what it does
Step 3: System asks for the teacher's name
Step 4: Teacher replies with their name
Step 5: System asks for school name
Step 6: System asks which grade levels they teach simultaneously
Step 7: System asks which subjects they teach
Step 8: System asks which textbook series they use
Step 9: System asks preferred language: Urdu or English
Step 10: System asks about resource constraints
Step 11: System shows a summary of the stored profile and asks for confirmation
Step 12: Teacher confirms or requests changes
Step 13: System confirms onboarding complete and explains the daily routine
Step 14: Teacher's first morning check-in is scheduled for the next school day
```

### Journey 2 — Daily Morning Planning (Teacher Needs a Plan)

```
5:00 AM: System sends personalised morning message
Teacher selects option 2: "Abhi nahi bani" (not ready)
System asks: "Konsa subject aur kaun si classes?"
Teacher replies: "Math Grade 3 aur Grade 5"
System asks: "Textbook ka konsa page hai aur aaj ka SLO kya hai?"
Teacher replies: "Grade 3 page 45 addition. Grade 5 page 67 fractions."
System generates multigrade lesson plan using Claude API
System delivers formatted plan within 15 seconds
System asks: "Koi section change karna hai?"
Teacher replies: "Nahi, shukriya"
Plan saved to history. Check-in record updated.
```

### Journey 3 — Daily Morning Planning (Teacher Is Already Ready)

```
5:00 AM: System sends personalised morning message
Teacher selects option 1: "Haan, ready hain" (ready)
System responds with encouragement and a brief multigrade teaching tip for the day
System offers: "Koi extra madad chahiye? 1 - Haan 2 - Nahi"
Teacher selects 2: No additional help needed
Check-in recorded as complete. No further messages until afternoon reflection.
```

### Journey 4 — End-of-Day Reflection with Challenge

```
2:00 PM: System sends reflection prompt
Teacher selects option 2: "Kuch challenges aaye"
System asks: "Kya challenge aaya? Briefly batayein."
Teacher replies: "Grade 5 ke bachche akele kaam nahi kar rahe the"
System generates contextual coaching tip using Claude API
System sends tip and logs challenge with category: independent_work
System confirms: "Kal ke plan mein yeh dhyan rakha jayega"
Challenge logged. Coach dashboard updated. Teacher profile enriched with challenge history.
```

### Journey 5 — Coach Reviews Dashboard Before School Visit

```
Ahmed logs into dashboard on Tuesday morning before visiting Maryam's school
Dashboard home shows: 3 teachers flagged for attention this week
Ahmed clicks Maryam's name
Detail page shows: last active 4 days ago, challenge reported twice this week: "independent_work"
AI coaching brief reads: "Maryam has reported difficulty with Grade 5 independent work twice this week.
Her last three plans show strong shared openers but weaker independent activity design.
Suggested observation focus: how she sets up independent tasks. Conversation starter:
Ask Maryam what instruction she gives Grade 5 before moving to Grade 3."
Ahmed exports a one-page school summary PDF
Ahmed visits school with a focused observation agenda based on data
```

---

## 8. Conversation Flows

### State Machine Design
Every teacher has an active conversation state stored in the database. The backend reads this state with every incoming message and routes to the correct handler.

**States:**
- `new` — teacher not yet onboarded
- `onboarding_name` — awaiting name input
- `onboarding_school` — awaiting school name
- `onboarding_grades` — awaiting grade levels
- `onboarding_subjects` — awaiting subjects
- `onboarding_textbooks` — awaiting textbook series
- `onboarding_language` — awaiting language preference
- `onboarding_constraints` — awaiting resource constraints
- `onboarding_confirm` — awaiting profile confirmation
- `idle` — no active conversation, awaiting morning check-in or teacher-initiated command
- `planning_subject` — awaiting subject and grades
- `planning_slo` — awaiting page number and SLO
- `planning_constraints` — awaiting optional constraint confirmation
- `planning_delivered` — plan sent, awaiting revision request
- `reflecting_awaiting` — reflection prompt sent, awaiting response
- `reflecting_challenge` — challenge response received, awaiting detail
- `vacation` — teacher paused, no messages sent

### Complete Onboarding Flow Messages

```
SYSTEM: "Assalamu Alaikum! 👋 Main aapka multigrade teaching assistant hoon.
Rozana subah 5 baje aapko lesson planning mein madad karunga.
Pehle aapka profile banate hain — sirf 2 minute lagenge.
Aapka naam kya hai?"

TEACHER: [enters name]

SYSTEM: "Shukriya {name}! Aapka school ka naam?"

TEACHER: [enters school name]

SYSTEM: "Aap ek saath kaun si classes padhate hain? Misal ke taur par: 'Grade 3 aur 5'"

TEACHER: [enters grades]

SYSTEM: "Aap kaun se subjects padhate hain? Sab likh dein."

TEACHER: [enters subjects]

SYSTEM: "Konsi textbook series use karte hain?
1 - Punjab Textbook Board
2 - KPK Textbook Board
3 - Sindh Textbook Board
4 - Federal Textbook Board
5 - Other"

TEACHER: [selects option]

SYSTEM: "Aap kaunsi zaban mein baat karna chahenge?
1 - Urdu
2 - English"

TEACHER: [selects option]

SYSTEM: "Koi resource constraints hain? Jo bhi lagu ho, number send karein:
1 - Worksheets nahi hain
2 - Printer nahi hai
3 - Sirf blackboard hai
4 - Mixed-age students hain
5 - Koi constraint nahi"

TEACHER: [selects one or more]

SYSTEM: "Shukriya! Yeh hai aapka profile:
Naam: {name}
School: {school}
Classes: {grades}
Subjects: {subjects}
Textbook: {textbook}
Zaban: {language}
Constraints: {constraints}

Kya sab theek hai?
1 - Haan, sahi hai ✅
2 - Kuch change karna hai ✏️"

TEACHER: [confirms or requests change]

SYSTEM: "Mubarak ho {name}! Aapka profile save ho gaya. ✅
Kal subah 5 baje se aapko rozana message ayega.
Jab bhi madad chahiye, 'Help' likhein. Allah Hafiz!"
```

### Complete Lesson Planning Flow Messages

```
SYSTEM (after teacher selects "not ready"):
"Koi baat nahi! Milke banate hain. 📚
Konsa subject aur kaun si classes?"

TEACHER: "Math Grade 3 aur Grade 5"

SYSTEM: "Textbook ka konsa page hai aur aaj ka SLO ya topic kya hai?
Misal: 'Grade 3 page 45 addition. Grade 5 page 67 fractions.'"

TEACHER: [enters pages and SLOs]

SYSTEM: "Aaj koi khas constraint hai?
1 - Nahi, normal class hai
2 - Haan, batata/batati hoon"

[If constraint: collect and save. Then generate plan.]

SYSTEM: "Theek hai, plan bana raha hoon... ⏳"

[PLAN DELIVERED — see Section 12 for format]

SYSTEM: "Lesson plan ready hai! 📋
Koi section change karna hai?
1 - Haan
2 - Nahi, bilkul theek hai"
```

### Complete Reflection Flow Messages

```
SYSTEM (2:00 PM):
"Aaj ki class kaisi rahi {name}? 🏫
1 - Plan successful raha ✅
2 - Kuch challenges aaye 🤔
3 - Plan complete nahi ho saka ⏳"

[If 1 — Successful:]
SYSTEM: "Bohat acha! 🌟 Aapki mehnat rang la rahi hai.
Kal ke liye ek tip: {AI-generated teaching tip}"

[If 2 — Challenges:]
SYSTEM: "Koi baat nahi, challenges se seekhte hain.
Kya challenge aaya? Briefly batayein."

TEACHER: [describes challenge]

SYSTEM: "{AI-generated coaching tip acknowledging challenge}
Yeh aapka feedback save ho gaya. Kal ka plan is cheez ko dhyan mein rakh ke banaya jayega. 💡"

[If 3 — Incomplete:]
SYSTEM: "Theek hai. Kya wajah thi? (Likhna zaroori nahi)
Kal phir koshish karenge. 💪"
```

---

## 9. AI Prompt Architecture

### Master System Prompt

```
You are an expert multigrade instructional coach for rural Pakistani primary schools.
Your name is not mentioned — you are a warm, practical daily planning companion.

YOUR ROLE:
Generate classroom-ready lesson plans for teachers who teach two or more grade levels
simultaneously in the same classroom. Your plans must enable both grades to be actively
learning at the same time — never waiting while the teacher works with the other grade.

WHAT YOU KNOW ABOUT THIS TEACHER:
Name: {teacher_name}
School: {school_name}
Grades teaching simultaneously: {grades}
Subjects: {subjects}
Textbook series: {textbook_series}
Resource constraints: {constraints}
Recent challenge reported: {last_challenge}
Language preference: {language}

TODAY'S LESSON REQUEST:
Subject: {subject}
Grades: {grade_1} and {grade_2}
Textbook pages: Grade {grade_1}: page {page_1}, Grade {grade_2}: page {page_2}
Learning objectives:
  Grade {grade_1}: {slo_1}
  Grade {grade_2}: {slo_2}

MANDATORY PLAN STRUCTURE — ALL SIX COMPONENTS REQUIRED:

1. SHARED OPENER (5 minutes)
   One activity that engages ALL students across BOTH grades simultaneously.
   Must connect to the real world or use a physical/verbal activity.
   Example: pose a question that both grades can answer at their level.

2. GRADE {grade_1} INDEPENDENT WORK (15 minutes)
   A self-directed activity this grade can complete entirely without the teacher.
   Must be achievable with only the textbook and blackboard instructions already written.
   Include: specific page and exercise numbers. Include a "what to do if stuck" instruction.

3. TEACHER LEADS GRADE {grade_2} (15 minutes)
   Direct instruction with the teacher fully present with this grade.
   This should be the concept requiring more teacher scaffolding.
   Include: specific teaching steps, questions to ask, what to write on blackboard.

4. TEACHER MOVEMENT NOTE
   An explicit instruction to the teacher: "After 15 minutes, check Grade {grade_1} work.
   Address one common error on the board. Then move to Grade {grade_2}."
   Be specific about timing and what the teacher does during the transition.

5. SWITCH — GRADE {grade_2} INDEPENDENT, TEACHER SUPPORTS GRADE {grade_1}
   Grade {grade_2} now works independently on a practice exercise.
   Teacher provides support to Grade {grade_1}.
   Include specific activities for both groups.

6. PEER LEARNING MOMENT (5 minutes)
   One structured interaction between grades. Examples:
   an older student explains a concept to a younger student,
   all students complete a physical response activity together,
   a mixed-pair sharing activity.

7. SHARED CLOSING (5 minutes)
   One activity involving ALL students. Can be: class question and answer,
   physical response (stand if true / sit if false), exit ticket spoken aloud,
   or a brief show of hands assessment.

FORMATTING RULES FOR WHATSAPP:
- Use emoji headers: 🌟 Opener, 📚 Grade X Work, 👩‍🏫 With Grade Y, 🔄 Switch, 🤝 Together, 🎯 Closing
- Short paragraphs — maximum 3 lines each
- Numbered steps within each section
- Total plan length: 400 to 600 words
- Do NOT use markdown tables or bullet symbols that break on WhatsApp
- Split into two messages if total exceeds 1,000 characters

BANNED CONTENT:
- Never suggest worksheets unless teacher confirmed they have a printer
- Never suggest projectors, computers, or internet activities
- Never suggest expensive materials or items not found in a rural classroom
- Never generate a sequential plan (teach one grade, then the other — this is explicitly forbidden)

LANGUAGE:
- Write in {language}
- In Urdu: use "aap" (respectful second person), warm collegial tone
- In English: clear, practical, jargon-free
- Tone: like a trusted experienced colleague giving quick practical advice, not an academic document

CRITICAL RULE: Both grades must be actively learning at all times during the plan.
If you are about to write "while Grade X waits" — stop and redesign that section.
```

### Prompt for Coaching Tip After Challenge

```
Context: A teacher in a rural Pakistani multigrade classroom just reported this challenge:
"{challenge_text}"

Teacher context:
- Teaches {grades} simultaneously
- Subject: {subject}
- School resource level: low (blackboard and chalk only unless stated otherwise)
- Language: {language}

Generate ONE specific, practical coaching tip that:
1. Acknowledges the challenge in one sentence without judgment
2. Offers one concrete low-resource strategy to address it in tomorrow's lesson
3. Ends with a single encouraging sentence

Length: 4 to 5 sentences maximum.
Tone: warm, collegial, brief — like a trusted coach sending a quick note.
Language: {language}
Do not start with "I" or "As a coach".
```

### Prompt for Pre-Observation Coaching Brief

```
You are preparing a coaching brief for an instructional coach who is about to visit a teacher.

TEACHER DATA:
Name: {teacher_name}
School: {school_name}
Grades: {grades}
Last 5 lesson plans: {plan_summaries}
Last 10 reflection responses: {reflection_data}
Challenges reported in last 30 days: {challenge_list}
Planning completion rate (last 30 days): {completion_rate}%
Subjects skipped most frequently: {skipped_subjects}

Write a 2-paragraph coaching brief for the visiting coach. Include:
Paragraph 1: Key patterns observed — what is this teacher doing consistently well,
and what recurring challenges appear in the data?
Paragraph 2: Recommended observation focus for today's visit, and one specific
conversation starter the coach can use with this teacher.

Keep the total brief under 150 words. Be specific and evidence-based.
Tone: professional, collegial, focused. Written for a coach, not for the teacher.
```

### Prompt for Weekly Analytics Summary

```
Generate a plain-language weekly coaching summary for the following cluster data.

Week: {week_dates}
Total active teachers: {total_teachers}
Check-in response rate: {checkin_rate}%
Planning completion rate: {planning_rate}%
Most planned subjects: {top_subjects}
Most skipped subjects: {skipped_subjects}
Most common challenges reported: {challenge_categories}
Number of teachers flagged for support: {flagged_count}
Schools with lowest completion rates: {low_schools}

Write a 3 to 4 sentence summary a coach can share with their district manager.
Highlight the most important pattern and the highest-priority action for next week.
Tone: data-informed, constructive, action-oriented.
Language: English.
```

---

## 10. Database Schema

### Table: teachers
```sql
CREATE TABLE teachers (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number          VARCHAR(20) UNIQUE NOT NULL,
  name                  VARCHAR(100),
  school_name           VARCHAR(200),
  district              VARCHAR(100),
  province              VARCHAR(100),
  grades_taught         TEXT[],
  subjects_taught       TEXT[],
  textbook_series       VARCHAR(100),
  curriculum_version    VARCHAR(50),
  language_preference   VARCHAR(10) DEFAULT 'urdu',
  resource_constraints  TEXT[],
  onboarding_complete   BOOLEAN DEFAULT FALSE,
  active                BOOLEAN DEFAULT TRUE,
  vacation_mode         BOOLEAN DEFAULT FALSE,
  coach_id              UUID REFERENCES coaches(id),
  morning_message_time  TIME DEFAULT '05:00:00',
  evening_message_time  TIME DEFAULT '14:00:00',
  timezone              VARCHAR(50) DEFAULT 'Asia/Karachi',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: lesson_plans
```sql
CREATE TABLE lesson_plans (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id            UUID REFERENCES teachers(id) NOT NULL,
  generated_at          TIMESTAMPTZ DEFAULT NOW(),
  subject               VARCHAR(100),
  grades                TEXT[],
  textbook_pages        JSONB,
  slos                  JSONB,
  constraints_applied   TEXT[],
  plan_content          TEXT,
  plan_version          INT DEFAULT 1,
  teacher_finalized     BOOLEAN DEFAULT FALSE,
  ai_model              VARCHAR(50),
  prompt_tokens         INT,
  completion_tokens     INT,
  generation_latency_ms INT,
  validation_passed     BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: daily_checkins
```sql
CREATE TABLE daily_checkins (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id            UUID REFERENCES teachers(id) NOT NULL,
  checkin_date          DATE NOT NULL,
  message_sent_at       TIMESTAMPTZ,
  delivery_status       VARCHAR(20),
  teacher_responded     BOOLEAN DEFAULT FALSE,
  response_value        VARCHAR(10),
  responded_at          TIMESTAMPTZ,
  response_time_minutes INT,
  plan_generated        BOOLEAN DEFAULT FALSE,
  plan_id               UUID REFERENCES lesson_plans(id),
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(teacher_id, checkin_date)
);
```

### Table: reflections
```sql
CREATE TABLE reflections (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id            UUID REFERENCES teachers(id) NOT NULL,
  lesson_plan_id        UUID REFERENCES lesson_plans(id),
  reflection_date       DATE NOT NULL,
  prompt_sent_at        TIMESTAMPTZ,
  response_value        VARCHAR(10),
  challenge_text        TEXT,
  challenge_category    VARCHAR(100),
  coaching_tip_sent     TEXT,
  responded_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: conversation_sessions
```sql
CREATE TABLE conversation_sessions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id            UUID REFERENCES teachers(id) NOT NULL,
  conversation_state    VARCHAR(50) NOT NULL,
  awaiting_input_for    VARCHAR(50),
  session_data          JSONB DEFAULT '{}',
  last_inbound_at       TIMESTAMPTZ,
  last_outbound_at      TIMESTAMPTZ,
  last_whatsapp_msg_id  VARCHAR(100),
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(teacher_id)
);
```

### Table: coaches
```sql
CREATE TABLE coaches (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  VARCHAR(100) NOT NULL,
  email                 VARCHAR(200) UNIQUE NOT NULL,
  phone_number          VARCHAR(20),
  district              VARCHAR(100),
  province              VARCHAR(100),
  role                  VARCHAR(50) DEFAULT 'coach',
  dashboard_access      BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: whatsapp_messages
```sql
CREATE TABLE whatsapp_messages (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id            UUID REFERENCES teachers(id),
  direction             VARCHAR(10) NOT NULL,
  whatsapp_message_id   VARCHAR(100),
  content               TEXT,
  status                VARCHAR(20),
  sent_at               TIMESTAMPTZ,
  delivered_at          TIMESTAMPTZ,
  read_at               TIMESTAMPTZ,
  error_code            VARCHAR(50),
  created_at            TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: public_holidays
```sql
CREATE TABLE public_holidays (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holiday_date          DATE UNIQUE NOT NULL,
  holiday_name          VARCHAR(200),
  province              VARCHAR(100) DEFAULT 'all',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 11. Teacher Profile Structure

### Complete Profile Object (JSON)
```json
{
  "id": "uuid",
  "phone_number": "+923001234567",
  "personal": {
    "name": "Maryam",
    "language": "urdu"
  },
  "school": {
    "name": "GPS Darra Khel",
    "district": "Swabi",
    "province": "KPK",
    "type": "government_primary"
  },
  "teaching_context": {
    "grades_taught": ["3", "5"],
    "subjects_taught": ["Math", "Urdu", "Science", "Social Studies"],
    "is_multigrade": true,
    "textbook_series": "KPK Textbook Board",
    "curriculum_version": "SNC 2022",
    "total_students_approximate": 38
  },
  "resource_constraints": {
    "has_worksheets": false,
    "has_printer": false,
    "has_projector": false,
    "has_manipulatives": false,
    "has_blackboard": true,
    "notes": "Blackboard and chalk only. Students have textbooks."
  },
  "coaching": {
    "coach_id": "uuid",
    "last_coach_visit_date": "2026-05-10",
    "recurring_challenges": ["independent_work", "student_engagement"],
    "strengths_noted": ["questioning_technique", "classroom_warmth"]
  },
  "engagement_stats": {
    "checkin_response_rate_30d": 0.82,
    "plans_generated_30d": 14,
    "reflection_response_rate_30d": 0.71,
    "consecutive_active_days": 4,
    "last_active_at": "2026-06-17T09:15:00Z"
  },
  "system": {
    "active": true,
    "vacation_mode": false,
    "onboarding_complete": true,
    "morning_message_time": "05:00",
    "evening_message_time": "14:00",
    "timezone": "Asia/Karachi",
    "created_at": "2026-01-15T00:00:00Z"
  }
}
```

---

## 12. Lesson Plan Generation Workflow

### Seven-Step Pipeline

**Step 1 — Input Collection**
The conversation handler collects subject, grade levels, textbook pages, and SLOs through a 3-message exchange. If the teacher previously saved constraints, those are loaded automatically from their profile.

**Step 2 — Context Assembly**
The system loads the teacher's full profile from the database using their phone number. It builds the runtime prompt by injecting all profile fields into the master system prompt template. Recent challenge history from the last three reflections is appended.

**Step 3 — AI Generation**
The assembled prompt is sent to the Claude Sonnet API. Temperature is set to 0.7 for practical creativity. Maximum output tokens are set to 900. The response is streamed to reduce perceived latency.

**Step 4 — Quality Validation**
The system checks for the presence of all six required section keywords. It checks that no banned resource words appear (worksheet, projector, printer, internet, computer). It checks that the response is within the 400 to 600 word target. If any check fails, a correction instruction is appended to the prompt and generation is retried once.

**Step 5 — WhatsApp Formatting**
The plan is split into message-sized chunks if it exceeds 1,000 characters. Emoji section headers are confirmed present. Line breaks are normalised for WhatsApp rendering.

**Step 6 — Delivery**
Messages are sent via the WhatsApp API. Message IDs and delivery status are logged. The system waits for the delivery confirmation webhook before proceeding.

**Step 7 — Storage and State Update**
The complete plan, prompt tokens, completion tokens, latency, and validation status are saved to the lesson_plans table. The daily_checkins record is updated: plan_generated set to true, plan_id linked. The conversation state is set to planning_delivered. The system sends the revision offer message.

### Sample Lesson Plan Output (Urdu, Grade 3 and Grade 5, Math)

```
📋 Aaj ka Lesson Plan
Math | Grade 3 & Grade 5 | {date}

🌟 OPENER — Sab Saath (5 min)
Board par likhein: "10 aam, 3 doston mein barabar?"
Haath uthane ko kahein. Grade 3 se puchein: kya yeh add hoga ya minus?
Grade 5 se puchein: yeh fraction mein kaise likhenge?

📚 GRADE 3 — Akele Kaam (15 min)
Kitaab page 45, Exercise 1, sawaal 1 se 6.
Board par instruction likhein: "Har sawaal mein pehle + likhein phir jawab."
Agar phas jayein: pehla sawaal dobara parhein aur teacher ka wait karein.

👩‍🏫 TEACHER GRADE 5 KE SAATH (15 min)
Page 67 khol lein. Board par likhein: 1/2, 1/4, 3/4.
Puchein: "Yeh kya hain?" Students jawab dein.
3 examples halal karein. 2 students se board par likhwaein.

🔄 TEACHER KI MOVEMENT
15 min baad: Grade 5 ko 3 practice sawaal board par likhein.
Grade 3 ke paas jayein. 3 copies check karein.
Ek common ghalti board par dobara samjhayein.

🤝 PEER LEARNING (5 min)
Har Grade 5 student ek Grade 3 student ko ek sawaal samjhaye.
Pairs banayein. 2 minute dein.

🎯 CLOSING — Sab Saath (5 min)
Sab khare ho jayein.
Teacher sawaal puchein: Grade 3 ko addition, Grade 5 ko fraction.
Sahi jawab par baith jayein.

✅ Kal ke liye save kar lein!
```

---

## 13. WhatsApp Integration Workflow

### Provider Strategy
**Phase 1 to 3 (Pilot up to 50 teachers):** Twilio WhatsApp Sandbox
- Setup time: under 2 hours
- No Meta Business verification required
- Cost: approximately $0.005 per message
- Limitation: higher cost at scale

**Phase 4 to 5 (50 to 500+ teachers):** Meta WhatsApp Business Cloud API
- Apply for Meta Business verification in Week 10 (takes 2 to 4 weeks)
- Lower per-message cost at scale
- Requires approved message templates for outbound proactive messages
- Direct integration, no Twilio dependency

### Inbound Message Handling Flow

```
1. Teacher sends a WhatsApp message
2. Meta/Twilio webhook fires POST request to /webhook/whatsapp
3. Backend verifies webhook signature for security
4. Extracts: from_number, message_body, message_id, timestamp
5. Looks up teacher record by phone_number in database
6. If not found: sends onboarding welcome message, creates session with state = 'new'
7. If found: loads conversation_sessions record for this teacher
8. Routes to handler based on conversation_state:
   - state starts with 'onboarding_': OnboardingHandler
   - state starts with 'planning_': PlanningHandler
   - state starts with 'reflecting_': ReflectionHandler
   - message body is a command keyword: CommandHandler
   - state is 'idle': IntentClassifier determines intent
9. Handler processes input, updates state, generates response
10. Response sent via WhatsApp API
11. Message logged in whatsapp_messages table
12. conversation_sessions updated with new state
```

### Outbound Scheduled Message Flow

```
Cron runs at 4:50 AM PKT every day
1. Check if today is a school day (not weekend, not in public_holidays table)
2. If not a school day: log "skipped — non-school day" and exit
3. Query: SELECT all teachers WHERE active = true AND vacation_mode = false
4. For each teacher:
   a. Build personalised morning message from template
   b. Send via WhatsApp API
   c. Insert record into daily_checkins table with message_sent_at timestamp
   d. Handle API errors: retry up to 3 times with 30-second delay
   e. Log final delivery status
5. Log total: "Morning check-in sent to X teachers"

Cron runs at 1:50 PM PKT every school day
1. Check school day status
2. Query: SELECT teachers who received a morning check-in today
3. For each teacher: send evening reflection prompt
4. Insert record into reflections table
5. Log delivery status
```

### WhatsApp Message Templates (Pre-Approved for Meta API)

**Template: morning_checkin_urdu**
```
Assalamu Alaikum {{1}}! 🌅
Aaj ka din mubarak ho.
Aaj ke lesson plans ready hain?
1 - Haan, ready hain ✅
2 - Abhi nahi bani ❌
```

**Template: evening_reflection_urdu**
```
Aaj ki class kaisi rahi {{1}}? 🏫
1 - Plan successful raha ✅
2 - Kuch challenges aaye 🤔
3 - Plan complete nahi ho saka ⏳
```

---

## 14. Dashboard Design

### Page 1 — Overview (Home)

**Header:** "Good morning, {coach_name}. Here is your cluster update for {date}."

**Metric Cards (top row):**
- Teachers active today: 18 / 24
- Plans generated this week: 67
- Reflection responses this week: 54
- Teachers flagged for support: 3

**Alert Panel:**
A table of flagged teachers with columns: Name, School, Alert Reason, Last Active, and an "Open Profile" button. Alert reasons include: "Missed 3+ check-ins", "No plan in 5+ days", "Challenge reported 3x this week".

**Quick Actions:**
- "Send a message to all teachers" button
- "Download weekly report" button

---

### Page 2 — Teacher List

A filterable table with columns:
- Name (links to detail page)
- School
- Last Active Date
- Check-in Rate (30 days)
- Plans Generated (30 days)
- Status (On Track / Needs Attention / Flagged)

Filters: By school, by status, by grade taught, by subject.

---

### Page 3 — Teacher Detail

**Profile Card:** Name, school, grades, subjects, textbook, language, coach assigned, onboarding date.

**Activity Timeline:** A day-by-day view of the last 14 days. Each day shows: check-in sent, check-in responded, plan generated, reflection responded, challenge reported.

**Lesson Plans List:** Table with Date, Subject, Grades, and a "View Plan" link for each plan.

**Challenge Log:** Chronological list of all reported challenges with category and coaching tip sent.

**AI Coaching Brief:** Auto-generated paragraph summarising patterns and suggesting observation focus. Refreshes weekly.

**Send Message Box:** Coach types a message, clicks Send. Message is delivered to the teacher via WhatsApp. Response (if any) is shown in the thread.

---

### Page 4 — Analytics

**Chart 1 — Planning by Subject (Bar Chart)**
Shows which subjects are most and least planned across all teachers this month. Enables identification of curriculum gaps.

**Chart 2 — Weekly Completion Heatmap (Grid)**
Schools on vertical axis. Weeks on horizontal axis. Cell colour shows planning completion rate for that school that week. Green (80%+), Amber (50 to 79%), Red (below 50%).

**Chart 3 — Challenge Frequency (Horizontal Bar Chart)**
Shows the most common challenge categories this month. Example: "Independent work: 34 reports", "Student engagement: 28 reports".

**Chart 4 — Engagement Trend (Line Chart)**
Shows check-in response rate over the last 8 weeks as a line graph. Enables coaches to see whether engagement is improving or declining over time.

---

### Page 5 — Reports

Pre-built report templates:
- **Weekly Planning Report:** Summary of check-in rates, planning rates, challenges, flagged teachers for the past 7 days
- **Monthly School Report:** Per-school breakdown of planning completion, challenge trends, teacher growth
- **Individual Teacher Report:** Full history for a single teacher over a specified date range

Export formats: PDF, CSV. Reports can also be emailed directly to a school leader or program manager.

---

## 15. Analytics Framework

### Core Metrics Computed Daily
```javascript
planning_completion_rate = lesson_plans_generated / school_days_in_period
checkin_response_rate = checkins_responded / checkins_sent
reflection_response_rate = reflections_responded / reflections_sent
avg_response_time_minutes = average(responded_at - message_sent_at) per teacher
challenge_frequency = count(reflections where response_value = '2')
subjects_skipped = subjects_in_profile not found in lesson_plans this week
consecutive_inactive_days = days since last any inbound message
```

### Challenge Classification (AI-Assisted)
Every challenge text submitted by a teacher is automatically classified into one of these categories using a lightweight Claude API call:
- `independent_work` — students cannot work without teacher present
- `student_engagement` — students are off-task or disengaged
- `time_management` — lesson ran over time or could not finish
- `content_knowledge` — teacher unsure of subject content
- `classroom_management` — behaviour disruption
- `resource_limitation` — lacked materials to execute plan
- `multigrade_coordination` — difficulty managing two grades simultaneously
- `other` — does not fit above categories

### Automated Alert Rules

| Condition | Severity | Action |
|---|---|---|
| 3+ consecutive missed check-ins | Amber | Add to needs-attention list |
| 5+ school days with no plan generated | Amber | Flag on dashboard |
| Same challenge reported 3+ times in 7 days | Red | Push alert to coach |
| Check-in response rate below 50% in a week | Amber | Weekly digest alert |
| School planning completion rate below 60% in a week | Red | Alert to school leader |
| Teacher has not responded to any message in 7 days | Red | Urgent flag to coach |

### Weekly Aggregations (Computed Every Sunday Night)
For each teacher, school, and cluster:
- Planning completion rate
- Check-in response rate
- Most planned subject
- Most skipped subject
- Top challenge category
- Consecutive active days
- Change in response rate vs. previous week

---

## 16. Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEACHER (WhatsApp)                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────────┐
│          WhatsApp Business API (Twilio → Meta Cloud API)        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Webhook + API calls
┌───────────────────────────▼─────────────────────────────────────┐
│                  NODE.JS BACKEND (Railway)                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                EXPRESS API SERVER                        │  │
│  │  POST /webhook/whatsapp                                  │  │
│  │  GET  /api/dashboard/:coach_id                           │  │
│  │  GET  /api/teachers/:id                                  │  │
│  │  POST /api/teachers/:id/message                          │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │             CONVERSATION ROUTER                          │  │
│  │  Reads conversation_state → routes to correct handler   │  │
│  │  OnboardingHandler | PlanningHandler | ReflectionHandler │  │
│  │  CommandHandler | IntentClassifier                       │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │               AI SERVICE LAYER                           │  │
│  │  LessonPlanGenerator                                     │  │
│  │  CoachingTipGenerator                                    │  │
│  │  ChallengeClassifier                                     │  │
│  │  CoachBriefGenerator                                     │  │
│  │  WeeklySummaryGenerator                                  │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │ Anthropic SDK                       │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │              SCHEDULER (node-cron)                       │  │
│  │  MorningCheckInJob    — 04:50 PKT weekdays               │  │
│  │  EveningReflectionJob — 13:50 PKT weekdays               │  │
│  │  WeeklyAnalyticsJob   — Sunday 22:00 PKT                 │  │
│  │  CoachAlertDigestJob  — 07:00 PKT weekdays               │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                 SUPABASE (PostgreSQL + Auth)                     │
│  Row-level security | Realtime | Edge functions                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│              REACT DASHBOARD (Vercel)                           │
│  Supabase Auth | React Query | Recharts | Tailwind CSS          │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Backend runtime | Node.js | 20 LTS | Async-native, strong WhatsApp SDK support |
| Backend framework | Express.js | 4.x | Lightweight REST API |
| AI | Anthropic Claude Sonnet API | claude-sonnet-4-6 | Lesson plan and coaching content generation |
| WhatsApp (Pilot) | Twilio WhatsApp API | Latest | Fast sandbox setup, no Meta approval needed |
| WhatsApp (Scale) | Meta WhatsApp Business Cloud API | v18+ | Lower cost at volume, direct integration |
| Database | Supabase (PostgreSQL) | Latest | Managed Postgres, built-in auth, realtime |
| Job scheduling | node-cron | 3.x | In-process scheduled jobs for morning/evening messages |
| Job scheduling (Scale) | BullMQ + Redis | Latest | Replaces node-cron at 500+ teachers |
| Frontend | React + Vite | React 18 | Component-based dashboard |
| UI library | Tailwind CSS + shadcn/ui | Latest | Rapid consistent UI development |
| Charts | Recharts | Latest | React-native charting library |
| Dashboard auth | Supabase Auth | Latest | JWT-based role management |
| Backend hosting | Railway | Latest | Simple deployment, Pakistan-region available |
| Frontend hosting | Vercel | Latest | Fast CDN, free tier for dashboard |
| Error monitoring | Sentry | Latest | Alerting and error tracking |
| Logging | Winston | Latest | Structured server-side logging |
| Environment config | dotenv | Latest | Secrets management |

---

## 17. Development Roadmap

### Phase 1 — Manual Validation (Weeks 1 to 3)
**Goal:** Prove the concept works before writing a single line of code.
**Budget:** Under $10 USD
**Team:** Coach (you) only

| Week | Specific Actions | Expected Output | Dependencies |
|---|---|---|---|
| 1 | Write all conversation scripts in Google Docs in Urdu and English. Design morning message, planning flow, reflection flow, and help menu. | Finalised conversation scripts reviewed by a native Urdu speaker | Access to a native Urdu educational vocabulary reviewer |
| 1 | Recruit 10 multigrade teachers from your current coaching cluster who own Android phones with WhatsApp | Confirmed list of 10 pilot teachers with phone numbers | Existing coaching relationships |
| 2 | Manually simulate the morning check-in every day for 5 school days. Send messages yourself and record all responses | 50+ conversation records with response times and content | Pilot teacher consent |
| 2 | Manually generate 20 lesson plans using Claude.ai directly. Copy teacher inputs, paste into Claude, forward plan to teacher | 20 lesson plans rated by teachers (1 to 5) and by coach (6-component checklist) | Claude.ai access |
| 3 | Conduct 15-minute voice call feedback with 5 teachers. Ask about: clarity of messages, plan usability, timing preferences, language comfort | Qualitative feedback report with quotes | Teacher availability |
| 3 | Analyse all data. Refine message scripts and plan format based on feedback. Make go/no-go decision | Finalised scripts, decision document, Phase 2 brief | All pilot data collected |

**Milestones:** 
- End of Week 2: First lesson plan rated 4/5 or above by a real teacher
- End of Week 3: Go/No-Go decision document signed off

**Risks in Phase 1:**
- Teachers do not respond consistently → Adjust message timing; involve coach as champion
- Plans are too long for WhatsApp → Shorten format; split into two messages
- Urdu language feels unnatural → Revise with native speaker input

---

### Phase 2 — Core Build (Weeks 4 to 8)
**Goal:** Build a working WhatsApp bot that onboards teachers and generates lesson plans on request.
**Budget:** Approximately $150 to $200 USD
**Team:** Coach + 1 Backend Developer

| Week | Specific Actions | Expected Output | Dependencies |
|---|---|---|---|
| 4 | Set up Node.js project with Express. Configure Supabase database. Deploy to Railway. Set up Twilio WhatsApp sandbox. Configure environment variables. | Dev environment live. Webhook receives test messages. | Twilio account, Railway account, Supabase account |
| 4 | Create all database tables from schema in Section 10. Seed with one test teacher record. | All tables created. Basic CRUD API endpoints working. | Database schema finalised |
| 5 | Build onboarding conversation flow — all 10 states with message templates. Test full flow end-to-end. | New teacher can complete onboarding in under 5 minutes via WhatsApp | Urdu message scripts from Phase 1 |
| 5 | Build lesson planning conversation flow — 3-message input collection, context assembly, Claude API call, plan delivery | Teacher receives a generated lesson plan within 15 seconds of last input | Claude API key, system prompt from Phase 1 testing |
| 6 | Build plan quality validation — check all 6 components present, no banned resources, retry if failed | 100% of delivered plans pass validation | Validation keyword list |
| 6 | Build plan revision flow — teacher can request a section change, system regenerates that section only | Teacher can request "change opener" and receive updated opener | Plan stored in session |
| 7 | Build command handler — Help, Last Plan, Profile, Update, Stop, Start | All commands work correctly in both Urdu and English | Command keyword list |
| 7 | Build WhatsApp message logging — all inbound and outbound messages stored with delivery status | Complete message history in database | whatsapp_messages table |
| 8 | Deploy to production. Onboard 10 pilot teachers. Run for 1 week with real teachers. Fix bugs. | 10 teachers using system; plans generated and rated; bug log resolved | Phase 1 pilot teacher group |

**Milestones:**
- End of Week 6: Full planning flow works end-to-end in development
- End of Week 8: 10 real teachers using system; 0 critical bugs

**Risks in Phase 2:**
- Claude API generates sequential plans → Strict system prompt + validation + retry enforces compliance
- WhatsApp messages fail to deliver → Implement retry queue with exponential backoff
- Teacher gives unexpected input → Build graceful fallback for unrecognised responses

---

### Phase 3 — Automation (Weeks 9 to 12)
**Goal:** System runs itself daily. Teachers receive morning messages and evening reflections automatically.
**Budget:** Approximately $100/month operational
**Team:** Coach + Backend Developer

| Week | Specific Actions | Expected Output | Dependencies |
|---|---|---|---|
| 9 | Build morning check-in cron job running at 4:50 AM PKT every day. Personalise message for each teacher. Log in daily_checkins. | Morning messages delivered to all active teachers by 5:05 AM | node-cron, teacher table, WhatsApp API |
| 9 | Build school-day calendar with Pakistan public holidays for the current school year. Implement isSchoolDay() function. | Zero messages on non-school days. Calendar testable in isolation. | Pakistan academic calendar data |
| 10 | Build evening reflection cron job at 1:50 PM PKT. Insert reflection record. Handle each response path. | Evening prompt sent and responses stored automatically | Reflection flow from Phase 2 |
| 10 | Build challenge classification using Claude Haiku API (cost-efficient for short text). Tag every challenge with a category. | Every reported challenge categorised within 5 seconds of receipt | Challenge categories defined |
| 11 | Build coaching tip generation — triggered immediately after challenge classification. Tip sent within 10 seconds of challenge submission. | Teacher receives contextual coaching tip after reporting a challenge | Coaching tip prompt from Section 9 |
| 11 | Build vacation mode — Stop and Start commands update teacher record. Cron jobs skip vacationing teachers. | Teacher in vacation mode receives no messages. Resume works correctly. | Vacation mode flag in teachers table |
| 12 | Expand pilot to 25 teachers. Run full automation for 2 weeks. Monitor for missed messages, double sends, wrong-timing errors. | 25 teachers in fully automated daily cycle. 70%+ response rate. | 25 recruited teachers |

**Milestones:**
- End of Week 10: Full automation running without manual intervention for 5 consecutive school days
- End of Week 12: 25-teacher pilot with 70%+ morning response rate

---

### Phase 4 — Coach Dashboard (Weeks 13 to 18)
**Goal:** Give coaches a web-based tool to monitor all their teachers and prioritise support.
**Budget:** Approximately $200 one-time development + $100/month operational
**Team:** Coach + Backend Developer + Frontend Developer

| Week | Specific Actions | Expected Output | Dependencies |
|---|---|---|---|
| 13 | Design wireframes for all 5 dashboard pages. Coach reviews and approves designs. | Approved Figma wireframes | Coach availability for review |
| 13 | Build React dashboard scaffold with Vite. Configure Supabase Auth for coach login. Set up routing. | Dashboard login works. Coach can authenticate. | React setup, Supabase Auth |
| 14 | Build Overview page — metric cards, alert panel, quick action buttons. Wire to real Supabase data. | Live overview page showing real teacher data | All data in Supabase |
| 15 | Build Teacher List page — table with filters, sorting, status colour coding, link to detail page. | Paginated teacher list with correct filter logic | teachers, daily_checkins tables |
| 15 | Build Teacher Detail page — activity timeline, lesson plans list, challenge log, AI coaching brief, send message box. | Full teacher detail view with coach brief generation | lesson_plans, reflections tables |
| 16 | Build Analytics page — all four charts wired to real data. Weekly aggregations computed and stored on Sunday nights. | Live analytics charts with real data | WeeklyAnalyticsJob |
| 17 | Build alert system — flag computation runs nightly. Alerts visible on Overview page. Coach receives daily digest via email (SendGrid) or WhatsApp. | Alerts firing correctly. Coach notified of flagged teachers by 7 AM daily. | SendGrid account or coach WhatsApp number |
| 17 | Build PDF report export — weekly summary and individual teacher report. | Downloadable PDF report in under 10 seconds | Report template designed |
| 18 | User acceptance testing with 3 coaches for 1 full week. Collect feedback. Fix top 5 issues. | UAT complete. Dashboard approved by coaches. | 3 coaches available for testing |

**Milestones:**
- End of Week 16: All five dashboard pages live with real data
- End of Week 18: UAT passed. Dashboard in production use.

---

### Phase 5 — Scale and Depth (Weeks 19 to 28)
**Goal:** Grow to 500+ teachers, reduce costs, add curriculum integration.

| Week | Specific Actions | Expected Output | Dependencies |
|---|---|---|---|
| 19–20 | Apply for and receive Meta WhatsApp Business API verification. Switch from Twilio to Meta Cloud API. | 40–60% reduction in per-message cost | Meta Business verification (apply in Week 10) |
| 21–22 | Build curriculum SLO library for Punjab, KPK, Sindh textbooks. Teacher selects SLO from menu instead of typing. | SLO menu works for 3 provinces, 3 subjects, Grades 1–5 | Curriculum content team |
| 23–24 | Build self-service onboarding — teacher registers via a shared link, no coach required. Build bulk CSV onboarding for coaches. | New teacher can onboard without coach assistance. Coach can add 20 teachers in 5 minutes. | Onboarding flow tested |
| 25 | Migrate from node-cron to BullMQ + Redis job queue for reliability at volume. | Cron jobs stable with 500+ teachers. No missed or double sends. | Redis instance on Railway |
| 26 | Load test with simulated 500 concurrent teachers. Fix bottlenecks. | System handles 500 active teachers with <15 second plan generation at p95 | Load testing scripts |
| 27–28 | Scale pilot to 500 teachers across 3 provinces. Monitor all metrics. Conduct 6-month impact review. | 500 active teachers. Cost per plan under PKR 5. 6-month impact report published. | Coach network across 3 provinces |

---

## 18. Testing Strategy

### Unit Tests

| Function | Test Case |
|---|---|
| `generateLessonPlan()` | Given valid profile + lesson inputs, returns plan with all 6 components |
| `validatePlan()` | Returns false when any of 6 components are missing |
| `validatePlan()` | Returns false when banned resource word appears in plan |
| `classifyChallenge()` | Given "students won't sit still", returns "student_engagement" |
| `isSchoolDay()` | Returns false for Saturday and Sunday |
| `isSchoolDay()` | Returns false for a date in the public_holidays table |
| `buildSystemPrompt()` | Correctly injects all 15 teacher profile fields |
| `parseGradeInput()` | Extracts ["3","5"] from "Math Grade 3 aur Grade 5" |

### Integration Tests

| Scenario | Expected Behaviour |
|---|---|
| WhatsApp webhook receives message from known teacher | Conversation state loads, response sent within 3 seconds |
| WhatsApp webhook receives message from unknown number | Onboarding welcome message sent, new session created |
| Morning cron fires on a school day | All active teachers receive check-in by 5:05 AM |
| Morning cron fires on a weekend | Zero messages sent, log shows "skipped — non-school day" |
| Teacher sends final planning input | Plan generated, stored, delivered, check-in updated |
| Teacher reports challenge | Challenge classified, coaching tip generated, tip delivered, reflection record updated |
| Teacher sends "Stop" | vacation_mode set to true, next morning cron skips this teacher |

### Conversation Flow Tests (Full Happy Path)

- Complete onboarding from "Hello" to confirmed profile (10 steps)
- Morning check-in → option 1 → encouragement + tip → end
- Morning check-in → option 2 → plan request → plan delivered → revision offered → "no thanks" → end
- Evening reflection → option 1 → encouragement → end
- Evening reflection → option 2 → challenge text → coaching tip → end
- Evening reflection → option 3 → optional reason → encouragement → end
- "Help" command → menu displayed
- "Last plan" command → most recent plan retrieved and sent
- "Stop" command → confirmation sent, vacation mode activated
- "Start" command → confirmation sent, vacation mode deactivated

### AI Quality Test Protocol (Run Weekly)

For each of 30 test cases covering different subjects, grade combinations, and constraint scenarios, rate the generated plan:

- [ ] Contains shared opener engaging both grades
- [ ] Both grades are active simultaneously at all times
- [ ] Teacher movement instructions are explicit and timed
- [ ] Peer learning moment is present
- [ ] No banned resource words appear
- [ ] Correct language used (Urdu or English per teacher profile)
- [ ] Textbook page number referenced correctly
- [ ] Total word count between 400 and 600
- [ ] No sequential teaching (one grade waiting while other is taught)
- [ ] Plan is achievable in a rural low-resource classroom

**Target:** 95 percent of plans pass all 10 checks.

### Load Tests

- Simulate 100 simultaneous inbound webhook messages
- Simulate morning cron sending 500 personalised messages in sequence
- Measure Claude API p50, p95, and p99 latency under 50 concurrent requests
- Verify Supabase handles 100 concurrent read queries without timeout

### User Acceptance Testing

Conducted in two rounds: after Phase 2 (5 teachers, 3 days) and after Phase 4 (5 coaches, 5 days).

Metrics collected:
- Task completion rate (can teacher complete onboarding without assistance?)
- Time-on-task (how long does it take to get a plan from first message to delivery?)
- System Usability Scale score (target: 70 or above)
- Qualitative feedback on language, tone, plan quality, and timing

---

## 19. Pilot Implementation Plan

### Pilot Parameters
- **Duration:** 4 weeks of live use (after Phase 2 or 3 is complete)
- **Teacher count:** 15 to 20 multigrade teachers
- **Coach count:** 2 to 3 instructional coaches
- **Geography:** 1 district (recommendation: Swabi or Mardan in KPK for connectivity reliability)
- **Selection criteria:** Currently in coach's cluster, owns Android with WhatsApp, teaches two or more grades simultaneously, willing to provide feedback

### Week-by-Week Pilot Plan

**Pilot Week 1 — Onboarding and Baseline**
- Day 1: Coaches host a 30-minute orientation (in person or group call). Demonstrate the system live. Teachers onboard during the session with coach support.
- Days 2 to 5: System sends morning check-ins. Coach monitors response rates daily. Coach calls any teacher who has not responded by 8 AM.
- End of week: Collect baseline data — current planning time, current planning quality, current lesson structure.

**Pilot Week 2 — Daily Use, Planning Focus**
- System fully automated for morning check-ins and planning support.
- Coach reviews 2 generated lesson plans per teacher against the 6-component rubric.
- Coach calls 3 teachers mid-week for 10-minute qualitative check-in.
- Track: response rate, plan generation rate, plan quality scores.

**Pilot Week 3 — Reflection Loop Active**
- Evening reflection prompts running. Challenges being logged and coaching tips delivered.
- Coach reviews challenge log on dashboard and selects 2 flagged teachers to visit.
- Observation focus during visit: are teachers implementing the multigrade structures suggested in plans?
- Track: reflection response rate, challenge categories, coaching tip ratings.

**Pilot Week 4 — Consolidation and Exit**
- Final week of structured data collection.
- End-of-pilot survey sent to all teachers (via WhatsApp — simple 5-question rating survey).
- Focus group call with 5 teachers: "What changed? What would you tell another teacher about this?"
- Debrief with all coaches: "How has this changed how you prepare for school visits?"
- Final data analysis and pilot report written.

### Pilot Data to Collect

| Metric | Collection Method | Target |
|---|---|---|
| Morning check-in response rate | Database | 70%+ |
| Plan generation rate | Database | 60%+ of school days |
| Teacher time savings on planning | Survey | 30+ minutes saved per day |
| Plan quality score | Coach assessment of 5 plans per teacher | 4.0 / 5.0+ |
| Teacher NPS score | Survey question | 8+ out of 10 |
| Plans actually used in class | Teacher self-report in reflection | 70%+ |
| Coaches changed visit preparation | Coach interview | Qualitative: yes/no |

### Pilot Go/No-Go Criteria for Phase 4

- **Continue:** Response rate above 60%, plan quality above 3.5/5, teacher NPS above 7
- **Iterate before continuing:** Response rate 40 to 60%, or quality 2.5 to 3.5 — redesign the weakest element
- **Pause and redesign:** Response rate below 40%, or NPS below 5 — return to Phase 1 manual validation

---

## 20. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Teachers do not respond to morning messages consistently | High | High | Test message timing in Phase 1 pilot. Offer choice of 5 AM or 6 AM send time. Use coach as an adoption champion. Show teachers their plan in first interaction to demonstrate immediate value. |
| AI generates sequential plans (Grade X then Grade Y) instead of simultaneous | Medium | High | System prompt explicitly forbids sequential plans. Programmatic validation checks before delivery. If validation fails, retry with corrective instruction. Spot-check 5 plans per week. |
| Poor mobile connectivity causes message delivery failures | High | Medium | Implement retry queue with 3 attempts at 30-second intervals. Log all failures. Coach dashboard shows delivery status. WhatsApp typically queues messages when recipient is offline and delivers when they reconnect. |
| Meta WhatsApp Business API verification delayed or rejected | High | Medium | Use Twilio sandbox throughout Phases 1 to 4. Apply for Meta verification in Week 10. If rejected, continue on Twilio at higher per-message cost. |
| Teachers perceive the system as monitoring or surveillance | Medium | High | Explicit transparency: tell teachers at onboarding exactly what is stored and who can see it. Frame all messaging as "support" not "monitoring." Position coach dashboard as "helping your coach help you better." Give teachers data deletion rights. |
| Urdu text rendering breaks on older Android phones | Medium | Medium | Test all message templates on Samsung A03 and equivalent low-end devices before launch. Avoid complex Unicode characters. Use plain text with emoji rather than formatted symbols. |
| Claude API generates plans that suggest unavailable resources | Medium | High | Constraints stored in teacher profile are injected into every prompt. Banned resource keyword validation runs before delivery. Any failed validation triggers a retry. |
| Developer leaves project mid-build | Low | High | Write thorough technical documentation from Day 1. Use standard well-supported libraries. Code reviewed for clarity. All environment variables and configurations documented. |
| Teacher data privacy breach | Low | Very High | Row-level security in Supabase. No PII in server logs. All API communication over HTTPS. Access tokens rotated monthly. Data retention policy enforced. Privacy notice in onboarding flow. |
| Cost overrun due to Claude API token usage | Low | Medium | Set token limits per request (900 max output). Use Claude Haiku for classification tasks. Cache repeated prompt structures. Monitor daily API spend with budget alerts. |

---

## 21. Teacher Adoption Strategy

### The Fundamental Adoption Principle
A teacher in a rural Pakistani school will adopt a new tool only if:
1. Their trusted coach introduces it personally
2. It requires no new apps, no logins, and no new skills
3. It saves them time within the first 10 minutes of use
4. It speaks to them like a supportive colleague, not an institution
5. They never feel like they are being watched or evaluated

### Launch Strategy — Coach as Champion

Every teacher is introduced to the system by their coach, not by a poster or a government directive. Trust is transferred from coach to tool.

**Step 1:** Coach sends a personal WhatsApp message: "Maryam, main chahta hoon ke aap ek naya tool try karein jo main apne teachers ke sath test kar raha hoon. Sirf 5 minute lagenge. Main bhi saath hoon."

**Step 2:** Coach schedules a group orientation (in person or WhatsApp call) where teachers onboard together and ask questions live.

**Step 3:** Coach confirms with each teacher the morning after their first plan: "Kya plan kaam aaya?" This signals the coach cares and is paying attention.

### Demonstrating Immediate Value
The onboarding conversation ends with a lesson plan. Teachers feel the benefit before they even use the system in a real lesson. This is the single most important retention mechanism.

### Retention Mechanisms

**Week 2:** Coach shares one anonymised example from the pilot in the school WhatsApp group — "Look what Maryam's Grade 3 did with this activity" — without attributing it. Creates social proof.

**Week 3:** Coach highlights one teacher's positive reflection publicly: "Three teachers tried the peer learning section this week. One said her Grade 5 students explained fractions better than she expected."

**Monthly:** System automatically sends each teacher a personal engagement summary: "Aap ne is mahine 14 lesson plans banaye! 🎉 Aapki mehnat qabil-e-taarif hai."

**Quarterly:** Coach presents aggregate data to school leader showing teacher effort — this makes planning visible to leadership and gives teachers credit for their work.

### Addressing Common Objections

**"This is checking up on me"**
Response: "Yeh aapki madad ke liye hai, assessment ke liye nahi. Jo data aata hai woh aapke coach ko batata hai ke aapko kahan support chahiye — it is not shared with anyone else."

**"I don't have time for this"**
Response: "Pehli dafa try karein — sirf 3 messages bhejne hain aur plan ready ho jata hai. Agar 5 minute se zyada laga, main personally maafi maangoonga."

**"My phone is too old"**
Response: "Agar WhatsApp chal raha hai to yeh bhi chalega. WhatsApp ke bahar kuch install karne ki zaroorat nahi."

---

## 22. Scaling Strategy

### Scale Milestones

| Phase | Teachers | Schools | Coaches | Timeline |
|---|---|---|---|---|
| Pilot | 20 | 5 | 2 | Month 3–4 |
| District rollout | 200 | 50 | 15 | Month 6 |
| Provincial rollout | 2,000 | 500 | 100 | Month 12 |
| Multi-provincial | 10,000 | 2,500 | 400 | Month 18 |
| National scale | 20,000+ | 5,000+ | 800+ | Month 24 |

### Technical Scaling Actions

**At 200 teachers:** No architectural changes needed. Monitor Railway CPU and Supabase query times.

**At 500 teachers:**
- Replace node-cron with BullMQ + Redis for reliable job queueing
- Switch from Twilio to Meta WhatsApp Business Cloud API
- Add database indexes on teacher_id, checkin_date, and created_at columns
- Add Railway second instance behind load balancer

**At 2,000 teachers:**
- Move from Supabase shared to Supabase Pro with dedicated resources
- Implement prompt response caching for repeated subject/grade combinations
- Add Anthropic enterprise tier for volume pricing and rate limit increases
- Separate read and write database connections

**At 20,000 teachers:**
- Dedicated PostgreSQL cluster (migrate from Supabase to managed RDS)
- Message queue processing distributed across multiple worker instances
- Content delivery network for dashboard assets
- Separate analytics database to prevent reporting queries impacting operational performance

### Organisational Scaling Actions

**Train-the-Trainer Model:** Pilot coaches train new coaches. Each trained coach trains 3 others. System grows through existing coaching networks.

**Self-Service Onboarding:** Teachers register via a shared link. No coach involvement required for onboarding at scale.

**Bulk Onboarding:** Coaches upload a CSV of teacher names and phone numbers. All profiles created automatically. Teachers receive a welcome message with a link to complete their profile.

**Provincial Partnerships:** Work with provincial education departments to integrate with existing teacher databases (TEMIS, EMIS) for automated profile creation.

**Content at Scale:** Hire curriculum specialists to build province-specific SLO libraries. Enable community contribution: coaches submit effective plans to a shared library that grows over time.

---

## 23. Budget Estimates

### Phase 1 — Manual Validation (Month 1)
| Item | Cost |
|---|---|
| Coach time — coordination and simulation | Internal (no additional cost) |
| Claude.ai Pro for manual plan testing | Free tier sufficient for 100 plans |
| Twilio WhatsApp sandbox for testing messages | Under PKR 500 |
| **Total Phase 1** | **Under PKR 500 / approximately $2 USD** |

### Phase 2 to 3 — Core Build and Automation (Months 2 to 4)
| Item | Monthly Operating Cost |
|---|---|
| Railway backend hosting | PKR 3,000 |
| Supabase free tier (under 500 MB, under 50,000 rows) | Free |
| Twilio WhatsApp — 25 teachers × 4 messages/day × 30 days = 3,000 messages | PKR 12,000 |
| Claude Sonnet API — 25 plans/day × 30 days × 400 tokens average | PKR 7,000 |
| Claude Haiku API — challenge classification × 500 calls | PKR 500 |
| Vercel frontend hosting | Free tier |
| **Monthly Operating Total (Phase 2–3)** | **PKR 22,500 / approximately $80 USD** |

### Phase 4 — Dashboard Development (Month 5 to 6)
| Item | One-Time Cost |
|---|---|
| Frontend developer (6 weeks part-time) | PKR 100,000 |
| Design and wireframing | PKR 15,000 |
| Sentry error monitoring setup | Free tier |
| **Phase 4 One-Time Cost** | **PKR 115,000 / approximately $410 USD** |

### Phase 5 — Scale to 500 Teachers (Monthly Operating)
| Item | Monthly Cost |
|---|---|
| Meta WhatsApp Cloud API — 500 teachers × 4 messages/day × 30 days | PKR 35,000 |
| Claude Sonnet API — 300 plans/day × 30 days | PKR 40,000 |
| Claude Haiku — classification and coaching tips | PKR 5,000 |
| Railway (2 instances + Redis) | PKR 10,000 |
| Supabase Pro | PKR 14,000 |
| **Monthly Total at 500 Teachers** | **PKR 104,000 / approximately $370 USD** |
| **Cost per lesson plan** | **PKR 5 per plan** |

### National Scale Projection (20,000 Teachers Monthly)
| Item | Monthly (USD) |
|---|---|
| Meta WhatsApp API | $800 |
| Claude API (enterprise pricing) | $1,200 |
| Infrastructure | $600 |
| **Total** | **$2,600/month for 20,000 teachers = $0.13 per teacher per month** |

---

## 24. Team Requirements

### Minimum Team for Phases 1 to 3
| Role | Commitment | Key Responsibilities |
|---|---|---|
| Instructional Coach and Product Lead (you) | 50% time | Conversation design, prompt testing, pilot teacher recruitment, plan quality review, user research |
| Backend Developer | 100% time | Node.js API, WhatsApp integration, database, cron jobs, Claude API integration |
| Urdu Content Reviewer | 2 days per phase | Urdu message review, cultural appropriateness check, educational vocabulary accuracy |

### Expanded Team for Phases 4 to 5
| Role | When to Add | Responsibilities |
|---|---|---|
| Frontend Developer | Phase 4 start | React dashboard, charts, authentication, responsive design |
| QA / Test Engineer | Phase 4 start | Test automation, regression testing, load testing |
| Curriculum Content Lead | Phase 5 start | SLO library, activity bank, province-specific content |
| DevOps Engineer (part-time) | Phase 5 start | Infrastructure scaling, CI/CD, monitoring, Redis, load balancing |
| Community Manager | Phase 5 start | Teacher onboarding campaigns, coach training, feedback loops |

### Required Technical Skills for Lead Developer

**Must have:**
- Node.js and Express (required for all phases)
- PostgreSQL and Supabase (required for all phases)
- REST API design and webhook handling (required for all phases)
- Twilio WhatsApp API or Meta WhatsApp Business API (required)
- Anthropic Claude API and prompt engineering (required)
- node-cron or BullMQ job scheduling (required)
- React (required for Phase 4)
- Basic DevOps: Railway, Vercel, environment configuration (required)

**Good to have:**
- Experience with conversational UI or chatbot state machines
- Arabic or Urdu text handling in software
- PDF generation (for report export)
- Redis and job queuing at scale

---

## 25. Monitoring and Evaluation Framework

### Daily Monitoring (Automated Alerts)

| Check | Alert Condition | Alert Recipient |
|---|---|---|
| Morning message delivery rate | Below 95% of active teachers reached | Developer on-call |
| Claude API error rate | Above 2% of requests failing | Developer on-call |
| Average plan generation latency | Above 20 seconds | Developer on-call |
| Unhandled conversation states | More than 5 per day | Developer on-call |
| Cron job completion | Morning or evening job did not complete | Developer on-call |

### Weekly Review (Coach and Product Lead)

Every Monday morning:
- Review previous week's check-in response rate, plan generation rate, reflection response rate
- Spot-check 5 randomly selected lesson plans against 6-component rubric
- Review challenge log: any new patterns emerging?
- Review system error log: any recurring issues?
- Confirm all cron jobs ran correctly on each school day

### Monthly Evaluation

| Metric | Source | Target |
|---|---|---|
| Planning completion rate | Database | 70%+ of school days |
| Morning check-in response rate | Database | 70%+ |
| Lesson plan quality score | Coach assessment of 10 plans | 4.0/5.0+ |
| Teacher satisfaction rating | Monthly 3-question WhatsApp survey | 4.0/5.0+ |
| Coach dashboard weekly usage | Auth login logs | 80%+ of coaches login at least once per week |
| Cost per lesson plan | API billing divided by plans generated | Under PKR 10 (target PKR 5 at scale) |
| Average plan delivery latency | Application logs | Under 15 seconds |

### Quarterly Program Evaluation

**Quantitative:**
- Compare SLO assessment scores for students of system users vs. non-users (where data is available)
- Measure change in planning completion rate vs. pre-system baseline
- Count percentage of teachers with no repeated-challenge pattern (indicates challenge resolved)
- Track coach visit frequency and whether data-driven prioritisation is occurring

**Qualitative:**
- Teacher focus group: "Has your classroom changed because of the lesson plans you receive?"
- Coach interviews: "How has this changed how you prepare for and conduct school visits?"
- Head teacher interviews: "Do you feel more visibility into teacher practice?"
- Classroom observation sample: Rate 5 observed lessons on multigrade quality rubric

### 6-Month Impact Assessment

The ultimate purpose of this system is improved student learning in multigrade classrooms. At the 6-month mark, assess the following:

1. **Teacher planning behaviour change:** Are teachers planning more consistently? Are plans of higher quality? Do plans reflect multigrade structures?

2. **Teacher confidence change:** Do teachers report feeling more confident in multigrade instruction? Do coaches observe changed classroom practice?

3. **Coaching efficiency change:** Are coaches spending less time on administrative preparation and more time on instructional coaching? Are coach visits more targeted?

4. **Early student outcome signals:** Where SLO data is available for the same assessment administered before and after the intervention period, is there a measurable positive change in competency areas that were targeted?

5. **System sustainability:** Is the system running reliably? Is the cost sustainable? Is the team able to maintain and iterate the system without significant external support?

---

## Appendix — Five-Day Quick Start

If you are starting this project today, do these five things this week:

**Day 1:** Open Claude.ai. Paste the AI system prompt from Section 9. Send it 5 real lesson plan requests using actual textbook pages and SLOs from teachers in your current caseload. Rate each plan against the 6-component checklist. Note what works and what needs refinement.

**Day 2:** Write all Urdu conversation messages — morning check-in, planning flow prompts, and evening reflection — in a Google Doc. Share with a colleague who speaks Urdu natively and teaches in a Pakistani school. Ask them: "Does this sound like a supportive colleague or an official form?" Revise based on feedback.

**Day 3:** Identify 10 multigrade teachers from your current coaching cluster who own Android phones with WhatsApp. Message each one personally to explain the idea and ask if they are willing to be part of a two-week pilot. You need willing participants before building anything.

**Day 4:** Create a free Twilio account at twilio.com. Connect your WhatsApp number to the Twilio sandbox by following their 10-minute setup guide. Send a test message to your own phone. Confirm you can send and receive messages programmatically.

**Day 5:** Create a free Supabase project at supabase.com. Use the SQL editor to create the teachers table from Section 10. Insert one row with your own test profile. Write a simple Node.js script that retrieves the row by phone number. Confirm the data flow works end to end.

---

*This system is not a replacement for human coaching. It is the daily presence between coaching visits — a warm, reliable, pedagogically grounded companion that helps every teacher, no matter how remote their school, face each morning better prepared than the day before.*
