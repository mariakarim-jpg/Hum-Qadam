import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/apiClient.js';

// plan/14 Page 3: Teacher Detail.
export default function TeacherDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [brief, setBrief] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState(null);

  useEffect(() => {
    api.getTeacher(id).then(setData).catch((e) => setError(e.message));
    api.getCoachingBrief(id).then((d) => setBrief(d.brief)).catch(() => setBrief(null));
  }, [id]);

  async function handleSend(e) {
    e.preventDefault();
    setSendStatus('sending');
    try {
      await api.sendMessage(id, message);
      setSendStatus('sent');
      setMessage('');
    } catch (err) {
      setSendStatus(`error: ${err.message}`);
    }
  }

  if (error) return <p className="text-status-flagged">{error}</p>;
  if (!data) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold">{data.teacher.name}</h1>
        <p className="text-sm text-gray-500">
          {data.teacher.school_name} · Grades {data.teacher.grades_taught?.join(', ')} · {data.teacher.language_preference}
        </p>
      </div>

      {brief && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">
          <h2 className="mb-1 font-semibold text-blue-900">AI Coaching Brief</h2>
          <p className="text-blue-900">{brief}</p>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Activity Timeline (last 14 days)</h2>
        <ul className="space-y-1 text-sm">
          {data.activityTimeline.map((day) => (
            <li key={day.date} className="flex gap-3 text-gray-600">
              <span className="w-24 shrink-0 font-mono text-xs">{day.date}</span>
              <span>
                {day.checkinResponded ? '✅ checked in' : day.checkinSent ? '⏳ no response' : '—'}
                {day.reflectionResponded ? ', reflected' : ''}
                {day.challengeReported ? ' (challenge reported)' : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Lesson Plans</h2>
          <ul className="space-y-1 text-sm">
            {data.lessonPlans.map((p) => (
              <li key={p.id}>
                {p.date?.slice(0, 10)} — {p.subject} ({p.grades?.join(', ')})
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Challenge Log</h2>
          <ul className="space-y-1 text-sm">
            {data.challengeLog.map((c, i) => (
              <li key={i}>
                {c.date} — <span className="text-gray-500">[{c.category}]</span> {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSend} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Send a message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="Message will be sent via WhatsApp…"
        />
        <button type="submit" className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Send
        </button>
        {sendStatus && <p className="mt-2 text-sm text-gray-500">{sendStatus}</p>}
      </form>
    </div>
  );
}
