import { CONVERSATION_STATES as STATE } from '../../config/constants.js';
import * as conversationRepository from '../../repositories/conversationRepository.js';
import * as reflectionRepository from '../../repositories/reflectionRepository.js';
import { sendMessage } from '../../services/whatsappService.js';
import { generateCoachingTip, classifyChallenge } from '../../services/aiService.js';

// plan/08 "Reflection Flow". FR-05.
// Uses awaiting_input_for (not separate conversation_states) to track which
// of the three reflection sub-steps we're in, per plan/08's Flow
// Architecture field for exactly this purpose.

const AWAITING = {
  INITIAL: 'reflection',
  CHALLENGE_DETAIL: 'reflection_challenge_detail',
  INCOMPLETE_REASON: 'reflection_incomplete_reason',
};

/** Called by the evening-reflection cron job (jobs/eveningReflection.js), not by an inbound message. */
async function start(teacher, lessonPlanId) {
  const today = new Date().toISOString().slice(0, 10);
  await reflectionRepository.createPromptSent(teacher.id, today, lessonPlanId);
  await conversationRepository.setState(teacher.id, STATE.REFLECTION_PROMPT_SENT, { awaitingInputFor: AWAITING.INITIAL });
  return sendMessage(
    teacher.id,
    teacher.phone_number,
    `Aaj ki class kaisi rahi ${teacher.name}? 🏫\n` +
      '1 - Plan successful raha ✅\n2 - Kuch challenges aaye 🤔\n3 - Plan complete nahi ho saka ⏳'
  );
}

async function handle({ teacher, session, messageBody }) {
  const text = messageBody.trim();
  const today = new Date().toISOString().slice(0, 10);
  const reflection = await reflectionRepository.findForTeacherAndDate(teacher.id, today);
  if (!reflection) return sendMessage(teacher.id, teacher.phone_number, 'Koi reflection prompt pending nahi hai.');

  switch (session.awaiting_input_for) {
    case AWAITING.INITIAL:
      if (text === '1') {
        const tip = await generateCoachingTip({
          challengeText: 'no challenge — plan went well',
          grades: teacher.grades_taught?.join(', '),
          subject: 'general',
          language: teacher.language_preference,
        });
        await reflectionRepository.recordResponse(reflection.id, { responseValue: '1' });
        await conversationRepository.setState(teacher.id, STATE.IDLE, { awaitingInputFor: null });
        return sendMessage(teacher.id, teacher.phone_number, `Bohat acha! 🌟 Aapki mehnat rang la rahi hai.\nKal ke liye ek tip: ${tip}`);
      }
      if (text === '2') {
        await conversationRepository.setState(teacher.id, STATE.REFLECTION_PROMPT_SENT, { awaitingInputFor: AWAITING.CHALLENGE_DETAIL });
        return sendMessage(teacher.id, teacher.phone_number, 'Koi baat nahi, challenges se seekhte hain.\nKya challenge aaya? Briefly batayein.');
      }
      if (text === '3') {
        await conversationRepository.setState(teacher.id, STATE.REFLECTION_PROMPT_SENT, { awaitingInputFor: AWAITING.INCOMPLETE_REASON });
        return sendMessage(teacher.id, teacher.phone_number, 'Theek hai. Kya wajah thi? (Likhna zaroori nahi)\nKal phir koshish karenge. 💪');
      }
      return sendMessage(teacher.id, teacher.phone_number, 'Maazrat, samajh nahi aaya. 1, 2, ya 3 likhein.');

    case AWAITING.CHALLENGE_DETAIL: {
      const category = await classifyChallenge(text);
      const tip = await generateCoachingTip({
        challengeText: text,
        grades: teacher.grades_taught?.join(', '),
        subject: 'general',
        language: teacher.language_preference,
      });
      await reflectionRepository.recordResponse(reflection.id, {
        responseValue: '2',
        challengeText: text,
        challengeCategory: category,
        coachingTipSent: tip,
      });
      await conversationRepository.setState(teacher.id, STATE.IDLE, { awaitingInputFor: null });
      return sendMessage(
        teacher.id,
        teacher.phone_number,
        `${tip}\nYeh aapka feedback save ho gaya. Kal ka plan is cheez ko dhyan mein rakh ke banaya jayega. 💡`
      );
    }

    case AWAITING.INCOMPLETE_REASON:
      await reflectionRepository.recordResponse(reflection.id, { responseValue: '3', challengeText: text || null });
      await conversationRepository.setState(teacher.id, STATE.IDLE, { awaitingInputFor: null });
      return sendMessage(teacher.id, teacher.phone_number, 'Shukriya batane ke liye. Kal phir koshish karenge. 💪');

    default:
      await conversationRepository.setState(teacher.id, STATE.IDLE, { awaitingInputFor: null });
      return sendMessage(teacher.id, teacher.phone_number, 'Theek hai.');
  }
}

export const reflectionHandler = { start, handle };
