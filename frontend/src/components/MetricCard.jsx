// plan/14 Page 1: "Metric cards (row)" — Overview page.
export default function MetricCard({ label, value, tone = 'default' }) {
  const toneClass = { attention: 'text-status-attention', flagged: 'text-status-flagged', default: 'text-gray-900' }[tone];
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}
