import { isSchoolDay } from '../services/schoolDayService.js';
import * as teacherRepository from '../repositories/teacherRepository.js';
import * as checkinRepository from '../repositories/checkinRepository.js';
import { sendMessage } from '../services/whatsappService.js';

// plan/13 "Outbound Message Scheduling" — cron at 4:50am PKT, school days only.
// FR-02: personalized morning message, binary readiness prompt.

const MAX_RETRIES = 3;

export async function runMorningCheckin() {
  const today = new Date();
  if (!(await isSchoolDay(today))) {
    console.log('[morning-checkin] skipped — non-school day');
    return { sent: 0, skipped: true };
  }

  const teachers = await teacherRepository.findActiveForMorningCheckin();
  const todayIso = today.toISOString().slice(0, 10);
  let sent = 0;
  let failed = 0;

  for (const teacher of teachers) {
    const text =
      `Assalamu Alaikum ${teacher.name}! 🌅\n` +
      'Aaj ka din mubarak ho.\nAaj ke lesson plans ready hain?\n' +
      '1 - Haan, ready hain ✅\n2 - Abhi nahi bani ❌';

    try {
      await sendWithRetry(teacher, text);
      await checkinRepository.createForToday(teacher.id, todayIso);
      sent += 1;
    } catch (err) {
      console.error(`[morning-checkin] failed for teacher ${teacher.id} after ${MAX_RETRIES} attempts:`, err);
      failed += 1;
    }
  }

  console.log(`[morning-checkin] sent to ${sent} teachers, ${failed} failed`);
  return { sent, failed, skipped: false };
}

async function sendWithRetry(teacher, text) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await sendMessage(teacher.id, teacher.phone_number, text);
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) await new Promise((r) => setTimeout(r, 30_000 * attempt));
    }
  }
  throw lastError;
}
