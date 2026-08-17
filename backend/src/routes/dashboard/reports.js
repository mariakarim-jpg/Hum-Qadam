import { Router } from 'express';
import * as teacherRepository from '../../repositories/teacherRepository.js';
import { computeCheckinRate } from '../../services/analyticsService.js';
import { generateWeeklySummary } from '../../services/aiService.js';

export const reportsRouter = Router();

/**
 * Page 5: Reports — "Weekly Planning Report". Returns JSON; PDF/CSV export
 * (plan/14: "Export formats: PDF, CSV") is not implemented in this scaffold —
 * wire a library like pdfkit or json2csv on top of this same data shape.
 */
reportsRouter.get('/weekly-summary', async (req, res, next) => {
  try {
    const teachers = await teacherRepository.findByCoach(req.coach.id);
    const rates = await Promise.all(teachers.map((t) => computeCheckinRate(t.id, 7)));
    const validRates = rates.filter((r) => r !== null);
    const checkinRate = validRates.length ? Math.round(validRates.reduce((a, b) => a + b, 0) / validRates.length) : 0;

    const summaryText = await generateWeeklySummary({
      weekDates: `${sevenDaysAgoLabel()} - ${new Date().toISOString().slice(0, 10)}`,
      totalTeachers: teachers.length,
      checkinRate,
      planningRate: 'not yet computed', // TODO: needs school-day-aware denominator, see plan/15
      topSubjects: 'not yet computed',
      skippedSubjects: 'not yet computed',
      challengeCategories: 'not yet computed',
      flaggedCount: 'see /api/teachers/overview',
      lowSchools: 'see /api/analytics/school-comparison',
    });

    res.json({ summary: summaryText, generatedAt: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

function sevenDaysAgoLabel() {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
