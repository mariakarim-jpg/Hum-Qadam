import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

// plan/06 NFR: "Coach dashboard requires authenticated login."
// Magic-link email auth — no password to manage, matches Supabase Auth's
// simplest flow and needs no extra UI beyond an email field.
export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithOtp({ email });
    if (signInError) setError(signInError.message);
    else setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-lg font-semibold">Hum Qadam Coach Dashboard</h1>
        <p className="mb-4 text-sm text-gray-500">Sign in with your coach email.</p>
        {sent ? (
          <p className="text-sm text-green-700">Check your inbox for a sign-in link.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.org"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {error && <p className="text-sm text-status-flagged">{error}</p>}
            <button type="submit" className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Send sign-in link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
