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
