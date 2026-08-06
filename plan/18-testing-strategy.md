## 18. Testing Strategy

### Unit Tests
- `generateLessonPlan()` — given valid input, returns plan with all 6 components
- `classifyChallenge()` — given challenge text, returns correct category
- `isSchoolDay()` — returns false for weekends and holidays
- `buildSystemPrompt()` — correctly injects all profile fields
- `parseTeacherResponse()` — correctly extracts subject and grades from natural language

### Integration Tests
- WhatsApp webhook receives message → conversation state updates correctly
- Cron job fires → morning messages sent to all active teachers
- Plan generation → plan stored in database → plan retrievable via "last plan"
- Reflection response → challenge logged → coaching tip generated and sent

### Conversation Flow Tests
- Full onboarding flow (10-step happy path)
- Onboarding with invalid inputs (handles gracefully)
- Planning flow with single grade (should still apply multigrade thinking)
- Planning flow with 3 grades simultaneously
- Reflection with challenge → follow-up → coaching tip
- Vacation mode → no messages sent → resume → messages resume

### AI Prompt Quality Tests (Manual, Weekly)
Run 30 test cases with varying inputs and rate each plan:
- [ ] Contains shared opener
- [ ] Both grades active simultaneously (not sequential)
- [ ] Teacher movement instructions present
- [ ] Peer learning moment present
- [ ] No banned resources mentioned
- [ ] Word count under 600
- [ ] Correct language used
- [ ] Textbook page referenced

**Target:** 95% of generated plans pass all 8 checks

### Load Tests
- Simulate 100 simultaneous inbound messages
- Simulate morning cron sending 500 messages in sequence
- Measure Claude API latency under concurrent requests
- Verify Supabase handles 50 concurrent DB queries

### User Acceptance Testing
- 5 pilot teachers test full flow for 1 week
- 2 coaches test dashboard for 3 days
- Collect SUS (System Usability Scale) score: target 70+
