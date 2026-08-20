import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { api } from '../lib/apiClient.js';

/**
 * Shown once, right after a brand-new email signs in for the first time —
 * this is what makes self-registration real instead of "sign in and hit a
 * wall of failed API calls." Existing coaches never see this; App.jsx only
 * renders it when GET /api/coaches/me says isCoach is false.
 */
export default function CompleteRegistration({ email, onRegistered }) {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { coach } = await api.registerCoach(name, district);
      onRegistered(coach);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-lg font-semibold">Welcome to Hum Qadam</h1>
        <p className="mb-4 text-sm text-gray-500">
          First time signing in as <span className="font-medium">{email}</span> — just a couple of details to finish setting up your coach account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District (optional)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-status-flagged">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Setting up…' : 'Complete registration'}
          </button>
        </form>
        <button
          onClick={() => supabase.auth.signOut()}
          className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600"
        >
          Not you? Sign out
        </button>
      </div>
    </div>
  );
}
