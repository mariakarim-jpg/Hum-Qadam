## 17. Development Roadmap

### Phase 1 — Manual Validation (Weeks 1–3)
**Goal:** Validate conversation design and lesson plan quality before writing any code.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Design conversation scripts in Google Doc | Coach/PM | 3 days | Full conversation flow in both languages |
| Recruit 10 pilot teachers via existing WhatsApp groups | Coach | 3 days | 10 confirmed pilot teachers |
| Manually simulate morning check-in with each teacher | Coach | 5 days | 50+ conversation records |
| Manually generate 20 lesson plans using Claude directly | Coach + developer | 5 days | 20 sample plans rated by coach |
| Collect teacher feedback via voice note or form | Coach | 3 days | Feedback report |
| Iterate conversation language and plan format | PM + Coach | 3 days | Finalized scripts and plan template |
| Document all conversation states and decision trees | Developer | 2 days | Conversation flow diagram |

**Milestone:** Go/no-go decision for Phase 2 based on teacher feedback and plan quality scores

---

### Phase 2 — Core Build (Weeks 4–8)
**Goal:** Build the minimal working WhatsApp bot with lesson plan generation.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Set up Node.js project, Supabase, Railway, Twilio sandbox | Developer | 2 days | Dev environment live |
| Build teacher onboarding conversation flow | Developer | 4 days | Onboarding works end-to-end |
| Build teacher profile CRUD (DB + API) | Developer | 2 days | Profile stored and retrievable |
| Build lesson planning conversation flow | Developer | 4 days | 5-message planning conversation works |
| Integrate Claude API for plan generation | Developer | 3 days | Plans generated from conversation context |
| Build WhatsApp message logging | Developer | 1 day | All messages stored in DB |
| Write and test AI system prompt (30+ test cases) | Coach + Developer | 5 days | Prompt achieving 90%+ plan quality |
| Build plan revision flow (teacher can request changes) | Developer | 2 days | Revision flow works |
| Internal testing with 5 real teachers | Coach + Developer | 5 days | Bug fixes; UX refinements |

**Milestone:** 5 real teachers using system daily; plans rated 4/5+ by coach

---

### Phase 3 — Automation (Weeks 9–12)
**Goal:** Add automated daily messaging, reflection loop, and history.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Build morning check-in scheduler (cron) | Developer | 2 days | Messages sent at 5:00 AM daily |
| Build school-day calendar logic (holidays, weekends) | Developer | 2 days | No messages on non-school days |
| Build evening reflection scheduler | Developer | 2 days | Reflection prompt sent at 2:00 PM |
| Build reflection conversation flow | Developer | 3 days | Full reflection flow works |
| Build challenge classification (AI-assisted) | Developer | 2 days | Challenges tagged automatically |
| Build lesson plan history retrieval ("last plan" command) | Developer | 1 day | Teacher can request last plan |
| Build coaching tip generation on challenge report | Developer | 2 days | Tip sent after challenge reported |
| Build vacation mode (stop/start commands) | Developer | 1 day | Teachers can pause messages |
| Expand pilot to 25 teachers | Coach | 5 days | 25 teachers onboarded |

**Milestone:** 25 teachers receiving automated daily check-ins; 70%+ response rate

---

### Phase 4 — Coach Dashboard (Weeks 13–18)
**Goal:** Build web dashboard for coaches and school leaders.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Design dashboard wireframes | PM + Designer | 3 days | Figma wireframes approved |
| Build React dashboard scaffold + auth (Supabase) | Developer | 3 days | Dashboard login works |
| Build overview page (metric cards + alerts) | Developer | 4 days | Home page live |
| Build teacher list page with filters | Developer | 3 days | Teacher list with status indicators |
| Build teacher detail page | Developer | 4 days | Individual teacher view with history |
| Build analytics page (charts) | Developer | 5 days | All 4 chart types live |
| Build coach alert system (email/WhatsApp digest) | Developer | 3 days | Alerts firing correctly |
| Build report export (PDF) | Developer | 3 days | Weekly report downloadable |
| Build coach-to-teacher message (dashboard → WhatsApp) | Developer | 2 days | Coaches can send messages from dashboard |
| UAT with 5 coaches | Coaches + PM | 5 days | Bug fixes; UX improvements |

**Milestone:** 5 coaches using dashboard weekly; coaches report it improves visit prioritization

---

### Phase 5 — Scale and Depth (Weeks 19–28)
**Goal:** Scale to 500+ teachers; add curriculum integration and advanced coaching features.

| Task | Owner | Duration | Deliverable |
|---|---|---|---|
| Switch from Twilio to Meta WhatsApp Business API | Developer | 1 week | Direct API live; cost reduced |
| Apply for Meta WhatsApp Business verification | PM | Ongoing (start Week 12) | Verified business account |
| Build curriculum SLO library (province-wise) | PM + Content | 2 weeks | SLOs selectable from menu |
| Build activity suggestion library | Content + Developer | 2 weeks | Low-resource activity bank searchable |
| Build peer learning module (teachers share plans) | Developer | 1 week | Opt-in plan sharing between teachers |
| Build multi-province support (language, curriculum) | Developer | 1 week | Punjab + KPK + Sindh profiles |
| Load testing: simulate 500 concurrent teachers | Developer | 3 days | System stable at scale |
| Build admin panel (add coaches, schools, bulk onboard) | Developer | 1 week | Admin tools live |
| Build offline message queue (retry on failure) | Developer | 3 days | No lost messages on API downtime |

**Milestone:** 500+ teachers; system stable; cost per plan under PKR 5
