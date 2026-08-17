/**
 * Constants that encode CLAUDE.md's Hard Rules and style rules directly in
 * code, rather than leaving them as prose someone has to remember to apply.
 * If a rule here changes, it should change in CLAUDE.md first.
 */

// Hard Rule: "Never skip the six required plan components."
// Section names match plan/09-ai-prompt-architecture.md exactly.
export const REQUIRED_PLAN_COMPONENTS = [
  'shared_opener',
  'independent_work',
  'teacher_led_instruction',
  'teacher_movement_notes',
  'switch',
  'peer_learning',
  'shared_closing',
];

// Emoji headers the AI is instructed to use per plan/09 — used by the
// validator to check components actually appear in the generated text.
export const PLAN_SECTION_MARKERS = {
  shared_opener: ['🌟'],
  independent_work: ['📚'],
  teacher_led_instruction: ['👩‍🏫'],
  teacher_movement_notes: ['🔄'],
  switch: ['🔄'],
  peer_learning: ['🤝'],
  shared_closing: ['🎯'],
};

// Hard Rule: "Never suggest resources the teacher does not have."
// Keyed by the resource_constraints values stored on the teacher profile
// (see plan/10-database-schema.md, teachers.resource_constraints).
export const BANNED_WORDS_BY_CONSTRAINT = {
  no_worksheets: ['worksheet', 'handout', 'printout'],
  no_printer: ['worksheet', 'handout', 'printout', 'print'],
  no_projector: ['projector', 'screen', 'slideshow', 'computer', 'laptop'],
  blackboard_only: ['worksheet', 'handout', 'projector', 'computer', 'internet'],
};

// Always-banned regardless of profile, per the Master System Prompt.
export const ALWAYS_BANNED_WORDS = ['internet', 'expensive'];

// CLAUDE.md §4 — message length rules.
export const MAX_CONVERSATIONAL_MESSAGE_WORDS = 160;
export const MAX_MESSAGE_CHARS_BEFORE_SPLIT = 1000;
export const LESSON_PLAN_TARGET_WORDS = { min: 400, max: 600 };

// plan/13 school-day logic: Mon-Fri, checked against public_holidays.
export const SCHOOL_WEEKDAYS = [1, 2, 3, 4, 5]; // 0 = Sunday ... 6 = Saturday

// plan/08 conversation states.
export const CONVERSATION_STATES = {
  NEW: 'new',
  ONBOARDING_START: 'onboarding_start',
  ONBOARDING_NAME_RECEIVED: 'onboarding_name_received',
  ONBOARDING_SCHOOL_RECEIVED: 'onboarding_school_received',
  ONBOARDING_GRADES_RECEIVED: 'onboarding_grades_received',
  ONBOARDING_SUBJECTS_RECEIVED: 'onboarding_subjects_received',
  ONBOARDING_TEXTBOOKS_RECEIVED: 'onboarding_textbooks_received',
  ONBOARDING_LANGUAGE_RECEIVED: 'onboarding_language_received',
  ONBOARDING_CONSTRAINTS_RECEIVED: 'onboarding_constraints_received',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  IDLE: 'idle',
  PLANNING_START: 'planning_start',
  PLANNING_SUBJECT_RECEIVED: 'planning_subject_received',
  PLANNING_SLO_RECEIVED: 'planning_slo_received',
  PLANNING_CONSTRAINTS_RECEIVED: 'planning_constraints_received',
  PLANNING_DELIVERED: 'planning_delivered',
  REFLECTION_PROMPT_SENT: 'reflection_prompt_sent',
  VACATION: 'vacation',
};

// FR-12 / plan/08 Help and Command Flow — matched case-insensitively.
export const COMMANDS = {
  PLAN: ['plan'],
  LAST_PLAN: ['last plan'],
  PROFILE: ['profile'],
  UPDATE: ['update'],
  LANGUAGE_ENGLISH: ['language english'],
  LANGUAGE_URDU: ['زبان اردو'],
  STOP: ['stop'],
  START: ['start'],
  HELP: ['help', 'مدد'],
};

// FR-10 coaching alert thresholds.
export const ALERT_THRESHOLDS = {
  MISSED_CHECKINS: 3,
  NO_PLAN_SCHOOL_DAYS: 5,
  CHALLENGES_PER_WEEK: 3,
};
