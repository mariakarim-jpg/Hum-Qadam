import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Service-role client for backend use only (bypasses RLS intentionally —
// the backend enforces its own access rules, e.g. coach-scoped queries in
// repositories/coachRepository.js). Never expose this key to the frontend;
// the dashboard uses supabaseAnonKey + a logged-in coach's session instead.
//
// createClient() throws hard on an empty URL, which would crash the whole
// server at import time before .env is ever filled in — falling back to a
// placeholder keeps `npm run dev` and `/health` usable while real Supabase
// credentials are still pending. Any actual query still fails loudly (the
// placeholder host doesn't resolve), it just fails at call time, not boot time.
export const supabase = createClient(env.supabaseUrl || 'https://placeholder.supabase.co', env.supabaseServiceRoleKey || 'placeholder-key', {
  auth: { persistSession: false },
});
