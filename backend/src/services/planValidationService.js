import {
  PLAN_SECTION_MARKERS,
  BANNED_WORDS_BY_CONSTRAINT,
  ALWAYS_BANNED_WORDS,
  LESSON_PLAN_TARGET_WORDS,
} from '../config/constants.js';

/**
 * plan/12 Step 4 — Quality Validation. Checks:
 *   1. All 6 required components present (by emoji marker)
 *   2. No banned resource words for this teacher's stated constraints
 *   3. Word count within the 400-600 target (soft — flagged, not blocking)
 *
 * Returns { valid, failures[], wordCount } — never throws. The caller
 * (conversation/handlers/planningHandler.js) decides whether to retry
 * generation once with a corrective instruction, per plan/12.
 */
export function validatePlan(planText, resourceConstraints = []) {
  const failures = [];

  for (const [component, markers] of Object.entries(PLAN_SECTION_MARKERS)) {
    const present = markers.some((marker) => planText.includes(marker));
    if (!present) {
      failures.push(`Missing required component: ${component} (expected marker ${markers.join(' or ')})`);
    }
  }

  const bannedWords = new Set(ALWAYS_BANNED_WORDS);
  for (const constraint of resourceConstraints) {
    for (const word of BANNED_WORDS_BY_CONSTRAINT[constraint] ?? []) {
      bannedWords.add(word);
    }
  }
  const lowerText = planText.toLowerCase();
  for (const word of bannedWords) {
    if (lowerText.includes(word)) {
      failures.push(`Hard Rule violation: mentions "${word}", which this teacher's profile says they don't have`);
    }
  }

  const wordCount = planText.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < LESSON_PLAN_TARGET_WORDS.min || wordCount > LESSON_PLAN_TARGET_WORDS.max) {
    failures.push(
      `Word count ${wordCount} is outside the ${LESSON_PLAN_TARGET_WORDS.min}-${LESSON_PLAN_TARGET_WORDS.max} target (soft warning, not blocking)`
    );
  }

  // A word-count miss alone shouldn't block delivery; a missing component or
  // a banned-resource mention should. Split "hard" failures from soft ones.
  const hardFailures = failures.filter((f) => !f.startsWith('Word count'));

  return { valid: hardFailures.length === 0, failures, wordCount };
}

/**
 * Builds the corrective instruction appended to a retry prompt, per
 * plan/12: "If any check fails, a correction instruction is appended to the
 * prompt and generation is retried once."
 */
export function buildCorrectionInstruction(failures) {
  return `Your previous attempt had these problems — fix them and regenerate the full plan:\n${failures
    .map((f) => `- ${f}`)
    .join('\n')}`;
}
