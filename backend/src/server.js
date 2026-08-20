import { createApp } from './app.js';
import { env } from './config/env.js';
import { startScheduler } from './jobs/scheduler.js';

// Entry point for a persistent process (local dev, Railway, Render) — NOT
// used on Vercel, which invokes api/index.js per-request instead. See
// app.js for why the actual app-building logic lives there, not here.
const app = createApp();

app.listen(env.port, () => {
  console.log(`[server] Hum Qadam backend listening on :${env.port}`);
  if (env.enableInternalCron) {
    startScheduler();
  } else {
    console.log('[scheduler] in-process cron disabled (ENABLE_INTERNAL_CRON is not "true") — relying on external triggers hitting /internal/jobs/*');
  }
});
