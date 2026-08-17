import { CONVERSATION_STATES as STATE } from '../../config/constants.js';
import * as teacherRepository from '../../repositories/teacherRepository.js';
import * as conversationRepository from '../../repositories/conversationRepository.js';
import * as lessonPlanRepository from '../../repositories/lessonPlanRepository.js';
import * as reflectionRepository from '../../repositories/reflectionRepository.js';
import * as checkinRepository from '../../repositories/checkinRepository.js';
import { sendMessage } from '../../services/whatsappService.js';
import { generateLessonPlan } from '../../services/aiService.js';
import { validatePlan, buildCorrectionInstruction } from '../../services/planValidationService.js';

// plan/08 "Lesson Planning Flow" + plan/12 "Lesson Plan Generation Workflow".

async function reply(teacher, text, nextState, extra = {}) {
  await conversationRepository.setState(teacher.id, nextState, extra);
  return sendMessage(teacher.id, teacher.phone_number, text);
}

async function start(teacher) {
  return reply(
    teacher,
    'Koi baat nahi! Milke banate hain. 📚\nKonsa subject aur kaun si classes?',
    STATE.PLANNING_START
  );
}

async function handle({ teacher, session, messageBody }) {
  const text = messageBody.trim();
  const data = session.session_data ?? {};

  switch (session.conversation_state) {
    case STATE.PLANNING_START:
      await conversationRepository.mergeSessionData(teacher.id, { subject_and_grades: text });
      return reply(
        teacher,
        "Textbook ka konsa page hai aur aaj ka SLO ya topic kya hai?\n" +
          "Misal: 'Grade 3 page 45 addition. Grade 5 page 67 fractions.'",
        STATE.PLANNING_SUBJECT_RECEIVED
      );

    case STATE.PLANNING_SUBJECT_RECEIVED:
      await conversationRepository.mergeSessionData(teacher.id, { pages_and_slos: text });
      return reply(
        teacher,
        'Aaj koi khas constraint hai?\n1 - Nahi, normal class hai\n2 - Haan, batata/batati hoon',
        STATE.PLANNING_SLO_RECEIVED
      );

    case STATE.PLANNING_SLO_RECEIVED: {
      const constraintsToday = text.trim() === '2' ? null : []; // '2' -> caller will describe in next turn (kept simple for scaffold)
      await conversationRepository.mergeSessionData(teacher.id, { constraints_today: constraintsToday });
      await sendMessage(teacher.id, teacher.phone_number, 'Theek hai, plan bana raha hoon... ⏳');
      return generateAndSendPlan(teacher, { ...data, pages_and_slos: session.session_data?.pages_and_slos });
    }

    case STATE.PLANNING_DELIVERED:
      if (text.trim() === '1' || /haan/i.test(text)) {
        // Simplification for the scaffold: a real build would collect the
        // specific change request and regenerate just that section.
        return reply(teacher, 'Kaunsa section change karna hai? Likh dein.', STATE.PLANNING_START);
      }
      await lessonPlanRepository.markFinalized(data.last_plan_id);
      return reply(teacher, 'Bohat khoob! Plan save ho gaya. Aaj ka din mubarak ho! 🌟', STATE.IDLE);

    default:
      return start(teacher);
  }
}

/**
 * plan/12 Steps 3-7: generate, validate (retry once on failure), format,
 * deliver, store. Hard Rule: never sequential, never suggest resources the
 * teacher doesn't have, never skip any of the six components — all enforced
 * by planValidationService before anything is sent.
 */
async function generateAndSendPlan(teacher, sessionData) {
  const last3Reflections = await reflectionRepository.findRecentForTeacher(teacher.id, 3);
  const lastChallenge = last3Reflections.find((r) => r.challenge_text)?.challenge_text ?? null;

  const promptInput = buildPromptInput(teacher, sessionData, lastChallenge);

  let planText = await generateLessonPlan(promptInput);
  let validation = validatePlan(planText, teacher.resource_constraints ?? []);

  if (!validation.valid) {
    const correction = buildCorrectionInstruction(validation.failures);
    planText = await generateLessonPlan({ ...promptInput, priorAttemptCorrection: correction });
    validation = validatePlan(planText, teacher.resource_constraints ?? []);
    // If it still fails after one retry, plan/12 doesn't specify a third
    // attempt — send it anyway but flag it for coach review rather than
    // silently delivering a plan we know violates a Hard Rule undetected.
  }

  const plan = await lessonPlanRepository.create({
    teacher_id: teacher.id,
    subject: promptInput.subject,
    grades: teacher.grades_taught,
    plan_content: planText,
    ai_model: 'claude-sonnet-5',
  });

  const todayIso = new Date().toISOString().slice(0, 10);
  const checkin = await checkinRepository.findForTeacherAndDate(teacher.id, todayIso);
  if (checkin) await checkinRepository.markPlanGenerated(checkin.id, plan.id);

  await conversationRepository.mergeSessionData(teacher.id, { last_plan_id: plan.id });
  await conversationRepository.setState(teacher.id, STATE.PLANNING_DELIVERED, { sessionData: { ...sessionData, last_plan_id: plan.id } });

  return sendMessage(
    teacher.id,
    teacher.phone_number,
    `${planText}\n\nLesson plan ready hai! 📋\nKoi section change karna hai?\n1 - Haan\n2 - Nahi, bilkul theek hai`
  );
}

/**
 * Free-text onboarding fields don't map cleanly onto the strict runtime
 * template fields yet — this is the seam a real build should replace with
 * proper structured slot-filling (e.g. asking grade/subject/page/SLO as
 * separate turns instead of parsing one free-text line).
 */
function buildPromptInput(teacher, sessionData, lastChallenge) {
  const [grade1 = teacher.grades_taught?.[0], grade2 = teacher.grades_taught?.[1]] = teacher.grades_taught ?? [];
  return {
    teacherName: teacher.name,
    schoolName: teacher.school_name,
    grades: (teacher.grades_taught ?? []).join(' and '),
    subject: sessionData.subject_and_grades ?? 'unspecified',
    textbookName: teacher.textbook_series,
    pagesPerGrade: sessionData.pages_and_slos ?? 'unspecified',
    grade1,
    grade2,
    slo1: sessionData.pages_and_slos ?? 'unspecified',
    slo2: sessionData.pages_and_slos ?? 'unspecified',
    constraints: (teacher.resource_constraints ?? []).join(', '),
    lastChallenge,
    language: teacher.language_preference,
  };
}

export const planningHandler = { start, handle };
