import { useState } from 'react';
import { api } from '../lib/apiClient.js';

// plan/14 Page 5: Reports. PDF/CSV export isn't implemented backend-side
// yet (see backend/README.md) — this renders the weekly summary as text.
export default function Reports() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getWeeklySummary();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Reports</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Weekly Planning Report</h2>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate Weekly Summary'}
        </button>

        {error && <p className="mt-3 text-sm text-status-flagged">{error}</p>}
        {summary && (
          <div className="mt-3 rounded-md bg-gray-50 p-3 text-sm">
            <p>{summary.summary}</p>
            <p className="mt-2 text-xs text-gray-400">Generated {new Date(summary.generatedAt).toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
        Monthly School Report and Individual Teacher Report templates aren't wired up yet — see plan/14 Page 5.
      </div>
    </div>
  );
}
