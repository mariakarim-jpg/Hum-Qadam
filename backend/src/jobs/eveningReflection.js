import { supabase } from '../config/supabaseClient.js';
import { isSchoolDay } from '../services/schoolDayService.js';
import * as teacherRepository from '../repositories/teacherRepository.js';
import { reflectionHandler } from '../conversation/handlers/reflectionHandler.js';

// plan/13 "Outbound Message Scheduling" — cron at 1:55pm PKT, school days only.
// FR-05: sent to teachers who received (and responded to) today's morning check-in.

export async function runEveningReflection() {
  const today = new Date();
  if (!(await isSchoolDay(today))) {
    console.log('[evening-reflection] skipped — non-school day');
    return { sent: 0, skipped: true };
  }

  const todayIso = today.toISOString().slice(0, 10);
  const { data: checkins, error } = await supabase
    .from('daily_checkins')
    .select('teacher_id, plan_id')
    .eq('checkin_date', todayIso)
    .eq('teacher_responded', true);
  if (error) throw error;

  let sent = 0;
  for (const checkin of checkins) {
    try {
      const teacher = await teacherRepository.findById(checkin.teacher_id);
      if (!teacher || teacher.vacation_mode) continue;
      await reflectionHandler.start(teacher, checkin.plan_id ?? null);
      sent += 1;
    } catch (err) {
      console.error(`[evening-reflection] failed for teacher ${checkin.teacher_id}:`, err);
    }
  }

  console.log(`[evening-reflection] sent to ${sent} teachers`);
  return { sent, skipped: false };
}
