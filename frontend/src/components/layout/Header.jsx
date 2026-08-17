import { supabase } from '../../lib/supabaseClient.js';

export default function Header({ coachEmail }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <span className="text-sm text-gray-500">{coachEmail}</span>
      <button
        onClick={() => supabase.auth.signOut()}
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        Sign out
      </button>
    </header>
  );
}
