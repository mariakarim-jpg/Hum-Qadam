import { Link } from 'react-router-dom';

// plan/14 Page 1: "Alert panel: A table of flagged teachers with columns:
// Name, School, Alert Reason, Last Active, and an 'Open Profile' button."
export default function AlertPanel({ alerts }) {
  if (!alerts?.length) {
    return <p className="text-sm text-gray-500">No teachers flagged right now. 🎉</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">School</th>
            <th className="px-4 py-2">Alert Reason</th>
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {alerts.map((alert) => (
            <tr key={alert.teacherId}>
              <td className="px-4 py-2 font-medium">{alert.name}</td>
              <td className="px-4 py-2 text-gray-600">{alert.school}</td>
              <td className="px-4 py-2 text-status-flagged">{alert.reasons.join('; ')}</td>
              <td className="px-4 py-2 text-right">
                <Link to={`/teachers/${alert.teacherId}`} className="text-blue-600 hover:underline">
                  Open Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
