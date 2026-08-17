import { CONVERSATION_STATES as STATE, COMMANDS } from '../../config/constants.js';
import * as teacherRepository from '../../repositories/teacherRepository.js';
import * as conversationRepository from '../../repositories/conversationRepository.js';
import * as lessonPlanRepository from '../../repositories/lessonPlanRepository.js';
import { sendMessage } from '../../services/whatsappService.js';
import { planningHandler } from './planningHandler.js';

// FR-12 Help and Command Menu + FR-11 Vacation and Pause Mode.

/** Returns the matched command key, or null. Case-insensitive, per plan/08. */
export function matchCommand(messageBody) {
  const normalized = messageBody.trim().toLowerCase();
  for (const [command, phrases] of Object.entries(COMMANDS)) {
    if (phrases.some((phrase) => normalized === phrase.toLowerCase())) return command;
  }
  return null;
}

async function handle({ teacher, session, command }) {
  switch (command) {
    case 'PLAN':
      return planningHandler.start(teacher);

    case 'LAST_PLAN': {
      const last = await lessonPlanRepository.findLastForTeacher(teacher.id);
      if (!last) return sendMessage(teacher.id, teacher.phone_number, 'Abhi tak koi plan nahi bana. "Plan" likh kar shuru karein.');
      return sendMessage(teacher.id, teacher.phone_number, last.plan_content);
    }

    case 'PROFILE':
      return sendMessage(
        teacher.id,
        teacher.phone_number,
        `Naam: ${teacher.name}\nSchool: ${teacher.school_name}\nClasses: ${(teacher.grades_taught ?? []).join(', ')}\n` +
          `Subjects: ${(teacher.subjects_taught ?? []).join(', ')}\nZaban: ${teacher.language_preference}`
      );

    case 'UPDATE':
      // Simplification for the scaffold: restarts onboarding to re-collect
      // fields, rather than a targeted single-field editor.
      await conversationRepository.setState(teacher.id, 'onboarding_start');
      return sendMessage(teacher.id, teacher.phone_number, 'Profile update karte hain. Aapka naam kya hai?');

    case 'LANGUAGE_ENGLISH':
      await teacherRepository.update(teacher.id, { language_preference: 'english' });
      return sendMessage(teacher.id, teacher.phone_number, 'Language switched to English. ✅');

    case 'LANGUAGE_URDU':
      await teacherRepository.update(teacher.id, { language_preference: 'urdu' });
      return sendMessage(teacher.id, teacher.phone_number, 'Zaban Urdu mein set kar di gayi. ✅');

    case 'STOP':
      await teacherRepository.setVacationMode(teacher.id, true);
      await conversationRepository.setState(teacher.id, STATE.VACATION);
      return sendMessage(teacher.id, teacher.phone_number, 'Theek hai, aapko rozana messages nahi ayenge. Jab wapas shuru karna ho, "Start" likhein.');

    case 'START':
      await teacherRepository.setVacationMode(teacher.id, false);
      await conversationRepository.setState(teacher.id, STATE.IDLE);
      return sendMessage(teacher.id, teacher.phone_number, 'Khush aamdeed wapas! Kal se rozana message phir shuru ho jayega. 🌟');

    case 'HELP':
    default:
      return sendMessage(
        teacher.id,
        teacher.phone_number,
        'Yeh commands available hain:\n' +
          'Plan — naya lesson plan\nLast plan — pichla plan dobara\nProfile — apna profile dekhein\n' +
          'Update — profile update karein\nLanguage English / زبان اردو — zaban badlein\n' +
          'Stop — messages rok dein\nStart — messages phir shuru karein'
      );
  }
}

async function vacationReminder(teacher) {
  return sendMessage(teacher.id, teacher.phone_number, 'Aap abhi paused hain. Wapas shuru karne ke liye "Start" likhein.');
}

export const commandHandler = { handle, vacationReminder };
