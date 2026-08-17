import { supabase } from '../config/supabaseClient.js';

// FR-05: End-of-Day Reflection.

export async function createPromptSent(teacherId, reflectionDate, lessonPlanId) {
  const { data, error } = await supabase
    .from('reflections')
    .insert({
      teacher_id: teacherId,
      reflection_date: reflectionDate,
      lesson_plan_id: lessonPlanId ?? null,
      prompt_sent_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function findForTeacherAndDate(teacherId, reflectionDate) {
  const { data, error } = await supabase
    .from('reflections')
    .select('*')
    .eq('teacher_id', teacherId)
    .eq('reflection_date', reflectionDate)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function recordResponse(id, { responseValue, challengeText, challengeCategory, coachingTipSent }) {
  const { data, error } = await supabase
    .from('reflections')
    .update({
      response_value: responseValue,
      challenge_text: challengeText ?? null,
      challenge_category: challengeCategory ?? null,
      coaching_tip_sent: coachingTipSent ?? null,
      responded_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function findRecentForTeacher(teacherId, limit = 10) {
  const { data, error } = await supabase
    .from('reflections')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('reflection_date', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

// FR-10: challenges reported 3+ times in a week.
export async function countChallengesSince(teacherId, sinceIso) {
  const { count, error } = await supabase
    .from('reflections')
    .select('*', { count: 'exact', head: true })
    .eq('teacher_id', teacherId)
    .eq('response_value', '2')
    .gte('reflection_date', sinceIso);
  if (error) throw error;
  return count ?? 0;
}
