## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Availability | 99.5% uptime during school hours (6 AM – 4 PM PKT) |
| Response latency | Lesson plan generated and delivered within 15 seconds of final teacher input |
| Message delivery | 98% of scheduled messages delivered within 5 minutes of scheduled time |
| Data privacy | Teacher data stored in Pakistan or compliant region; no data shared with third parties |
| Scalability | Architecture supports 1,000 concurrent teachers without redesign |
| Offline resilience | System queues outbound messages if WhatsApp API is temporarily unavailable |
| Language accuracy | Urdu messages reviewed by native speakers before deployment |
| Cost efficiency | Lesson plan generation cost under PKR 10 per plan at launch; target PKR 3–5 at scale |
| Accessibility | Works on any Android phone with WhatsApp; no app installation required |
| Audit trail | All AI-generated content logged with timestamp, teacher ID, and input context |
