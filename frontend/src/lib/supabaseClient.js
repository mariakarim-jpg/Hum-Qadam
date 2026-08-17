import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Loud but non-fatal — lets the dashboard shell render locally before
  // real Supabase credentials exist, per plan/19's pilot timeline.
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set — auth will not work yet.');
}

// Same placeholder-fallback reasoning as backend/src/config/supabaseClient.js
// — don't let a missing .env crash the whole app before it can even render.
export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-key');
