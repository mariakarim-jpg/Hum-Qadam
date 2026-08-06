## 22. Scaling Strategy

### Scale Targets
| Milestone | Teachers | Schools | Coaches |
|---|---|---|---|
| Pilot | 20 | 5 | 2 |
| District rollout | 200 | 50 | 15 |
| Provincial rollout | 2,000 | 500 | 100 |
| National scale | 20,000 | 5,000+ | 500+ |

### Technical Scaling Approach
- **Database:** Supabase scales to ~100k rows without change; at national scale, migrate to dedicated PostgreSQL cluster
- **Backend:** Railway supports horizontal scaling; add load balancer at 500+ concurrent users
- **WhatsApp API:** Meta Cloud API handles unlimited volume; rate limits can be increased via Meta support
- **Claude API:** Anthropic enterprise tier for volume pricing; implement response caching for identical prompts
- **Cron jobs:** Move from in-process cron to dedicated job queue (BullMQ + Redis) at 1,000+ teachers

### Organizational Scaling Approach
- Train coaches to train other coaches (train-the-trainer model)
- Build self-service onboarding (teacher registers via a link, no coach required)
- Build bulk onboarding (upload CSV of teachers → all onboarded automatically)
- Partner with provincial education departments for official endorsement
- Integrate with existing teacher registration systems (TEMIS, EMIS)

### Content Scaling
- Hire Urdu-speaking curriculum specialists to curate textbook-specific SLO libraries
- Build community contribution model: coaches submit effective plans to a shared library
- Regional variants: Sindhi, Pashto, Balochi language support for frontier provinces
