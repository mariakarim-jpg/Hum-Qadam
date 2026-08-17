import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../lib/apiClient.js';

const PIE_COLORS = ['#2563eb', '#d97706', '#16a34a', '#dc2626', '#7c3aed', '#0891b2', '#4b5563'];

// plan/14 Page 4: Analytics. The "Weekly Completion Heatmap" (school x week
// grid) isn't built here yet — /api/analytics/school-comparison gives an
// average per school, rendered as a bar chart for now; a real heatmap needs
// a per-school-per-week time series the backend doesn't compute yet.
export default function Analytics() {
  const [bySubject, setBySubject] = useState(null);
  const [byChallenge, setByChallenge] = useState(null);
  const [trend, setTrend] = useState(null);
  const [bySchool, setBySchool] = useState(null);

  useEffect(() => {
    api.getPlanningBySubject().then((d) => setBySubject(toChartData(d.counts)));
    api.getChallengeFrequency().then((d) => setByChallenge(toChartData(d.counts)));
    api.getEngagementTrend().then((d) => setTrend(d.trend.map((t) => ({ week: `-${t.weeksAgo}w`, rate: t.checkinRate }))));
    api.getSchoolComparison().then((d) => setBySchool(d.schools.map((s) => ({ name: s.school, rate: s.avgCompletionRate }))));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">Analytics</h1>

      <ChartCard title="Planning by Subject">
        {bySubject && (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bySubject}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Challenge Frequency">
        {byChallenge && (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byChallenge} dataKey="value" nameKey="name" outerRadius={90} label>
                {byChallenge.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Engagement Trend (check-in response rate, last 8 weeks)">
        {trend && (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trend}>
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis unit="%" />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="School Comparison (avg. completion rate)">
        {bySchool && (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bySchool} layout="vertical">
              <XAxis type="number" unit="%" />
              <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="rate" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold text-gray-700">{title}</h2>
      {children ?? <p className="text-sm text-gray-500">Loading…</p>}
    </div>
  );
}

function toChartData(counts) {
  return Object.entries(counts ?? {}).map(([name, value]) => ({ name, value }));
}
