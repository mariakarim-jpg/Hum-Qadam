## 14. Dashboard Design

### Coach Dashboard — Pages and Components

#### Page 1: Overview (Home)
- **Header:** "Good morning, Ahmed. Here's your cluster update."
- **Metric cards (row):**
  - Teachers active today: 18/24
  - Plans generated this week: 67
  - Reflection responses this week: 54
  - Teachers flagged for support: 3
- **Alert panel:** List of flagged teachers with reason and last activity
- **Quick action:** "Send coaching note to teacher" button

#### Page 2: Teacher List
- Table: Name | School | Last Active | Plans (30d) | Check-in Rate | Status
- Filterable by: school, status (active/flagged/inactive), grade
- Click row → Teacher Detail page

#### Page 3: Teacher Detail
- Profile summary card
- Activity timeline: last 14 days of check-ins and reflections
- All lesson plans list (subject, date, grades)
- Challenge log: all reported challenges with dates
- AI coaching brief: "Prepare for your visit to Maryam"
- Send message box: coach sends a WhatsApp message from dashboard

#### Page 4: Analytics
- **Planning by subject (bar chart):** Which subjects planned most/least across all teachers
- **Weekly completion heatmap:** School × Week grid showing completion rate
- **Challenge frequency (pie chart):** Most common challenge categories
- **Engagement trend (line chart):** Check-in response rate over last 8 weeks
- **School comparison:** Planning completion rate by school

#### Page 5: Reports
- Generate: Weekly summary | Monthly school report | Individual teacher report
- Format: PDF download or email delivery
- Pre-built report templates for program/district reporting

### Dashboard UI Principles
- Mobile-responsive (coaches may access on phone)
- Load time under 3 seconds (server-side rendering)
- Color coding: Green (on track) | Amber (attention) | Red (urgent)
- Minimal clicks: most critical info visible on home screen
- Urdu name display support
