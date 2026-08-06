## 15. Analytics Framework

### Data Collected Per Teacher (Daily)
- Morning check-in: sent, delivered, read, responded, response value, response time
- Lesson plan: requested, generated, subject, grades, plan ID
- Evening reflection: sent, responded, response value, challenge text
- Conversation turns: number of messages exchanged per session

### Metrics Computed (Weekly Aggregation)
```
planning_completion_rate = plans_generated / school_days_in_period
checkin_response_rate = checkins_responded / checkins_sent
reflection_response_rate = reflections_responded / reflections_sent
avg_response_time_minutes = avg(responded_at - message_sent_at)
challenge_frequency = count(reflections where response = '2')
subjects_skipped = subjects_in_profile NOT IN plans_generated_subjects
consecutive_inactive_days = days since last any_response
```

### Challenge Classification (AI-assisted)
When a teacher reports a challenge, Claude classifies it into one of:
- `student_engagement` — students off-task or disengaged
- `independent_work` — one grade cannot work without teacher
- `time_management` — plan took too long or ran out of time
- `content_difficulty` — teacher unsure about subject content
- `classroom_management` — behaviour issues
- `resource_limitation` — lacked materials to execute plan
- `other` — unclassified

### Coach Alerting Rules
| Condition | Alert Type | Action |
|---|---|---|
| 3+ consecutive missed check-ins | Amber | Add to "needs attention" list |
| 5+ school days no plan generated | Amber | Flag on dashboard |
| Same challenge reported 3x in a week | Red | Push notification to coach |
| Check-in response rate drops below 50% in a week | Amber | Weekly digest alert |
| School-level completion rate below 60% | Red | School leader alert |
