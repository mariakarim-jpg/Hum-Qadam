import { supabase } from '../config/supabaseClient.js';
import * as coachRepository from '../repositories/coachRepository.js';

/**
 * plan/06 NFR: "Coach dashboard requires authenticated login. No teacher can
 * view another teacher's data." Verifies the Supabase JWT the frontend
 * attaches as a Bearer token, then loads the matching coach row so every
 * downstream route can scope its queries with req.coach.id.
 */
export async function requireCoach(req, res, next) {
  try {
    const authHeader = req.headers.authorization ?? '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

    const { data: userData, error } = await supabase.auth.getUser(token);
    if (error || !userData?.user?.email) return res.status(401).json({ error: 'Invalid or expired session' });

    const coach = await coachRepository.findByEmail(userData.user.email);
    if (!coach || !coach.dashboard_access) return res.status(403).json({ error: 'No dashboard access for this account' });

    req.coach = coach;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Lighter than requireCoach: only proves "this is a real, signed-in Supabase
 * user," not "this user already has a coaches row." Used by the two
 * self-registration endpoints (GET /api/coaches/me, POST /api/coaches/register)
 * — a brand-new coach isn't in the coaches table yet, so requireCoach itself
 * would 403 them before they ever got a chance to register. Attaches the
 * verified email as req.authEmail so a caller can never register a coach
 * row under an email they don't actually control.
 */
export async function requireSupabaseSession(req, res, next) {
  try {
    const authHeader = req.headers.authorization ?? '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

    const { data: userData, error } = await supabase.auth.getUser(token);
    if (error || !userData?.user?.email) return res.status(401).json({ error: 'Invalid or expired session' });

    req.authEmail = userData.user.email;
    next();
  } catch (err) {
    next(err);
  }
}
