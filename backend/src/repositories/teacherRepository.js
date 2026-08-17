import { supabase } from '../config/supabaseClient.js';

// FR-01: Teacher Profile Management. Every AI interaction loads the profile
// by phone number so a teacher never has to repeat their context.

export async function findByPhone(phoneNumber) {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('phone_number', phoneNumber)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function findById(id) {
  const { data, error } = await supabase.from('teachers').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function create(teacher) {
  const { data, error } = await supabase.from('teachers').insert(teacher).select().single();
  if (error) throw error;
  return data;
}

export async function update(id, patch) {
  const { data, error } = await supabase
    .from('teachers')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// FR-11: Vacation/pause mode. Also used by "Stop"/"Start" commands.
export async function setVacationMode(id, vacationMode) {
  return update(id, { vacation_mode: vacationMode });
}

// Used by the morning-checkin job: active, not on vacation, all of them.
export async function findActiveForMorningCheckin() {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('active', true)
    .eq('vacation_mode', false)
    .eq('onboarding_complete', true);
  if (error) throw error;
  return data;
}

// FR-07: Coach dashboard — teacher list, scoped to one coach.
export async function findByCoach(coachId) {
  const { data, error } = await supabase.from('teachers').select('*').eq('coach_id', coachId);
  if (error) throw error;
  return data;
}
