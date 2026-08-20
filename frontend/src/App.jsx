import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabaseClient.js';
import { api } from './lib/apiClient.js';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import Login from './pages/Login.jsx';
import CompleteRegistration from './pages/CompleteRegistration.jsx';
import Overview from './pages/Overview.jsx';
import TeacherList from './pages/TeacherList.jsx';
import TeacherDetail from './pages/TeacherDetail.jsx';
import Analytics from './pages/Analytics.jsx';
import Reports from './pages/Reports.jsx';

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = still checking
  const [isCoach, setIsCoach] = useState(undefined); // undefined = still checking

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Runs once per new session — this is the check that closes the gap
  // where anyone could sign in via magic link but only find out they lack
  // access once individual dashboard calls started failing. Now it's one
  // clear fork right after sign-in: registered coach -> dashboard,
  // brand-new email -> CompleteRegistration.
  useEffect(() => {
    if (!session) {
      setIsCoach(undefined);
      return;
    }
    api
      .getMyCoachStatus()
      .then((res) => setIsCoach(res.isCoach))
      .catch(() => setIsCoach(false));
  }, [session]);

  if (session === undefined) return null; // avoid a login-page flash while checking
  if (!session) return <Login />;
  if (isCoach === undefined) return null; // avoid a registration-form flash while checking
  if (!isCoach) return <CompleteRegistration email={session.user.email} onRegistered={() => setIsCoach(true)} />;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header coachEmail={session.user.email} />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
