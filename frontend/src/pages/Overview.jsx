import { useEffect, useState } from 'react';
import { api } from '../lib/apiClient.js';
import MetricCard from '../components/MetricCard.jsx';
import AlertPanel from '../components/AlertPanel.jsx';

// plan/14 Page 1: Overview (Home).
export default function Overview() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getOverview().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-status-flagged">{error}</p>;
  if (!data) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Good morning, {data.coachName}.</h1>
        <p className="text-sm text-gray-500">Here's your cluster update.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <MetricCard label="Teachers active today" value={`${data.metrics.teachersActiveToday} / ${data.metrics.totalTeachers}`} />
        <MetricCard
          label="Teachers flagged for support"
          value={data.metrics.teachersFlaggedForSupport}
          tone={data.metrics.teachersFlaggedForSupport > 0 ? 'flagged' : 'default'}
        />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Flagged Teachers</h2>
        <AlertPanel alerts={data.alerts} />
      </div>
    </div>
  );
}
