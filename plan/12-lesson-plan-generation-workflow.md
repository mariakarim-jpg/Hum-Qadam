## 12. Lesson Plan Generation Workflow

### Step-by-Step Generation Pipeline

```
Step 1: INPUT COLLECTION
  ├── Retrieve teacher profile from database (phone_number lookup)
  ├── Extract: grades, subjects, textbooks, constraints, recent challenges
  └── Collect from conversation: subject, page, SLO for each grade

Step 2: CONTEXT ASSEMBLY
  ├── Load master system prompt
  ├── Inject teacher profile fields into prompt template
  ├── Append last 1–2 reflection challenges (if any)
  └── Set language flag (Urdu/English)

Step 3: AI GENERATION (Claude Sonnet API)
  ├── Send assembled prompt to Claude
  ├── Temperature: 0.7 (creative but consistent)
  ├── Max tokens: 800
  └── Stream response for faster delivery

Step 4: QUALITY VALIDATION
  ├── Check plan contains all 6 required sections (regex/keyword check)
  ├── Check plan does not contain banned resource references (projector, internet, etc.)
  ├── Check word count is within WhatsApp limits
  └── If validation fails: retry with corrective instruction appended

Step 5: FORMATTING
  ├── Apply WhatsApp markdown (bold with *, line breaks)
  ├── Add emoji section headers
  ├── Split into 2–3 messages if plan exceeds 1,000 characters
  └── Prepend: "📋 Aaj ka Lesson Plan — {subject} Grade {grades}"

Step 6: DELIVERY
  ├── Send via WhatsApp API
  ├── Log message IDs and delivery status
  └── Store full plan in lesson_plans table

Step 7: POST-DELIVERY
  ├── Update daily_checkins: plan_generated = true
  ├── Ask: "Koi section change karna hai? (1 - Haan / 2 - Theek hai)"
  └── Handle revision request if received
```

### Plan Output Format (Example — Urdu)

```
📋 Aaj ka Lesson Plan
Math | Grade 3 & Grade 5

🌟 OPENER (5 min — Sab saath)
Bachon se puchein: "Agar aapke paas 10 aam hain aur aap 3 doston ko barabar dena
chahte hain, toh kaise denge?" Haath uthane ko kahein. Dono grades discuss karein.

📚 GRADE 3 — Akele kaam (15 min)
Kitaab page 45 — Exercise 1, sawaal 1–6.
Har sawaal likhein aur jawab dein. Agar phas jayein, pehla sawaal dobara parhein.

👩‍🏫 TEACHER GRADE 5 KE SAATH (15 min)
Page 67 — Fractions ka concept board par likhein.
3 examples board par halal karein. 2 bachon se board par likhwaein.

🔄 TEACHER KI MOVEMENT
15 min baad: Grade 5 ko 3 practice sawaal dein (akele).
Ab Grade 3 ke paas jayein. 3 copies check karein. Ek common ghalti board par likhein.

🤝 PEER LEARNING (5 min)
Ek Grade 5 student ek Grade 3 student ko ek sawaal samjhaye.
Pairs banayein: ek bara, ek chota.

🎯 CLOSING (5 min — Sab saath)
Sab khare ho jayen. Teacher sawaal puchein. Jo sahi jawab de, baith jaye.
Grade 3: addition. Grade 5: fraction sawaal.
```
