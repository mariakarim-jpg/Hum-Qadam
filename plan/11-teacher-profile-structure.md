## 11. Teacher Profile Structure

### Complete Profile Object
```json
{
  "id": "uuid",
  "phone_number": "+923001234567",
  "personal": {
    "name": "Maryam",
    "preferred_name": "Maryam",
    "language": "urdu"
  },
  "school": {
    "name": "GPS Darra Khel",
    "district": "Swabi",
    "province": "KPK",
    "school_type": "government_primary"
  },
  "teaching_context": {
    "grades_taught": ["3", "5"],
    "subjects_taught": ["Math", "Urdu", "Science", "Social Studies"],
    "total_students": 38,
    "is_multigrade": true,
    "textbook_series": "KPK Textbook Board",
    "curriculum_version": "SNC 2022"
  },
  "resource_constraints": {
    "has_blackboard": true,
    "has_worksheets": false,
    "has_printer": false,
    "has_projector": false,
    "has_manipulatives": false,
    "notes": "Blackboard and chalk only. Students have textbooks."
  },
  "coaching_history": {
    "coach_id": "uuid",
    "last_coach_visit": "2026-05-10",
    "recurring_challenges": ["student_engagement", "independent_work"],
    "strengths_noted": ["questioning_technique"]
  },
  "engagement_stats": {
    "checkin_response_rate_30d": 0.82,
    "plans_generated_30d": 14,
    "reflection_response_rate_30d": 0.71,
    "last_active": "2026-06-17"
  },
  "system": {
    "active": true,
    "vacation_mode": false,
    "onboarding_complete": true,
    "morning_message_time": "05:00",
    "evening_message_time": "14:00",
    "timezone": "Asia/Karachi",
    "created_at": "2026-01-15"
  }
}
```
