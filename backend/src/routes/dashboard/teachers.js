import { Router } from 'express';
import * as teacherRepository from '../../repositories/teacherRepository.js';
import * as coachRepository from '../../repositories/coachRepository.js';
import * as lessonPlanRepository from '../../repositories/lessonPlanRepository.js';
import * as reflectionRepository from '../../repositories/reflectionRepository.js';
import * as checkinRepository from '../../repositories/checkinRepository.js';
import { computeAlertsForTeacher, statusFromAlerts, computeCheckinRate } from '../../services/analyticsService.js';
import { generateCoachingBrief } from '../../services/aiService.js';
import { sendMessage } from '../../services/whatsappService.js';

export const teachersRouter = Router();

// Page 1: Overview (Home).
teachersRouter.get('/overview', async (req, res, next) => {
  try {
    const teachers = await teacherRepository.findByCoach(req.coach.id);
    const alertsByTeacher = await Promise.all(teachers.map((t) => computeAlertsForTeacher(t)));

    const flagged = teachers
      .map((t, i) => ({ teacher: t, alerts: alertsByTeacher[i] }))
      .filter((row) => row.alerts.length > 0);

    res.json({
      coachName: req.coach.name,
      metrics: {
        teachersActiveToday: teachers.filter((t) => t.active && !t.vacation_mode).length,
        totalTeachers: teachers.length,
        teachersFlaggedForSupport: flagged.length,
      },
      alerts: flagged.map(({ teacher, alerts }) => ({
        teacherId: teacher.id,
        name: teacher.name,
        school: teacher.school_name,
        reasons: alerts.map((a) => a.reason),
      })),
    });
  } catch (err) {
    next(err);
  }
});

// Page 2: Teacher List.
teachersRouter.get('/', async (req, res, next) => {
  try {
    const teachers = await teacherRepository.findByCoach(req.coach.id);
    const rows = await Promise.all(
      teachers.map(async (t) => {
        const [alerts, checkinRate, recentPlans] = await Promise.all([
          computeAlertsForTeacher(t),
          computeCheckinRate(t.id),
          lessonPlanRepository.findRecentForTeacher(t.id, 30),
        ]);
        return {
          id: t.id,
          name: t.name,
          school: t.school_name,
          grades: t.grades_taught,
          plansLast30d: recentPlans.length,
          checkinRate,
          status: statusFromAlerts(alerts),
        };
      })
    );
    res.json({ teachers: rows });
  } catch (err) {
    next(err);
  }
});

// Page 3: Teacher Detail.
teachersRouter.get('/:id', async (req, res, next) => {
  try {
    await coachRepository.assertOwnsTeacher(req.coach.id, req.params.id);
    const teacher = await teacherRepository.findById(req.params.id);

    const [plans, reflections, checkins] = await Promise.all([
      lessonPlanRepository.findRecentForTeacher(teacher.id, 20),
      reflectionRepository.findRecentForTeacher(teacher.id, 14),
      checkinRepository.findRecentForTeacher(teacher.id, 14),
    ]);

    res.json({
      teacher,
      lessonPlans: plans.map((p) => ({ id: p.id, date: p.generated_at, subject: p.subject, grades: p.grades })),
      challengeLog: reflections.filter((r) => r.challenge_text).map((r) => ({
        date: r.reflection_date,
        category: r.challenge_category,
        text: r.challenge_text,
      })),
      activityTimeline: buildTimeline(checkins, reflections),
    });
  } catch (err) {
    next(err);
  }
});

// AI coaching brief for the Teacher Detail page, per plan/09.
teachersRouter.get('/:id/coaching-brief', async (req, res, next) => {
  try {
    await coachRepository.assertOwnsTeacher(req.coach.id, req.params.id);
    const teacher = await teacherRepository.findById(req.params.id);
    const [plans, reflections] = await Promise.all([
      lessonPlanRepository.findRecentForTeacher(teacher.id, 5),
      reflectionRepository.findRecentForTeacher(teacher.id, 10),
    ]);
    const checkinRate = await computeCheckinRate(teacher.id);

    const brief = await generateCoachingBrief({
      teacherName: teacher.name,
      planSummaries: plans.map((p) => `${p.subject} (${p.generated_at})`).join('; ') || 'none yet',
      reflectionData: reflections.map((r) => r.response_value).join(', ') || 'none yet',
      challengeList: reflections.filter((r) => r.challenge_text).map((r) => r.challenge_text).join('; ') || 'none reported',
      completionRate: checkinRate ?? 0,
      skippedSubjects: 'not yet computed', // TODO: needs subject-vs-plan diff, see plan/15
    });
    res.json({ brief });
  } catch (err) {
    next(err);
  }
});

// Teacher Detail "Send message" box.
teachersRouter.post('/:id/message', async (req, res, next) => {
  try {
    await coachRepository.assertOwnsTeacher(req.coach.id, req.params.id);
    const teacher = await teacherRepository.findById(req.params.id);
    const { message } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'message is required' });
    await sendMessage(teacher.id, teacher.phone_number, message);
    res.status(202).json({ sent: true });
  } catch (err) {
    next(err);
  }
});

function buildTimeline(checkins, reflections) {
  const byDate = new Map();
  for (const c of checkins) {
    byDate.set(c.checkin_date, { date: c.checkin_date, checkinSent: true, checkinResponded: c.teacher_responded });
  }
  for (const r of reflections) {
    const existing = byDate.get(r.reflection_date) ?? { date: r.reflection_date };
    existing.reflectionResponded = Boolean(r.responded_at);
    existing.challengeReported = Boolean(r.challenge_text);
    byDate.set(r.reflection_date, existing);
  }
  return [...byDate.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
}
