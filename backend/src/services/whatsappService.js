import twilio from 'twilio';
import { env } from '../config/env.js';
import { MAX_MESSAGE_CHARS_BEFORE_SPLIT } from '../config/constants.js';
import * as messageRepository from '../repositories/messageRepository.js';

const client = twilio(env.twilioAccountSid, env.twilioAuthToken);

/**
 * CLAUDE.md §4: "Keep every WhatsApp message under 160 words. If a plan
 * exceeds 1,000 characters, split it into two messages." Lesson plans are
 * the message type this applies to (short conversational replies are kept
 * under the word limit at the prompt level — see the whatsapp-message-formatter
 * skill in .claude/skills/ for the same rule applied by a human/AI drafting
 * a message by hand).
 *
 * Splits on a paragraph boundary near the midpoint rather than mid-sentence.
 */
export function splitForWhatsApp(text) {
  if (text.length <= MAX_MESSAGE_CHARS_BEFORE_SPLIT) return [text];

  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = '';

  for (const para of paragraphs) {
    const candidate = current ? `${current}\n\n${para}` : para;
    if (candidate.length > MAX_MESSAGE_CHARS_BEFORE_SPLIT && current) {
      chunks.push(current);
      current = para;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/**
 * Sends one logical message, splitting into multiple WhatsApp messages if
 * needed, and logging every part to whatsapp_messages (audit trail per
 * plan/06 non-functional requirements).
 */
export async function sendMessage(teacherId, toPhoneNumber, text) {
  const parts = splitForWhatsApp(text);
  const sent = [];

  for (const part of parts) {
    const result = await client.messages.create({
      from: env.twilioWhatsappFrom,
      to: `whatsapp:${toPhoneNumber}`,
      body: part,
    });
    await messageRepository.logOutbound({ teacherId, messageId: result.sid, content: part, status: result.status });
    sent.push(result);
  }

  return sent;
}

export async function recordInbound({ teacherId, messageId, content }) {
  return messageRepository.logInbound({ teacherId, messageId, content });
}
