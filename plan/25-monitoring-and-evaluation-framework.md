## 25. Monitoring and Evaluation Framework

### Daily Monitoring (Automated)
- Morning message delivery rate (alert if < 95%)
- Claude API error rate (alert if > 2%)
- Average plan generation latency (alert if > 20 seconds)
- Unhandled conversation states (alert if > 5/day)

### Weekly Review (Coach + PM)
- Teacher engagement scorecard (check-in rate, planning rate, reflection rate)
- Plan quality spot-check: 5 randomly selected plans reviewed by coach against rubric
- New challenges emerged (review challenge log)
- System errors and resolution log

### Monthly Evaluation
| Metric | Source | Target |
|---|---|---|
| Planning completion rate | Database | 70%+ of school days |
| Morning check-in response rate | Database | 70%+ |
| Lesson plan quality score | Coach assessment | 4.0/5.0+ |
| Teacher satisfaction (survey) | Monthly SMS survey | 4.0/5.0+ |
| Coach dashboard usage | Auth logs | 80%+ of coaches weekly |
| Cost per plan | API billing | Under PKR 10 |

### Quarterly Program Evaluation
- Compare SLO scores for students taught by system users vs. non-users (where available)
- Teacher focus groups: qualitative feedback on impact
- Coach interviews: how has visit preparation changed?
- Lesson observation: coach rates a live lesson — is multigrade quality improving?
- Generate impact report for program leadership

### 6-Month Outcomes Review
The ultimate purpose of this system is to improve student learning. At 6 months, evaluate:
1. Have teacher planning habits changed? (frequency, quality, multigrade approach)
2. Have coaches changed how they allocate school visits?
3. Is there evidence of improved student engagement or learning outcomes?
4. What challenges remain unaddressed by the system?

---

## Appendix A — Conversation Script Library

### Urdu Morning Message Templates

**Standard (Monday–Thursday):**
```
Assalamu Alaikum {name}! 🌅
Aaj ka din mubarak ho.
Aaj ke lesson plans ready hain?

1️⃣ - Haan, ready hain ✅
2️⃣ - Abhi nahi bani ❌
```

**Friday variant:**
```
Assalamu Alaikum {name}! 🌙
Juma Mubarak! Aaj ka din accha jaye.
Aaj ke plans ready hain?

1️⃣ - Haan ✅
2️⃣ - Madad chahiye ❌
```

**After 3 consecutive missed check-ins:**
```
Assalamu Alaikum {name}!
Kuch din se aapki khabar nahi aayi.
Sab theek hai? 🤔

0 - Haan sab theek hai, main active hoon
```

### Urdu Evening Reflection Templates

**Standard:**
```
Aaj ki class kaisi rahi {name}? 🏫

1️⃣ - Plan successful raha ✅
2️⃣ - Kuch challenges aaye 🤔
3️⃣ - Plan complete nahi ho saka ⏳
```

**After successful reflection (previous day):**
```
Kal ka din bahut acha raha Maryam! 🌟
Aaj bhi wahi jazba rakhein.

Aaj ki class kaisi rahi?
1️⃣ - Acha ✅  2️⃣ - Challenges 🤔  3️⃣ - Incomplete ⏳
```

---

## Appendix B — Recommended First Actions This Week

1. **Today:** Copy the AI system prompt from Section 9 and test it manually in Claude.ai with 5 real lesson plan requests
2. **Day 2:** Draft all Urdu conversation messages with a native speaker review
3. **Day 3:** Identify 10 willing pilot teachers through your existing coaching network
4. **Day 4:** Set up a free Twilio sandbox account and test sending/receiving WhatsApp messages
5. **Day 5:** Create the Supabase project and implement the `teachers` and `lesson_plans` tables
6. **Week 2:** Begin manual simulation of the full conversation flow with 3 pilot teachers

---

*This system is not a replacement for human coaching. It is a daily presence between coaching visits — a warm, reliable, pedagogically grounded companion that helps teachers face each classroom morning better prepared than the day before.*
