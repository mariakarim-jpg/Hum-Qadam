import { supabase } from '../config/supabaseClient.js';
import { CONVERSATION_STATES } from '../config/constants.js';

// plan/08 Flow Architecture: "Every conversation state is stored in the
// database." One row per teacher (unique constraint on teacher_id).

export async function getOrCreate(teacherId) {
  const { data: existing, error: findError } = await supabase
    .from('conversation_sessions')
    .select('*')
    .eq('teacher_id', teacherId)
    .maybeSingle();
  if (findError) throw findError;
  if (existing) return existing;

  const { data, error } = await supabase
    .from('conversation_sessions')
    .insert({
      teacher_id: teacherId,
      conversation_state: CONVERSATION_STATES.NEW,
      session_start: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function setState(teacherId, state, { awaitingInputFor = null, sessionData } = {}) {
  const patch = {
    conversation_state: state,
    awaiting_input_for: awaitingInputFor,
    updated_at: new Date().toISOString(),
  };
  if (sessionData !== undefined) patch.session_data = sessionData;

  const { data, error } = await supabase
    .from('conversation_sessions')
    .update(patch)
    .eq('teacher_id', teacherId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function mergeSessionData(teacherId, partialData) {
  const session = await getOrCreate(teacherId);
  const merged = { ...(session.session_data ?? {}), ...partialData };
  return setState(teacherId, session.conversation_state, {
    awaitingInputFor: session.awaiting_input_for,
    sessionData: merged,
  });
}
