import { supabase } from '../config/supabaseClient.js';

// Backs plan/13's isSchoolDay() logic and CLAUDE.md's Hard Rule:
// "Never send a message on weekends or public holidays."

export async function isHoliday(dateIso, province = 'all') {
  const { data, error } = await supabase
    .from('public_holidays')
    .select('id')
    .eq('holiday_date', dateIso)
    .or(`province.eq.${province},province.eq.all`)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function listUpcoming(fromIso, province = 'all') {
  const { data, error } = await supabase
    .from('public_holidays')
    .select('*')
    .gte('holiday_date', fromIso)
    .or(`province.eq.${province},province.eq.all`)
    .order('holiday_date', { ascending: true });
  if (error) throw error;
  return data;
}
