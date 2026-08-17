import { CONVERSATION_STATES as STATE } from '../../config/constants.js';
import * as teacherRepository from '../../repositories/teacherRepository.js';
import * as conversationRepository from '../../repositories/conversationRepository.js';
import { sendMessage } from '../../services/whatsappService.js';

// plan/08 "Complete Onboarding Flow" — under 5 minutes, per FR-09.

async function reply(teacher, text, nextState, extra = {}) {
  await conversationRepository.setState(teacher.id, nextState, extra);
  return sendMessage(teacher.id, teacher.phone_number, text);
}

async function start(teacher) {
  return reply(
    teacher,
    'Assalamu Alaikum! 👋 Main aapka multigrade teaching assistant hoon.\n' +
      'Rozana subah aapko lesson planning mein madad karunga.\n' +
      'Pehle aapka profile banate hain — sirf 2 minute lagenge.\n' +
      'Aapka naam kya hai?',
    STATE.ONBOARDING_START
  );
}

async function handle({ teacher, session, messageBody }) {
  const text = messageBody.trim();
  const data = session.session_data ?? {};

  switch (session.conversation_state) {
    case STATE.ONBOARDING_START:
      await conversationRepository.mergeSessionData(teacher.id, { name: text });
      return reply(teacher, `Shukriya ${text}! Aapka school ka naam?`, STATE.ONBOARDING_NAME_RECEIVED);

    case STATE.ONBOARDING_NAME_RECEIVED:
      await conversationRepository.mergeSessionData(teacher.id, { school_name: text });
      return reply(
        teacher,
        "Aap ek saath kaun si classes padhate hain? Misal ke taur par: 'Grade 3 aur 5'",
        STATE.ONBOARDING_SCHOOL_RECEIVED
      );

    case STATE.ONBOARDING_SCHOOL_RECEIVED:
      await conversationRepository.mergeSessionData(teacher.id, { grades_taught: parseGrades(text) });
      return reply(teacher, 'Aap kaun se subjects padhate hain? Sab likh dein.', STATE.ONBOARDING_GRADES_RECEIVED);

    case STATE.ONBOARDING_GRADES_RECEIVED:
      await conversationRepository.mergeSessionData(teacher.id, { subjects_taught: parseList(text) });
      return reply(
        teacher,
        'Konsi textbook series use karte hain?\n1 - Punjab Textbook Board\n2 - KPK Textbook Board\n' +
          '3 - Sindh Textbook Board\n4 - Federal Textbook Board\n5 - Other',
        STATE.ONBOARDING_SUBJECTS_RECEIVED
      );

    case STATE.ONBOARDING_SUBJECTS_RECEIVED:
      await conversationRepository.mergeSessionData(teacher.id, { textbook_series: mapTextbookChoice(text) });
      return reply(teacher, 'Aap kaunsi zaban mein baat karna chahenge?\n1 - Urdu\n2 - English', STATE.ONBOARDING_TEXTBOOKS_RECEIVED);

    case STATE.ONBOARDING_TEXTBOOKS_RECEIVED:
      await conversationRepository.mergeSessionData(teacher.id, { language_preference: text.trim() === '2' ? 'english' : 'urdu' });
      return reply(
        teacher,
        'Koi resource constraints hain? Jo bhi lagu ho, number send karein:\n' +
          '1 - Worksheets nahi hain\n2 - Printer nahi hai\n3 - Sirf blackboard hai\n' +
          '4 - Mixed-age students hain\n5 - Koi constraint nahi',
        STATE.ONBOARDING_LANGUAGE_RECEIVED
      );

    case STATE.ONBOARDING_LANGUAGE_RECEIVED: {
      const constraints = mapConstraintChoices(text);
      await conversationRepository.mergeSessionData(teacher.id, { resource_constraints: constraints });
      const merged = { ...data, resource_constraints: constraints };
      return reply(
        teacher,
        `Shukriya! Yeh hai aapka profile:\n` +
          `Naam: ${merged.name}\nSchool: ${merged.school_name}\nClasses: ${(merged.grades_taught ?? []).join(', ')}\n` +
          `Subjects: ${(merged.subjects_taught ?? []).join(', ')}\nTextbook: ${merged.textbook_series}\n` +
          `Zaban: ${merged.language_preference}\nConstraints: ${constraints.join(', ') || 'none'}\n\n` +
          `Kya sab theek hai?\n1 - Haan, sahi hai ✅\n2 - Kuch change karna hai ✏️`,
        STATE.ONBOARDING_CONSTRAINTS_RECEIVED
      );
    }

    case STATE.ONBOARDING_CONSTRAINTS_RECEIVED:
      if (text.trim() === '2') {
        // Simplification for the scaffold: restart from name rather than a
        // full field-picker. A real build should let them pick which field.
        return reply(teacher, 'Theek hai, dobara shuru karte hain. Aapka naam kya hai?', STATE.ONBOARDING_START);
      }
      await teacherRepository.update(teacher.id, { ...data, onboarding_complete: true });
      return reply(
        teacher,
        `Mubarak ho ${data.name}! Aapka profile save ho gaya. ✅\n` +
          'Kal subah se aapko rozana message ayega.\nJab bhi madad chahiye, "Help" likhein. Allah Hafiz!',
        STATE.IDLE
      );

    default:
      return start(teacher);
  }
}

function parseGrades(text) {
  const matches = text.match(/\d+/g);
  return matches ? [...new Set(matches)] : [text.trim()];
}

function parseList(text) {
  return text
    .split(/[,،]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function mapTextbookChoice(text) {
  const options = {
    1: 'Punjab Textbook Board',
    2: 'KPK Textbook Board',
    3: 'Sindh Textbook Board',
    4: 'Federal Textbook Board',
  };
  return options[text.trim()] ?? text.trim();
}

function mapConstraintChoices(text) {
  const options = {
    1: 'no_worksheets',
    2: 'no_printer',
    3: 'blackboard_only',
    4: 'mixed_age',
  };
  if (text.trim() === '5') return [];
  return text
    .split(/[,\s]+/)
    .map((choice) => options[choice.trim()])
    .filter(Boolean);
}

export const onboardingHandler = { start, handle };
