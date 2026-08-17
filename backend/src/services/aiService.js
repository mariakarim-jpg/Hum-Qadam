import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env.js';

const client = new Anthropic({ apiKey: env.anthropicApiKey });

// Transcribed verbatim from plan/09-ai-prompt-architecture.md. If this drifts
// from plan/09, plan/09 is the source of truth.
const MASTER_SYSTEM_PROMPT = `You are an expert multigrade instructional coach for rural Pakistani primary schools.
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
Every plan must have both grades active simultaneously.`;

async function complete({ system, prompt, maxTokens = 900 }) {
  const response = await client.messages.create({
    model: env.anthropicModel,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content.map((block) => (block.type === 'text' ? block.text : '')).join('');
}

/**
 * plan/09 "Prompt for Plan Generation (Runtime Template)".
 * @param {object} input teacherName, schoolName, grades, subject, textbookName,
 *   pagesPerGrade, slos: {grade1, grade2}, constraints, lastChallenge, language
 */
export async function generateLessonPlan(input) {
  const prompt = `Teacher: ${input.teacherName}
School: ${input.schoolName}
Grades teaching simultaneously: ${input.grades}
Subject: ${input.subject}
Textbook: ${input.textbookName}
Pages: ${input.pagesPerGrade}
Learning objectives:
  - Grade ${input.grade1}: ${input.slo1}
  - Grade ${input.grade2}: ${input.slo2}
Resource constraints: ${input.constraints ?? 'none stated'}
Previous challenge (if any): ${input.lastChallenge ?? 'none'}
Language preference: ${input.language ?? 'urdu'}

Generate a complete multigrade lesson plan following all 6 required components.
Format for WhatsApp delivery.`;

  return complete({ system: MASTER_SYSTEM_PROMPT, prompt, maxTokens: 900 });
}

/** plan/09 "Prompt for Coaching Tip (Post-Reflection)". */
export async function generateCoachingTip({ challengeText, grades, subject, schoolContext, language }) {
  const prompt = `Teacher reported this challenge: "${challengeText}"
Teacher's context: ${grades}, ${subject}, ${schoolContext ?? 'low-resource rural school'}

Generate a single, practical coaching tip (3–4 sentences max) that:
1. Acknowledges the challenge without judgment
2. Offers one specific, low-resource strategy to address it tomorrow
3. Ends with an encouraging sentence

Language: ${language ?? 'urdu'}
Tone: warm, collegial, brief`;

  return complete({ prompt, maxTokens: 250 });
}

/** plan/09 "Prompt for Pre-Observation Brief (Coach Dashboard)". */
export async function generateCoachingBrief(input) {
  const prompt = `Teacher: ${input.teacherName}
Recent lesson plans (last 5): ${input.planSummaries}
Reflection responses (last 10): ${input.reflectionData}
Challenges reported: ${input.challengeList}
Planning completion rate (last 30 days): ${input.completionRate}%
Subjects frequently skipped: ${input.skippedSubjects}

Generate a 1-paragraph coaching brief for the coach preparing to visit this teacher.
Include: key patterns, suggested observation focus, conversation starter.
Keep under 150 words.`;

  return complete({ prompt, maxTokens: 300 });
}

/** plan/09 "Prompt for Weekly Analytics Summary" (merged from Decision 4). */
export async function generateWeeklySummary(input) {
  const prompt = `Generate a plain-language weekly coaching summary for the following cluster data.

Week: ${input.weekDates}
Total active teachers: ${input.totalTeachers}
Check-in response rate: ${input.checkinRate}%
Planning completion rate: ${input.planningRate}%
Most planned subjects: ${input.topSubjects}
Most skipped subjects: ${input.skippedSubjects}
Most common challenges reported: ${input.challengeCategories}
Number of teachers flagged for support: ${input.flaggedCount}
Schools with lowest completion rates: ${input.lowSchools}

Write a 3 to 4 sentence summary a coach can share with their district manager.
Highlight the most important pattern and the highest-priority action for next week.
Tone: data-informed, constructive, action-oriented.
Language: English.`;

  return complete({ prompt, maxTokens: 250 });
}

/**
 * Not in plan/09 as a named prompt, but required by plan/15's Challenge
 * Classification (AI-assisted) — kept here alongside the other AI calls.
 */
const CHALLENGE_CATEGORIES = [
  'student_engagement',
  'independent_work',
  'time_management',
  'content_difficulty',
  'classroom_management',
  'resource_limitation',
  'other',
];

export async function classifyChallenge(challengeText) {
  const prompt = `Classify this teacher-reported classroom challenge into exactly one category from this list: ${CHALLENGE_CATEGORIES.join(', ')}.

Challenge: "${challengeText}"

Respond with only the category name, nothing else.`;
  const raw = (await complete({ prompt, maxTokens: 20 })).trim().toLowerCase();
  return CHALLENGE_CATEGORIES.includes(raw) ? raw : 'other';
}
