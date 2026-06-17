import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag } from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Manage Products', icon: Package },
  { to: '/admin/orders', label: 'Manage Orders', icon: ShoppingBag },
];

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-600 text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <aside className="w-full shrink-0 border-r border-gray-200 bg-white lg:w-64">
      <div className="p-4">
        <h2 className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
