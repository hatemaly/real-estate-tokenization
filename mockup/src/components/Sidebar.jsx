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
  X,
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

export default function Sidebar({ role = 'investor', open, onClose }) {
  const links = role === 'admin' ? adminLinks : investorLinks;
  const switchTo = role === 'admin' ? '/investor' : '/admin';
  const switchLabel = role === 'admin' ? 'Switch to Investor' : 'Switch to Admin';

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-slate-700/50 flex items-center justify-between">
          <Link to={role === 'admin' ? '/admin' : '/investor'} className="block" onClick={onClose}>
            <h1 className="text-lg font-bold tracking-wide text-white leading-tight">Uptown<br/>October</h1>
            <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
              Real Estate Tokenization
            </p>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
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
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ArrowLeftRight className="w-5 h-5 shrink-0" />
            <span>{switchLabel}</span>
          </Link>
          <Link
            to={`/${role}/settings`}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
