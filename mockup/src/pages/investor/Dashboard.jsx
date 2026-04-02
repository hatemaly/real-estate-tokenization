import { Link } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Building2,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { properties, investors, transactions } from '../../data/mockData';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import DataTable from '../../components/DataTable';

const CURRENT_USER_ID = 101;

const fmt = (n) =>
  new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default function Dashboard() {
  const investor = investors.find((i) => i.id === CURRENT_USER_ID);
  const firstName = 'Ahmad';

  // Build holdings rows by joining tokensOwned with properties
  const holdings = (investor?.tokensOwned || []).map((h) => {
    const prop = properties.find((p) => p.id === h.propertyId);
    if (!prop) return null;
    const ownershipPct = ((h.tokens / prop.totalTokens) * 100).toFixed(2);
    const currentValue = h.tokens * prop.pricePerToken;
    const monthlyIncome = (prop.monthlyRent * h.tokens) / prop.totalTokens;
    return {
      id: prop.id,
      name: prop.name,
      tokens: h.tokens,
      ownershipPct,
      currentValue,
      monthlyIncome,
    };
  }).filter(Boolean);

  const portfolioValue = holdings.reduce((s, h) => s + h.currentValue, 0);
  const propertiesOwned = holdings.length;

  // Recent transactions for this investor (last 5)
  const recentTxns = transactions
    .filter((t) => t.investorId === CURRENT_USER_ID)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const holdingsColumns = [
    {
      key: 'name',
      label: 'Property',
      render: (val, row) => (
        <Link
          to={`/investor/properties/${row.id}`}
          className="font-medium text-slate-900 hover:text-primary-600 transition-colors"
        >
          {val}
        </Link>
      ),
    },
    {
      key: 'tokens',
      label: 'Tokens Held',
      render: (val) => (
        <span className="font-medium">{val.toLocaleString()}</span>
      ),
    },
    {
      key: 'ownershipPct',
      label: 'Ownership',
      render: (val) => <span>{val}%</span>,
    },
    {
      key: 'currentValue',
      label: 'Current Value',
      render: (val) => (
        <span className="font-semibold text-slate-900">{fmt(val)}</span>
      ),
    },
    {
      key: 'monthlyIncome',
      label: 'Monthly Income',
      render: (val) => (
        <span className="text-emerald-600 font-medium">{fmt(Math.round(val))}</span>
      ),
    },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here is an overview of your real estate portfolio.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={DollarSign}
          label="Total Invested"
          value={fmt(investor?.totalInvested || 0)}
          change={12.4}
        />
        <StatCard
          icon={TrendingUp}
          label="Total Earnings"
          value={fmt(investor?.totalEarnings || 0)}
          change={8.2}
        />
        <StatCard
          icon={Building2}
          label="Properties Owned"
          value={propertiesOwned}
        />
        <StatCard
          icon={PieChart}
          label="Portfolio Value"
          value={fmt(portfolioValue)}
          change={5.7}
        />
      </div>

      {/* Holdings Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Holdings</h2>
        <DataTable columns={holdingsColumns} data={holdings} />
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-50">
          {recentTxns.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-sm text-slate-400">No recent transactions</p>
            </div>
          )}
          {recentTxns.map((txn) => {
            const prop = properties.find((p) => p.id === txn.propertyId);
            const isPurchase = txn.type === 'purchase' || txn.type === 'secondary-trade';
            return (
              <div key={txn.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4">
                <div
                  className={`p-2 rounded-lg ${
                    isPurchase ? 'bg-primary-50' : 'bg-emerald-50'
                  }`}
                >
                  {isPurchase ? (
                    <ArrowUpRight
                      className={`w-4 h-4 ${
                        isPurchase ? 'text-primary-600' : 'text-emerald-600'
                      }`}
                    />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {txn.type
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {prop?.name || 'Unknown Property'} &middot; {txn.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {fmt(txn.amount)}
                  </p>
                  <StatusBadge status={txn.status} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
