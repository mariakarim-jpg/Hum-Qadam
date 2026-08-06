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
morning_message_time  TIME DEFAULT '05:00:00'   -- referenced by Section 11's profile JSON; was missing from this table until merged 2026-08-06
evening_message_time  TIME DEFAULT '14:00:00'
timezone              VARCHAR(50) DEFAULT 'Asia/Karachi'
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

### Table: public_holidays
*(Merged in 2026-08-06 from `notes/planning.md` — Section 13's `isSchoolDay()` logic and CLAUDE.md's Hard Rule "Never send a message on weekends or public holidays" both depend on this table, but it had never been defined here. See `notes/decisions.md` Decision 4.)*
```sql
id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
holiday_date          DATE UNIQUE NOT NULL
holiday_name          VARCHAR(200)
province              VARCHAR(100) DEFAULT 'all'
created_at            TIMESTAMPTZ DEFAULT NOW()
```
