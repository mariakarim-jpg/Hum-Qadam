import { Router } from 'express';
import { env } from '../config/env.js';
import { runMorningCheckin } from '../jobs/morningCheckin.js';
import { runEveningReflection } from '../jobs/eveningReflection.js';

export const internalRouter = Router();

/**
 * On a free host that spins down after 15 minutes idle (e.g. Render's free
 * Web Service tier), in-process node-cron is useless — if nothing hit the
 * app between checkins, it's asleep at 4:50am and the timer never fires.
 * These endpoints let an external, always-on scheduler (see
 * .github/workflows/) trigger the same jobs via HTTP instead. The incoming
 * request itself wakes the service if it was asleep.
 *
 * Protected by a shared secret rather than left open, since these can send
 * real WhatsApp messages to every active teacher.
 */
function requireJobSecret(req, res, next) {
  const provided = req.headers['x-job-secret'];
  if (!env.jobTriggerSecret) {
    return res.status(500).json({ error: 'JOB_TRIGGER_SECRET is not configured on this deployment' });
  }
  if (provided !== env.jobTriggerSecret) {
    return res.status(401).json({ error: 'Invalid or missing X-Job-Secret header' });
  }
  next();
}

internalRouter.post('/jobs/morning-checkin', requireJobSecret, async (req, res, next) => {
  try {
    const result = await runMorningCheckin();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

internalRouter.post('/jobs/evening-reflection', requireJobSecret, async (req, res, next) => {
  try {
    const result = await runEveningReflection();
    res.json(result);
  } catch (err) {
    next(err);
  }
});
