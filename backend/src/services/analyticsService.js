import { ALERT_THRESHOLDS } from '../config/constants.js';
import * as checkinRepository from '../repositories/checkinRepository.js';
import * as lessonPlanRepository from '../repositories/lessonPlanRepository.js';
import * as reflectionRepository from '../repositories/reflectionRepository.js';

const DAY_MS = 24 * 60 * 60 * 1000;

/** FR-10 Coaching Alerts — computed per teacher, used by both the Overview alert panel and Teacher List status column. */
export async function computeAlertsForTeacher(teacher) {
  const alerts = [];
  const fiveDaysAgo = new Date(Date.now() - 5 * DAY_MS).toISOString();
  const sevenDaysAgo = new Date(Date.now() - 7 * DAY_MS).toISOString();

  const [consecutiveMisses, recentPlanCount, weeklyChallenges] = await Promise.all([
    checkinRepository.countConsecutiveMisses(teacher.id),
    lessonPlanRepository.countSince(teacher.id, fiveDaysAgo),
    reflectionRepository.countChallengesSince(teacher.id, sevenDaysAgo),
  ]);

  if (consecutiveMisses >= ALERT_THRESHOLDS.MISSED_CHECKINS) {
    alerts.push({ reason: `Missed ${consecutiveMisses}+ check-ins`, severity: 'red' });
  }
  if (recentPlanCount === 0) {
    alerts.push({ reason: `No plan in ${ALERT_THRESHOLDS.NO_PLAN_SCHOOL_DAYS}+ school days`, severity: 'amber' });
  }
  if (weeklyChallenges >= ALERT_THRESHOLDS.CHALLENGES_PER_WEEK) {
    alerts.push({ reason: `Challenge reported ${weeklyChallenges}x this week`, severity: 'red' });
  }

  return alerts;
}

/** Page 2 (Teacher List) status column: On Track / Needs Attention / Flagged. */
export function statusFromAlerts(alerts) {
  if (alerts.some((a) => a.severity === 'red')) return 'flagged';
  if (alerts.length > 0) return 'needs_attention';
  return 'on_track';
}

export async function computeCheckinRate(teacherId, days = 30) {
  const since = new Date(Date.now() - days * DAY_MS).toISOString().slice(0, 10);
  const recent = await checkinRepository.findRecentForTeacher(teacherId, days);
  const inWindow = recent.filter((r) => r.checkin_date >= since);
  if (inWindow.length === 0) return null;
  const responded = inWindow.filter((r) => r.teacher_responded).length;
  return Math.round((responded / inWindow.length) * 100);
}
