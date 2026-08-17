import { CONVERSATION_STATES, COMMANDS } from '../config/constants.js';
import * as teacherRepository from '../repositories/teacherRepository.js';
import * as conversationRepository from '../repositories/conversationRepository.js';
import { onboardingHandler } from './handlers/onboardingHandler.js';
import { planningHandler } from './handlers/planningHandler.js';
import { reflectionHandler } from './handlers/reflectionHandler.js';
import { commandHandler, matchCommand } from './handlers/commandHandler.js';

/**
 * plan/13 Inbound Message Handling. This is the single entry point the
 * webhook route calls for every incoming WhatsApp message.
 *
 * Hard Rule: "Always load the teacher's stored profile before generating
 * any plan. Never ask a teacher to repeat their context." — that's why this
 * function always starts by loading the teacher, not by asking anything.
 */
export async function routeInboundMessage({ phoneNumber, messageBody, messageId }) {
  let teacher = await teacherRepository.findByPhone(phoneNumber);

  if (!teacher) {
    teacher = await teacherRepository.create({ phone_number: phoneNumber });
    await conversationRepository.getOrCreate(teacher.id);
    return onboardingHandler.start(teacher);
  }

  const session = await conversationRepository.getOrCreate(teacher.id);
  const state = session.conversation_state;

  // Commands work from (almost) any state, per FR-12 / plan/08 Help and
  // Command Flow — checked before state-specific routing.
  const command = matchCommand(messageBody);
  if (command) {
    return commandHandler.handle({ teacher, session, command, messageBody });
  }

  if (state.startsWith('onboarding_')) {
    return onboardingHandler.handle({ teacher, session, messageBody });
  }
  if (state.startsWith('planning_')) {
    return planningHandler.handle({ teacher, session, messageBody });
  }
  if (state.startsWith('reflection_')) {
    return reflectionHandler.handle({ teacher, session, messageBody });
  }
  if (state === CONVERSATION_STATES.IDLE) {
    // plan/13: "state is 'idle' → IntentClassifier → route to correct
    // handler." Simplified for the scaffold: treat any free-form idle
    // message as the start of a planning request, since that's the
    // dominant intent per the product's own morning-message flow (a
    // teacher replying "2" starts planning; anything else in idle is most
    // likely also a planning request rather than small talk).
    return planningHandler.start(teacher);
  }
  if (state === CONVERSATION_STATES.VACATION) {
    // Teacher messaged while paused — FR-11 says only "Start" resumes
    // messages, but we still let them talk to us; matchCommand already
    // handles "Start" above, so anything else here is just acknowledged.
    return commandHandler.vacationReminder(teacher);
  }

  // Unknown state — fail safe to onboarding rather than silently drop the message.
  return onboardingHandler.start(teacher);
}
