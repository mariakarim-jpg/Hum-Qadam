import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/apiClient.js';
import StatusBadge from '../components/StatusBadge.jsx';

// plan/14 Page 2: Teacher List — "Filterable by: school, status, grade."
export default function TeacherList() {
  const [teachers, setTeachers] = useState(null);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [schoolFilter, setSchoolFilter] = useState('all');

  useEffect(() => {
    api.listTeachers().then((d) => setTeachers(d.teachers)).catch((e) => setError(e.message));
  }, []);

  const schools = useMemo(() => [...new Set((teachers ?? []).map((t) => t.school))], [teachers]);
  const filtered = useMemo(
    () =>
      (teachers ?? []).filter(
        (t) => (statusFilter === 'all' || t.status === statusFilter) && (schoolFilter === 'all' || t.school === schoolFilter)
      ),
    [teachers, statusFilter, schoolFilter]
  );

  if (error) return <p className="text-status-flagged">{error}</p>;
  if (!teachers) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Teachers</h1>

      <div className="flex gap-3">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-gray-300 px-2 py-1 text-sm">
          <option value="all">All statuses</option>
          <option value="on_track">On Track</option>
          <option value="needs_attention">Needs Attention</option>
          <option value="flagged">Flagged</option>
        </select>
        <select value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)} className="rounded-md border border-gray-300 px-2 py-1 text-sm">
          <option value="all">All schools</option>
          {schools.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">School</th>
              <th className="px-4 py-2">Plans (30d)</th>
              <th className="px-4 py-2">Check-in Rate</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((t) => (
              <tr key={t.id} className="cursor-pointer hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">
                  <Link to={`/teachers/${t.id}`} className="text-blue-600 hover:underline">
                    {t.name}
                  </Link>
                </td>
                <td className="px-4 py-2 text-gray-600">{t.school}</td>
                <td className="px-4 py-2">{t.plansLast30d}</td>
                <td className="px-4 py-2">{t.checkinRate !== null ? `${t.checkinRate}%` : '—'}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={t.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
