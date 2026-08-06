## 20. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| WhatsApp API approval delayed | High | High | Use Twilio sandbox for pilot; apply for Meta verification in Week 1 |
| Teachers don't respond to morning messages | High | High | Test message timing in Phase 1; offer opt-in for different times; use coach encouragement |
| AI generates sequential (non-multigrade) plans | Medium | High | Explicit prompt instruction + validation check; human review of first 50 plans |
| Poor connectivity causes message failures | High | Medium | Retry queue; offline caching; coach as backup for plan sharing |
| Teachers share the bot number and unknown users message | Medium | Low | Phone number whitelist; "not registered" response with onboarding link |
| Urdu text rendering issues on older Android phones | Medium | Medium | Test on low-end Android (Samsung A03); avoid complex Unicode; test with 5 devices |
| Meta WhatsApp policy violation (template rejected) | Medium | High | Review all templates with Meta policy team early; have fallback text-only versions |
| Claude API cost exceeds budget at scale | Low | Medium | Set token limits; cache repeated prompts; use Haiku for classification tasks |
| Teacher data privacy breach | Low | High | Row-level security in Supabase; no PII in logs; data retention policy 12 months |
| Coach disengages from dashboard | Medium | Medium | Weekly digest via WhatsApp; keep dashboard to 1 key screen; mobile-responsive |
| Multigrade plans are too generic for specific textbooks | Medium | Medium | Curate textbook-specific prompt examples; build SLO library in Phase 5 |
