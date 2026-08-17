import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validatePlan, buildCorrectionInstruction } from '../src/services/planValidationService.js';

const VALID_PLAN = `
🌟 OPENER (5 min)
Ask a shared question.

📚 GRADE 3 — Independent Work (15 min)
Textbook page 45, exercises 1-6.

👩‍🏫 TEACHER WITH GRADE 5 (15 min)
Direct instruction on fractions.

🔄 TEACHER MOVEMENT
After 15 min, check Grade 3, then move to Grade 5. Switch roles.

🤝 PEER LEARNING (5 min)
Grade 5 students help Grade 3 with one question each.

🎯 CLOSING (5 min)
Everyone stands, answers a shared question together.
`.repeat(3); // pad toward the 400-600 word target

test('valid plan with all six markers and no banned words passes', () => {
  const result = validatePlan(VALID_PLAN, []);
  assert.equal(result.valid, true);
});

test('missing a required component fails', () => {
  const withoutClosing = VALID_PLAN.replace(/🎯 CLOSING[\s\S]*/g, '');
  const result = validatePlan(withoutClosing, []);
  assert.equal(result.valid, false);
  assert.ok(result.failures.some((f) => f.includes('shared_closing')));
});

test('mentioning a worksheet when the teacher has no printer fails', () => {
  const withWorksheet = VALID_PLAN.replace('exercises 1-6.', 'exercises 1-6 on the worksheet.');
  const result = validatePlan(withWorksheet, ['no_printer']);
  assert.equal(result.valid, false);
  assert.ok(result.failures.some((f) => f.includes('worksheet')));
});

test('a worksheet mention is fine if the teacher has no such constraint', () => {
  const withWorksheet = VALID_PLAN.replace('exercises 1-6.', 'exercises 1-6 on the worksheet.');
  const result = validatePlan(withWorksheet, []);
  assert.equal(result.valid, true);
});

test('buildCorrectionInstruction lists every failure', () => {
  const instruction = buildCorrectionInstruction(['missing X', 'missing Y']);
  assert.match(instruction, /missing X/);
  assert.match(instruction, /missing Y/);
});
