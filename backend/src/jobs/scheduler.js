import cron from 'node-cron';
import { env } from '../config/env.js';
import { runMorningCheckin } from './morningCheckin.js';
import { runEveningReflection } from './eveningReflection.js';

/**
 * plan/13 cron schedule: 4:50am morning check-in, 1:55pm evening reflection,
 * both Pakistan-Standard-Time school days. node-cron runs in the process's
 * local timezone — the `timezone` option pins it to Asia/Karachi regardless
 * of where the server itself is hosted (plan/16: Railway, region-flexible).
 */
export function startScheduler() {
  cron.schedule(env.morningCheckinCron, () => runMorningCheckin().catch((e) => console.error('[scheduler]', e)), {
    timezone: env.timezone,
  });
  cron.schedule(env.eveningReflectionCron, () => runEveningReflection().catch((e) => console.error('[scheduler]', e)), {
    timezone: env.timezone,
  });
  console.log(
    `[scheduler] armed — morning check-in "${env.morningCheckinCron}", evening reflection "${env.eveningReflectionCron}" (${env.timezone})`
  );
}
