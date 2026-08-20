import { Router } from 'express';
import * as coachRepository from '../../repositories/coachRepository.js';

export const coachesRouter = Router();

// Frontend calls this right after a successful Supabase sign-in to decide
// whether to show the dashboard or the one-time registration form.
coachesRouter.get('/me', async (req, res, next) => {
  try {
    const coach = await coachRepository.findByEmail(req.authEmail);
    res.json({ isCoach: Boolean(coach && coach.dashboard_access), coach: coach ?? null });
  } catch (err) {
    next(err);
  }
});

// Self-registration. Idempotent: if this email is already a coach, returns
// the existing row instead of erroring, so re-submitting (e.g. a page
// refresh mid-registration) can't create duplicates.
coachesRouter.post('/register', async (req, res, next) => {
  try {
    const existing = await coachRepository.findByEmail(req.authEmail);
    if (existing) return res.json({ coach: existing, created: false });

    const { name, district } = req.body ?? {};
    if (!name?.trim()) return res.status(400).json({ error: 'name is required' });

    const coach = await coachRepository.create({ email: req.authEmail, name: name.trim(), district: district?.trim() });
    res.status(201).json({ coach, created: true });
  } catch (err) {
    next(err);
  }
});
