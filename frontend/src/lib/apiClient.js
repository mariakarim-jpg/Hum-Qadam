import { supabase } from './supabaseClient.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Every dashboard API call is coach-scoped server-side (see backend's
 * middleware/auth.js) — the frontend's only job is to attach the current
 * Supabase session token; it never filters by coach itself.
 */
async function request(path, options = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getOverview: () => request('/api/teachers/overview'),
  listTeachers: () => request('/api/teachers'),
  getTeacher: (id) => request(`/api/teachers/${id}`),
  getCoachingBrief: (id) => request(`/api/teachers/${id}/coaching-brief`),
  sendMessage: (id, message) =>
    request(`/api/teachers/${id}/message`, { method: 'POST', body: JSON.stringify({ message }) }),
  getPlanningBySubject: () => request('/api/analytics/planning-by-subject'),
  getChallengeFrequency: () => request('/api/analytics/challenge-frequency'),
  getEngagementTrend: () => request('/api/analytics/engagement-trend'),
  getSchoolComparison: () => request('/api/analytics/school-comparison'),
  getWeeklySummary: () => request('/api/reports/weekly-summary'),

  // Self-registration — called right after Supabase sign-in to decide
  // whether this email already has a coach row, and to create one if not.
  getMyCoachStatus: () => request('/api/coaches/me'),
  registerCoach: (name, district) =>
    request('/api/coaches/register', { method: 'POST', body: JSON.stringify({ name, district }) }),
};
