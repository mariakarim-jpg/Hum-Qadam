import { supabase } from '../config/supabaseClient.js';

// FR-02: Automated Morning Check-In.

export async function createForToday(teacherId, checkinDate) {
  const { data, error } = await supabase
    .from('daily_checkins')
    .insert({ teacher_id: teacherId, checkin_date: checkinDate, message_sent_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function findForTeacherAndDate(teacherId, checkinDate) {
  const { data, error } = await supabase
    .from('daily_checkins')
    .select('*')
    .eq('teacher_id', teacherId)
    .eq('checkin_date', checkinDate)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function recordResponse(id, responseValue) {
  const { data, error } = await supabase
    .from('daily_checkins')
    .update({ teacher_responded: true, response_value: responseValue, responded_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function markPlanGenerated(id, planId) {
  const { data, error } = await supabase
    .from('daily_checkins')
    .update({ plan_generated: true, plan_id: planId })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// FR-10: consecutive missed check-ins, for coaching alerts.
export async function findRecentForTeacher(teacherId, limit = 10) {
  const { data, error } = await supabase
    .from('daily_checkins')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('checkin_date', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function countConsecutiveMisses(teacherId) {
  const recent = await findRecentForTeacher(teacherId, 10);
  let streak = 0;
  for (const row of recent) {
    if (row.teacher_responded) break;
    streak += 1;
  }
  return streak;
}
