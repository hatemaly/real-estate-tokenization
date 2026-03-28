import {
  Users,
  UserCheck,
  Clock,
  ShieldOff,
  Search,
  Eye,
  Ban,
  RotateCcw,
} from 'lucide-react';
import { investors } from '../../data/mockData';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';

const fmt = (n) =>
  `AED ${n.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

// Augment investors with a "suspended" one for demonstration
const augmentedInvestors = investors.map((inv) => {
  // Investor 105 (Priya Sharma) shown as suspended to demo the capability
  if (inv.id === 105) {
    return { ...inv, accountStatus: 'suspended' };
  }
  return { ...inv, accountStatus: 'active' };
});

const totalInvestors = augmentedInvestors.length;
const verifiedCount = augmentedInvestors.filter((i) => i.kycStatus === 'verified').length;
const pendingCount = augmentedInvestors.filter((i) => i.kycStatus === 'pending').length;
const suspendedCount = augmentedInvestors.filter((i) => i.accountStatus === 'suspended').length;

const columns = [
  {
    key: 'name',
    label: 'Investor',
    render: (_, row) => (
      <div>
        <p className="font-semibold text-slate-900">{row.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{row.email}</p>
      </div>
    ),
  },
  {
    key: 'kycStatus',
    label: 'KYC Status',
    render: (val) => <StatusBadge status={val} />,
  },
  {
    key: 'joinDate',
    label: 'Joined',
    render: (val) => <span className="text-slate-500">{val}</span>,
  },
  {
    key: 'totalInvested',
    label: 'Total Invested',
    render: (val) => (
      <span className="font-semibold text-slate-700">{fmt(val)}</span>
    ),
  },
  {
    key: 'tokensOwned',
    label: 'Tokens Held',
    render: (val) => {
      const count = Array.isArray(val) ? val.reduce((s, t) => s + t.tokens, 0) : 0;
      return <span className="font-medium text-slate-700">{count.toLocaleString()}</span>;
    },
  },
  {
    key: 'accountStatus',
    label: 'Status',
    render: (val) => {
      if (val === 'suspended') {
        return (
          <span className="inline-flex items-center font-semibold rounded-full ring-1 ring-inset text-xs px-2.5 py-1 bg-red-50 text-red-700 ring-red-600/20">
            Suspended
          </span>
        );
      }
      return <StatusBadge status="active" />;
    },
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" title="View Details">
          <Eye className="w-4 h-4" />
        </button>
        {row.accountStatus === 'suspended' ? (
          <button
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            title="Reactivate Account"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reactivate
          </button>
        ) : (
          <button
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            title="Suspend Account"
          >
            <Ban className="w-3.5 h-3.5" />
            Suspend
          </button>
        )}
      </div>
    ),
  },
];

export default function InvestorManagement() {
  return (
    <div>
      <PageHeader
        title="Investor Management"
        subtitle="Monitor and manage all registered investors on the platform"
      />

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={Users}
          label="Total Investors"
          value={totalInvestors}
          change={8.3}
        />
        <StatCard
          icon={UserCheck}
          label="Verified"
          value={verifiedCount}
          change={12.1}
        />
        <StatCard
          icon={Clock}
          label="Pending KYC"
          value={pendingCount}
        />
        <StatCard
          icon={ShieldOff}
          label="Suspended"
          value={suspendedCount}
        />
      </div>

      {/* ── Search Bar ── */}
      <div className="mb-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search investors by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-shadow"
            readOnly
          />
        </div>
      </div>

      {/* ── Investor Table ── */}
      <DataTable columns={columns} data={augmentedInvestors} />
    </div>
  );
}
