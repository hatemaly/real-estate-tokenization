import {
  DollarSign,
  Users,
  Building2,
  TrendingUp,
  Banknote,
  Store,
  ShoppingCart,
  ArrowLeftRight,
  Wallet,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { properties, investors, transactions, platformStats, marketplaceListings } from '../../data/mockData';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';

const fmt = (n) =>
  `AED ${n.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

const typeIcons = {
  purchase: ShoppingCart,
  'secondary-trade': ArrowLeftRight,
  'rent-distribution': Wallet,
};

const typeColors = {
  purchase: 'bg-primary-50 text-primary-600',
  'secondary-trade': 'bg-amber-50 text-amber-600',
  'rent-distribution': 'bg-emerald-50 text-emerald-600',
};

function timeAgo(dateStr) {
  const now = new Date('2025-03-27T12:00:00');
  const d = new Date(dateStr);
  const diffMs = now - d;
  const diffH = Math.floor(diffMs / 3600000);
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return 'Yesterday';
  return `${diffD}d ago`;
}

function getDescription(tx) {
  const prop = properties.find((p) => p.id === tx.propertyId);
  const inv = investors.find((i) => i.id === tx.investorId);
  const propName = prop?.name ?? 'Unknown Property';

  switch (tx.type) {
    case 'purchase':
      return `${inv?.name ?? 'Investor'} purchased tokens of ${propName}`;
    case 'secondary-trade':
      return `Secondary trade on ${propName}`;
    case 'rent-distribution':
      return `Rent distributed for ${propName}`;
    default:
      return `Transaction on ${propName}`;
  }
}

// Monthly revenue bars data
const monthlyRevenue = [
  { month: 'Oct', amount: 680000 },
  { month: 'Nov', amount: 720000 },
  { month: 'Dec', amount: 850000 },
  { month: 'Jan', amount: 1015450 },
  { month: 'Feb', amount: 557982 },
  { month: 'Mar', amount: 882982 },
];
const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.amount));

export default function Dashboard() {
  const recentTxs = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const activeProps = properties.filter((p) => p.status === 'active').length;
  const activeListings = marketplaceListings.filter((l) => l.status === 'active').length;

  return (
    <div>
      <PageHeader
        title="Platform Overview"
        subtitle="Real-time metrics and activity across the DAREK platform"
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard
          icon={DollarSign}
          label="Total AUM"
          value={fmt(platformStats.totalAUM)}
          change={12.4}
        />
        <StatCard
          icon={Users}
          label="Total Investors"
          value={platformStats.totalInvestors.toLocaleString()}
          change={8.3}
        />
        <StatCard
          icon={Building2}
          label="Active Properties"
          value={activeProps}
          change={0}
        />
        <StatCard
          icon={TrendingUp}
          label="Monthly Volume"
          value={fmt(platformStats.monthlyVolume)}
          change={-3.2}
        />
        <StatCard
          icon={Banknote}
          label="Total Distributed"
          value={fmt(platformStats.totalDistributed)}
          change={15.1}
        />
        <StatCard
          icon={Store}
          label="Active Listings"
          value={activeListings}
          change={5.0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Recent Activity ── */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
            <p className="text-xs text-slate-400 mt-0.5">Last 10 platform transactions</p>
          </div>
          <div className="divide-y divide-slate-50">
            {recentTxs.map((tx) => {
              const Icon = typeIcons[tx.type] || AlertCircle;
              const color = typeColors[tx.type] || 'bg-slate-50 text-slate-600';
              return (
                <div key={tx.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/50 transition-colors">
                  <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">{getDescription(tx)}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{tx.id}</span>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                        tx.status === 'completed' ? 'bg-emerald-400' :
                        tx.status === 'pending' ? 'bg-amber-400' :
                        tx.status === 'processing' ? 'bg-blue-400' : 'bg-red-400'
                      }`} />
                      <span className="text-xs text-slate-400 capitalize">{tx.status}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-900">{fmt(tx.amount)}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {timeAgo(tx.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Monthly Revenue Chart Placeholder ── */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Monthly Revenue</h2>
            <p className="text-xs text-slate-400 mt-0.5">Platform fee income (6 months)</p>
          </div>
          <div className="px-6 py-6">
            <div className="flex items-end justify-between gap-3 h-48">
              {monthlyRevenue.map((m) => {
                const pct = (m.amount / maxRevenue) * 100;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-500">
                      {(m.amount / 1000).toFixed(0)}K
                    </span>
                    <div className="w-full flex justify-center">
                      <div
                        className="w-8 rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 transition-all"
                        style={{ height: `${Math.max(pct, 8)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{m.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Total (6 mo)</span>
                <span className="text-sm font-bold text-slate-900">
                  {fmt(monthlyRevenue.reduce((s, m) => s + m.amount, 0))}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-400">Avg Monthly</span>
                <span className="text-sm font-semibold text-slate-700">
                  {fmt(Math.round(monthlyRevenue.reduce((s, m) => s + m.amount, 0) / 6))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
