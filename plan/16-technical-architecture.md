## 16. Technical Architecture

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    TEACHER (WhatsApp)                        │
└─────────────────────────┬────────────────────────────────────┘
                          │ HTTPS webhook / API calls
┌─────────────────────────▼────────────────────────────────────┐
│            WhatsApp Business API (Meta / Twilio)             │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                   NODE.JS BACKEND (Railway)                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  EXPRESS API SERVER                  │    │
│  │  /webhook/whatsapp  /api/dashboard  /api/teachers   │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐    │
│  │              CONVERSATION ROUTER                     │    │
│  │  OnboardingHandler | PlanningHandler | ReflectionH  │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐    │
│  │              AI SERVICE LAYER                        │    │
│  │  LessonPlanGenerator | CoachingTipGenerator |        │    │
│  │  ChallengeClassifier | CoachBriefGenerator           │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │ Anthropic API                      │
│  ┌──────────────────────▼──────────────────────────────┐    │
│  │              SCHEDULER (node-cron)                   │    │
│  │  MorningCheckInJob | EveningReflectionJob |          │    │
│  │  WeeklyReportJob | CoachAlertJob                     │    │
│  └──────────────────────┬──────────────────────────────┘    │
└───────────────────────────────────────────────────────────── ┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                   SUPABASE (Database + Auth)                  │
│  PostgreSQL | Row-level security | Realtime subscriptions    │
└──────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│              REACT DASHBOARD (Vercel / Railway)               │
│  Coach view | Analytics | Teacher details | Report export    │
└──────────────────────────────────────────────────────────────┘
```

### Tech Stack — Detailed

| Layer | Technology | Version | Reason |
|---|---|---|---|
| Backend runtime | Node.js | 20 LTS | Async-native, large ecosystem |
| Backend framework | Express.js | 4.x | Lightweight, sufficient for API |
| AI | Anthropic Claude Sonnet API | claude-sonnet-4-6 | Best instruction-following, cost-efficient |
| WhatsApp (MVP) | Twilio WhatsApp API | Latest | Fast setup for pilot |
| WhatsApp (Scale) | Meta Cloud API | v18+ | Direct, lower cost at volume |
| Database | Supabase (PostgreSQL) | Latest | Managed Postgres + auth + realtime |
| Job scheduling | node-cron | 3.x | Simple cron in-process |
| Frontend dashboard | React + Vite | React 18 | Component ecosystem |
| Dashboard UI | Tailwind CSS + shadcn/ui | Latest | Fast, consistent UI |
| Charts | Recharts | Latest | React-native, accessible |
| Auth (dashboard) | Supabase Auth | Latest | JWT, role-based |
| Hosting (backend) | Railway | Latest | Simple deploy, Pakistan-region available |
| Hosting (frontend) | Vercel | Latest | Fast CDN, free tier |
| Environment config | dotenv | Latest | Secrets management |
| Logging | Winston + Railway logs | Latest | Structured logging |
| Error monitoring | Sentry | Latest | Error alerting |
