import { useState } from 'react';
import {
  Wallet,
  CalendarDays,
  TrendingUp,
  Building2,
  Filter,
} from 'lucide-react';
import { properties, investors, rentDistributions } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';
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

export default function RentIncome() {
  const [filterProperty, setFilterProperty] = useState('all');

  // Flatten rent distributions into per-investor rows for the current user
  const myDistributions = rentDistributions
    .flatMap((rd) => {
      const prop = properties.find((p) => p.id === rd.propertyId);
      return (rd.disbursements || [])
        .filter((d) => d.investorId === CURRENT_USER_ID)
        .map((d) => ({
          id: `${rd.id}-${d.investorId}`,
          period: rd.period,
          propertyId: rd.propertyId,
          propertyName: prop?.name || 'Unknown',
          amount: d.amount,
          tokens: d.tokens,
          perToken: rd.perTokenAmount,
          status: d.status,
          date: rd.status,
        }));
    })
    .sort((a, b) => {
      // Sort by period descending (most recent first)
      const order = ['March 2025', 'February 2025', 'January 2025'];
      return order.indexOf(a.period) - order.indexOf(b.period);
    });

  // Apply property filter
  const filteredDistributions =
    filterProperty === 'all'
      ? myDistributions
      : myDistributions.filter((d) => String(d.propertyId) === filterProperty);

  // Summary stats
  const totalEarned = myDistributions.reduce((s, d) => s + d.amount, 0);
  const periods = [...new Set(myDistributions.map((d) => d.period))];
  const latestPeriod = periods[0];
  const thisMonth = myDistributions
    .filter((d) => d.period === latestPeriod)
    .reduce((s, d) => s + d.amount, 0);
  const avgMonthly = periods.length > 0 ? totalEarned / periods.length : 0;
  const propertiesEarning = new Set(myDistributions.map((d) => d.propertyId)).size;

  // Properties owned for filter dropdown
  const investor = investors.find((i) => i.id === CURRENT_USER_ID);
  const ownedProperties = (investor?.tokensOwned || [])
    .map((h) => properties.find((p) => p.id === h.propertyId))
    .filter(Boolean);

  const columns = [
    {
      key: 'period',
      label: 'Period',
      render: (val) => <span className="font-medium text-slate-900">{val}</span>,
    },
    {
      key: 'propertyName',
      label: 'Property',
      render: (val) => <span className="text-slate-700">{val}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (val) => (
        <span className="font-semibold text-emerald-600">{fmt(val)}</span>
      ),
    },
    {
      key: 'tokens',
      label: 'Tokens Held',
      render: (val) => <span>{val.toLocaleString()}</span>,
    },
    {
      key: 'perToken',
      label: 'Per Token',
      render: (val) => (
        <span className="text-slate-600">
          AED {val.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} size="sm" />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Rent Income"
        subtitle="Track your rental income distributions across all properties."
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={Wallet}
          label="Total Earned"
          value={fmt(totalEarned)}
          change={6.8}
        />
        <StatCard
          icon={CalendarDays}
          label="This Month"
          value={fmt(thisMonth)}
        />
        <StatCard
          icon={TrendingUp}
          label="Average Monthly"
          value={fmt(Math.round(avgMonthly))}
        />
        <StatCard
          icon={Building2}
          label="Properties Earning"
          value={propertiesEarning}
        />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filter by Property</span>
        </div>
        <select
          value={filterProperty}
          onChange={(e) => setFilterProperty(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Properties</option>
          {ownedProperties.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Distribution History Table */}
      <DataTable columns={columns} data={filteredDistributions} />
    </div>
  );
}
