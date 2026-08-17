import { supabase } from '../config/supabaseClient.js';

// FR-06: Lesson Plan History.

export async function create(plan) {
  const { data, error } = await supabase.from('lesson_plans').insert(plan).select().single();
  if (error) throw error;
  return data;
}

export async function findLastForTeacher(teacherId) {
  const { data, error } = await supabase
    .from('lesson_plans')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('generated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function findRecentForTeacher(teacherId, limit = 5) {
  const { data, error } = await supabase
    .from('lesson_plans')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('generated_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function markFinalized(id) {
  const { data, error } = await supabase
    .from('lesson_plans')
    .update({ teacher_finalized: true })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// FR-10 / dashboard analytics: how many school days in a window had a plan.
export async function countSince(teacherId, sinceIso) {
  const { count, error } = await supabase
    .from('lesson_plans')
    .select('*', { count: 'exact', head: true })
    .eq('teacher_id', teacherId)
    .gte('generated_at', sinceIso);
  if (error) throw error;
  return count ?? 0;
}
