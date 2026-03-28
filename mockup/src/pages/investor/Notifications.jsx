import { useState } from 'react';
import {
  ShieldCheck,
  ShoppingCart,
  Banknote,
  ArrowLeftRight,
  Info,
  CheckCheck,
} from 'lucide-react';
import { notifications } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';

const CURRENT_USER_ID = 101;

// Icons mapped to notification types
const typeIcons = {
  kyc: ShieldCheck,
  purchase: ShoppingCart,
  distribution: Banknote,
  marketplace: ArrowLeftRight,
  system: Info,
};

// Icon background colors per type
const typeColors = {
  kyc: 'bg-violet-50 text-violet-600',
  purchase: 'bg-emerald-50 text-emerald-600',
  distribution: 'bg-amber-50 text-amber-600',
  marketplace: 'bg-blue-50 text-blue-600',
  system: 'bg-slate-100 text-slate-500',
};

// Filter tabs
const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'kyc', label: 'KYC' },
  { key: 'purchase', label: 'Purchases' },
  { key: 'distribution', label: 'Distributions' },
  { key: 'marketplace', label: 'Marketplace' },
];

// Relative time helper
function timeAgo(dateStr) {
  const now = new Date('2026-03-27T12:00:00');
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [readState, setReadState] = useState({});

  // Get notifications for current user (investorId matches or is null for system-wide)
  const userNotifications = notifications
    .filter((n) => n.investorId === CURRENT_USER_ID || n.investorId === null)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filter by type
  const filteredNotifications =
    activeFilter === 'all'
      ? userNotifications
      : userNotifications.filter((n) => n.type === activeFilter);

  // Read status: check local override first, fall back to data
  const isRead = (notif) => readState[notif.id] ?? notif.read;
  const unreadCount = userNotifications.filter((n) => !isRead(n)).length;

  const markAllRead = () => {
    const overrides = {};
    userNotifications.forEach((n) => {
      overrides[n.id] = true;
    });
    setReadState((prev) => ({ ...prev, ...overrides }));
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        action={
          unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </button>
          )
        }
      />

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit mb-6 flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === tab.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
            <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No notifications in this category.</p>
          </div>
        )}

        {filteredNotifications.map((notif) => {
          const Icon = typeIcons[notif.type] || Info;
          const colorClass = typeColors[notif.type] || typeColors.system;
          const read = isRead(notif);

          return (
            <div
              key={notif.id}
              className={`bg-white rounded-xl shadow-sm border transition-colors ${
                read
                  ? 'border-slate-100'
                  : 'border-l-4 border-l-primary-500 border-t-slate-100 border-r-slate-100 border-b-slate-100 bg-primary-50/30'
              } p-4 sm:p-5`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-2.5 rounded-lg shrink-0 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={`text-sm font-semibold ${
                        read ? 'text-slate-700' : 'text-slate-900'
                      }`}
                    >
                      {notif.title}
                    </h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap shrink-0">
                      {timeAgo(notif.date)}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${read ? 'text-slate-400' : 'text-slate-600'}`}>
                    {notif.message}
                  </p>
                </div>

                {/* Unread dot */}
                {!read && (
                  <div className="shrink-0 mt-1.5">
                    <span className="block w-2.5 h-2.5 rounded-full bg-primary-500" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
