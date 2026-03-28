import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  Wallet,
  Bell,
  Users,
  Settings,
  Banknote,
} from 'lucide-react';

const investorLinks = [
  { to: '/investor', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/investor/properties', icon: Building2, label: 'Properties' },
  { to: '/investor/marketplace', icon: ArrowLeftRight, label: 'Marketplace' },
  { to: '/investor/rent-income', icon: Wallet, label: 'Rent Income' },
  { to: '/investor/notifications', icon: Bell, label: 'Notifications' },
];

const adminLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/properties', icon: Building2, label: 'Properties' },
  { to: '/admin/rent-management', icon: Banknote, label: 'Rent Management' },
  { to: '/admin/investors', icon: Users, label: 'Investors' },
];

export default function Sidebar({ role = 'investor' }) {
  const links = role === 'admin' ? adminLinks : investorLinks;
  const switchTo = role === 'admin' ? '/investor' : '/admin';
  const switchLabel = role === 'admin' ? 'Switch to Investor' : 'Switch to Admin';

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 text-white">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-700/50">
        <Link to={role === 'admin' ? '/admin' : '/investor'} className="block">
          <h1 className="text-xl font-bold tracking-wide text-white">DAREK</h1>
          <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
            Real Estate Tokenization
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-700/50">
        <Link
          to={switchTo}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ArrowLeftRight className="w-5 h-5 shrink-0" />
          <span>{switchLabel}</span>
        </Link>
        <Link
          to={`/${role}/settings`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
