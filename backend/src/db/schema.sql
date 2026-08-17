-- Hum Qadam database schema — transcribed from plan/10-database-schema.md.
-- If this ever drifts from plan/10, plan/10 is the source of truth (see
-- notes/decisions.md Decision 4 on not letting copies go stale).
--
-- Run against a Supabase (Postgres) project. Enable RLS per table before
-- production use — the backend currently relies on the service-role key
-- and its own coach-scoping logic (see repositories/coachRepository.js),
-- not on Postgres RLS policies, which is a gap worth closing before launch.

create extension if not exists "pgcrypto";

create table if not exists coaches (
  id                    uuid primary key default gen_random_uuid(),
  name                  varchar(100) not null,
  email                 varchar(200) unique not null,
  phone_number          varchar(20),
  district              varchar(100),
  schools_assigned      text[],
  role                  varchar(50) default 'coach', -- 'coach' | 'leader' | 'manager'
  dashboard_access      boolean default true,
  created_at            timestamptz default now()
);

create table if not exists teachers (
  id                    uuid primary key default gen_random_uuid(),
  phone_number          varchar(20) unique not null,
  name                  varchar(100),
  school_name           varchar(200),
  district              varchar(100),
  province              varchar(100),
  grades_taught         text[],       -- e.g. ['3', '5']
  subjects_taught       text[],       -- e.g. ['Math', 'Urdu', 'Science']
  textbook_series       varchar(100), -- e.g. 'Punjab Textbook Board'
  curriculum_version    varchar(50),
  language_preference   varchar(10) default 'urdu', -- 'urdu' | 'english'
  resource_constraints  text[],       -- e.g. ['no_worksheets', 'blackboard_only']
  onboarding_complete   boolean default false,
  active                boolean default true,
  vacation_mode         boolean default false, -- FR-11
  coach_id              uuid references coaches(id),
  morning_message_time  time default '05:00:00',
  evening_message_time  time default '14:00:00',
  timezone              varchar(50) default 'Asia/Karachi',
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);
create index if not exists idx_teachers_coach_id on teachers(coach_id);

create table if not exists lesson_plans (
  id                    uuid primary key default gen_random_uuid(),
  teacher_id            uuid references teachers(id) not null,
  generated_at          timestamptz default now(),
  subject               varchar(100),
  grades                text[],
  textbook_pages        jsonb, -- {"3": "45", "5": "67"}
  slos                  jsonb, -- {"3": "addition", "5": "fractions"}
  constraints_applied   text[],
  plan_content          text,  -- full generated plan, WhatsApp-formatted
  plan_version          int default 1,
  teacher_finalized     boolean default false,
  ai_model              varchar(50),
  prompt_tokens         int,
  completion_tokens     int,
  created_at            timestamptz default now()
);
create index if not exists idx_lesson_plans_teacher_id on lesson_plans(teacher_id);

create table if not exists daily_checkins (
  id                    uuid primary key default gen_random_uuid(),
  teacher_id            uuid references teachers(id) not null,
  checkin_date          date not null,
  message_sent_at       timestamptz,
  teacher_responded     boolean default false,
  response_value        varchar(10), -- '1' | '2' | null
  responded_at          timestamptz,
  plan_generated        boolean default false,
  plan_id               uuid references lesson_plans(id),
  created_at            timestamptz default now(),
  unique(teacher_id, checkin_date)
);
create index if not exists idx_checkins_teacher_id on daily_checkins(teacher_id);

create table if not exists reflections (
  id                    uuid primary key default gen_random_uuid(),
  teacher_id            uuid references teachers(id) not null,
  lesson_plan_id        uuid references lesson_plans(id),
  reflection_date       date not null,
  prompt_sent_at        timestamptz,
  response_value        varchar(10), -- '1' | '2' | '3'
  challenge_text        text,
  challenge_category    varchar(100), -- AI-classified
  coaching_tip_sent     text,
  responded_at          timestamptz,
  created_at            timestamptz default now()
);
create index if not exists idx_reflections_teacher_id on reflections(teacher_id);

create table if not exists conversation_sessions (
  id                    uuid primary key default gen_random_uuid(),
  teacher_id            uuid references teachers(id) not null unique,
  session_start         timestamptz,
  session_end           timestamptz,
  conversation_state    varchar(50) not null default 'new',
  awaiting_input_for    varchar(50),
  session_data          jsonb default '{}', -- temporary slot values mid-conversation
  last_message_id       varchar(100),
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

create table if not exists whatsapp_messages (
  id                    uuid primary key default gen_random_uuid(),
  teacher_id            uuid references teachers(id),
  direction             varchar(10) not null, -- 'inbound' | 'outbound'
  message_id            varchar(100),
  content               text,
  media_url             text,
  status                varchar(20), -- 'sent' | 'delivered' | 'read' | 'failed'
  sent_at               timestamptz,
  delivered_at          timestamptz,
  read_at               timestamptz,
  created_at            timestamptz default now()
);
create index if not exists idx_messages_teacher_id on whatsapp_messages(teacher_id);

create table if not exists public_holidays (
  id                    uuid primary key default gen_random_uuid(),
  holiday_date          date unique not null,
  holiday_name          varchar(200),
  province              varchar(100) default 'all',
  created_at            timestamptz default now()
);
