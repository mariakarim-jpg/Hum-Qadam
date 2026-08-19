import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { webhookRouter } from './routes/webhook.js';
import { internalRouter } from './routes/internal.js';
import { teachersRouter } from './routes/dashboard/teachers.js';
import { analyticsRouter } from './routes/dashboard/analytics.js';
import { reportsRouter } from './routes/dashboard/reports.js';
import { requireCoach } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { startScheduler } from './jobs/scheduler.js';

const app = express();

// Wide-open cors() is fine for local dev but not for a deployed API serving
// real coach data — once FRONTEND_URL is set (the deployed dashboard's
// origin), only that origin is allowed. Falls back to allow-all if unset,
// so this doesn't break local dev or an early deploy before the frontend
// has a URL yet.
app.use(cors(env.frontendUrl ? { origin: env.frontendUrl } : {}));
app.use(express.json());
// Twilio posts form-encoded webhook bodies, not JSON.
app.use('/webhook', express.urlencoded({ extended: false }));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/webhook', webhookRouter);
app.use('/internal', internalRouter);

// Every dashboard route is coach-scoped — see middleware/auth.js and
// repositories/coachRepository.js for the "never share a teacher's data
// with anyone outside their assigned coach" Hard Rule enforcement.
app.use('/api/teachers', requireCoach, teachersRouter);
app.use('/api/analytics', requireCoach, analyticsRouter);
app.use('/api/reports', requireCoach, reportsRouter);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`[server] Hum Qadam backend listening on :${env.port}`);
  if (env.enableInternalCron) {
    startScheduler();
  } else {
    console.log('[scheduler] in-process cron disabled (ENABLE_INTERNAL_CRON is not "true") — relying on external triggers hitting /internal/jobs/*');
  }
});
