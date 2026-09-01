import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

// plan/06 NFR: "Coach dashboard requires authenticated login."
// Email + password, not magic-link. Switched from magic-link after real
// testing hit Supabase's free-tier built-in email limit (2 emails/hour,
// not raisable without custom SMTP) — see notes/decisions.md for the
// full trade-off discussion. Password means one less email round-trip
// per login; new-coach signup still confirms by email once (see
// SUPABASE_CONFIRM_EMAIL note in the signup branch below).
export default function Login() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // A clicked confirmation link that's expired/invalid comes back as
  // #error=...&error_description=... in the URL hash, same pattern as the
  // old magic-link flow — kept this handling since Supabase uses the same
  // redirect-with-error convention for email confirmation links too.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes('error=')) return;

    const params = new URLSearchParams(hash.slice(1));
    const description = params.get('error_description');
    setError(
      description
        ? decodeURIComponent(description.replace(/\+/g, ' '))
        : 'That link is no longer valid. Please try again.'
    );
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  function switchMode(next) {
    setMode(next);
    setError(null);
    setConfirmationSent(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'signin') {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) setError(signInError.message);
        // On success, App.jsx's onAuthStateChange listener picks up the
        // new session automatically — nothing else to do here.
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          setError(signUpError.message);
        } else if (!data.session) {
          // No session back means email confirmation is required before
          // this account can sign in (the safer default — see the
          // confirm-email trade-off noted in the file header).
          setConfirmationSent(true);
        }
        // If data.session IS present, confirmation is off project-wide and
        // the user is already signed in — same auto-pickup as sign-in above.
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-lg font-semibold">Hum Qadam Coach Dashboard</h1>
        <p className="mb-4 text-sm text-gray-500">
          {mode === 'signin' ? 'Sign in with your coach email.' : 'Create a coach account.'}
        </p>

        {confirmationSent ? (
          <p className="text-sm text-green-700">
            Check your email to confirm your account, then come back and sign in.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.org"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="password"
              id="password"
              name="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {error && <p className="text-sm text-status-flagged">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
        )}

        <button
          onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
          className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600"
        >
          {mode === 'signin' ? "New coach? Create an account" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}
