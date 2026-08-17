import { Router } from 'express';
import { supabase } from '../../config/supabaseClient.js';
import * as teacherRepository from '../../repositories/teacherRepository.js';
import { computeCheckinRate } from '../../services/analyticsService.js';

export const analyticsRouter = Router();

// Page 4: Analytics. Aggregation is done in JS here for scaffold simplicity —
// at pilot scale (plan/06 NFR: 1,000 concurrent teachers) this should move
// to SQL views or a materialized aggregate table instead of pulling raw rows.

analyticsRouter.get('/planning-by-subject', async (req, res, next) => {
  try {
    const teacherIds = await teacherIdsForCoach(req.coach.id);
    const { data, error } = await supabase.from('lesson_plans').select('subject').in('teacher_id', teacherIds);
    if (error) throw error;
    res.json({ counts: countBy(data, 'subject') });
  } catch (err) {
    next(err);
  }
});

analyticsRouter.get('/challenge-frequency', async (req, res, next) => {
  try {
    const teacherIds = await teacherIdsForCoach(req.coach.id);
    const { data, error } = await supabase
      .from('reflections')
      .select('challenge_category')
      .in('teacher_id', teacherIds)
      .not('challenge_category', 'is', null);
    if (error) throw error;
    res.json({ counts: countBy(data, 'challenge_category') });
  } catch (err) {
    next(err);
  }
});

analyticsRouter.get('/engagement-trend', async (req, res, next) => {
  try {
    const teachers = await teacherRepository.findByCoach(req.coach.id);
    const weeklyRates = await Promise.all(
      [...Array(8)].map(async (_, weekIndex) => {
        const rates = await Promise.all(teachers.map((t) => computeCheckinRate(t.id, 7 * (weekIndex + 1))));
        const valid = rates.filter((r) => r !== null);
        const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
        return { weeksAgo: 8 - weekIndex, checkinRate: avg };
      })
    );
    res.json({ trend: weeklyRates });
  } catch (err) {
    next(err);
  }
});

analyticsRouter.get('/school-comparison', async (req, res, next) => {
  try {
    const teachers = await teacherRepository.findByCoach(req.coach.id);
    const bySchool = new Map();
    for (const t of teachers) {
      const rate = await computeCheckinRate(t.id);
      const entry = bySchool.get(t.school_name) ?? { school: t.school_name, rates: [] };
      if (rate !== null) entry.rates.push(rate);
      bySchool.set(t.school_name, entry);
    }
    res.json({
      schools: [...bySchool.values()].map((e) => ({
        school: e.school,
        avgCompletionRate: e.rates.length ? Math.round(e.rates.reduce((a, b) => a + b, 0) / e.rates.length) : null,
      })),
    });
  } catch (err) {
    next(err);
  }
});

async function teacherIdsForCoach(coachId) {
  const teachers = await teacherRepository.findByCoach(coachId);
  return teachers.map((t) => t.id);
}

function countBy(rows, field) {
  const counts = {};
  for (const row of rows) {
    const key = row[field] ?? 'unknown';
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}
