import { NavLink } from 'react-router-dom';

// plan/14: 5 pages. plan/06 NFR: "Mobile-responsive (coaches may access on
// phone)" — collapses to icons-only below md; full labels above.
const LINKS = [
  { to: '/', label: 'Overview', end: true },
  { to: '/teachers', label: 'Teachers' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/reports', label: 'Reports' },
];

export default function Sidebar() {
  return (
    <nav className="w-full shrink-0 border-b border-gray-200 bg-white md:w-56 md:border-b-0 md:border-r md:min-h-screen">
      <div className="px-4 py-4 text-lg font-semibold">Hum Qadam</div>
      <ul className="flex flex-row gap-1 px-2 pb-2 md:flex-col">
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
