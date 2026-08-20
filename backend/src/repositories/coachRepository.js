import { supabase } from '../config/supabaseClient.js';

// Hard Rule: "Never share a teacher's data with anyone outside their
// assigned coach." Every dashboard query should go through here (or through
// teacherRepository.findByCoach) rather than querying teachers/plans/etc.
// directly with an unscoped coach_id — this is the single place that
// enforces the scoping so it can't be accidentally bypassed.

export async function findByEmail(email) {
  const { data, error } = await supabase.from('coaches').select('*').eq('email', email).maybeSingle();
  if (error) throw error;
  return data;
}

export async function findById(id) {
  const { data, error } = await supabase.from('coaches').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

/**
 * Self-registration (routes/dashboard/coaches.js). email must be the
 * caller's own verified Supabase Auth email (req.authEmail from
 * middleware/auth.js's requireSupabaseSession) — never a client-supplied
 * value — so nobody can create a coach row under someone else's address.
 */
export async function create({ email, name, district }) {
  const { data, error } = await supabase
    .from('coaches')
    .insert({ email, name, district: district || null, role: 'coach', dashboard_access: true })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Throws if teacherId doesn't belong to coachId. Call this at the top of
 * any dashboard route that takes a teacherId param, before returning
 * anything about that teacher.
 */
export async function assertOwnsTeacher(coachId, teacherId) {
  const { data, error } = await supabase
    .from('teachers')
    .select('id')
    .eq('id', teacherId)
    .eq('coach_id', coachId)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    const err = new Error('Teacher not found for this coach');
    err.status = 404;
    throw err;
  }
}
