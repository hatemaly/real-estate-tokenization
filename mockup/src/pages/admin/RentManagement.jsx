import { useState, Fragment } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Wifi,
  WifiOff,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { properties, investors, rentCollections, rentDistributions } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';

const fmt = (n) =>
  `AED ${n.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

const propName = (id) => properties.find((p) => p.id === id)?.name ?? 'Unknown';
const investorName = (id) => investors.find((i) => i.id === id)?.name ?? 'Unknown';

export default function RentManagement() {
  const [activeTab, setActiveTab] = useState('collection');
  const [expandedRow, setExpandedRow] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const tabs = [
    { key: 'collection', label: 'Collection' },
    { key: 'distribution', label: 'Distribution' },
  ];

  return (
    <div>
      <PageHeader
        title="Rent Collection & Distribution"
        subtitle="Track rent payments from tenants and distributions to token holders"
      />

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 text-sm font-semibold rounded-md transition-all ${
              activeTab === tab.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Collection Tab ── */}
      {activeTab === 'collection' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Property
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Amount
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Date
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Tenant
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Net Distributable
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rentCollections.map((rc, idx) => (
                  <tr
                    key={rc.id}
                    className={`transition-colors hover:bg-slate-50/50 ${
                      idx % 2 === 1 ? 'bg-slate-50/30' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap font-medium">
                      {propName(rc.propertyId)}
                    </td>
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap font-semibold">
                      {fmt(rc.amount)}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {rc.collectedDate}
                    </td>
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                      {rc.tenantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={rc.status} />
                        {/* Webhook indicator */}
                        {rc.status === 'received' || rc.status === 'verified' ? (
                          <span className="text-emerald-500" title="Webhook received">
                            <Wifi className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-slate-300" title="Awaiting webhook">
                            <WifiOff className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-emerald-700">{fmt(rc.netDistributable)}</span>
                        <button
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                          onMouseEnter={() => setTooltip(rc.id)}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                        {/* Tooltip */}
                        {tooltip === rc.id && (
                          <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs rounded-lg px-3 py-2.5 shadow-lg w-52">
                            <p className="font-semibold mb-1.5 text-slate-200">Deductions Breakdown</p>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-slate-300">Maintenance</span>
                                <span>{fmt(rc.deductions.maintenance)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Platform Fee</span>
                                <span>{fmt(rc.deductions.platformFee)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Management Fee</span>
                                <span>{fmt(rc.deductions.managementFee)}</span>
                              </div>
                              <div className="flex justify-between pt-1 border-t border-slate-600 font-semibold">
                                <span className="text-slate-200">Total Deducted</span>
                                <span>
                                  {fmt(
                                    rc.deductions.maintenance +
                                      rc.deductions.platformFee +
                                      rc.deductions.managementFee
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {rc.status === 'pending' && (
                          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Confirm
                          </button>
                        )}
                        {rc.status === 'received' && (
                          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verify
                          </button>
                        )}
                        {rc.status === 'verified' && (
                          <span className="text-xs text-slate-400 italic">Verified</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Distribution Tab ── */}
      {activeTab === 'distribution' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60 w-8" />
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Property
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Period
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Total Amount
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Per Token
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Disbursements
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rentDistributions.map((rd, idx) => {
                  const hasFailed = rd.disbursements.some((d) => d.status === 'failed');
                  const failedCount = rd.disbursements.filter((d) => d.status === 'failed').length;
                  const isExpanded = expandedRow === rd.id;

                  return (
                    <Fragment key={rd.id}>
                      <tr
                        className={`transition-colors hover:bg-slate-50/50 ${
                          idx % 2 === 1 ? 'bg-slate-50/30' : ''
                        }`}
                      >
                        <td className="pl-6 py-4">
                          {rd.disbursements.length > 0 && (
                            <button
                              onClick={() =>
                                setExpandedRow(isExpanded ? null : rd.id)
                              }
                              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-700 whitespace-nowrap font-medium">
                          {propName(rd.propertyId)}
                        </td>
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          {rd.period}
                        </td>
                        <td className="px-6 py-4 text-slate-700 whitespace-nowrap font-semibold">
                          {fmt(rd.totalAmount)}
                        </td>
                        <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                          AED {rd.perTokenAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={rd.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">
                              {rd.disbursements.length}
                            </span>
                            {hasFailed && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                                <AlertTriangle className="w-3 h-3" />
                                {failedCount} failed
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {rd.status === 'pending' && (
                              <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                                <Zap className="w-3.5 h-3.5" />
                                Trigger
                              </button>
                            )}
                            {hasFailed && (
                              <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                <RotateCcw className="w-3.5 h-3.5" />
                                Retry Failed
                              </button>
                            )}
                            {rd.status === 'completed' && !hasFailed && (
                              <span className="text-xs text-slate-400 italic">
                                All settled
                              </span>
                            )}
                            {rd.status === 'processing' && !hasFailed && (
                              <span className="text-xs text-amber-500 italic">
                                In progress...
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* ── Expanded Disbursement Details ── */}
                      {isExpanded && rd.disbursements.length > 0 && (
                        <tr>
                          <td colSpan={8} className="px-0 py-0">
                            <div className="bg-slate-50/80 border-y border-slate-100 px-12 py-4">
                              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                                Disbursement Details
                              </p>
                              <div className="space-y-2">
                                {rd.disbursements.map((d, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="flex items-center gap-4 bg-white rounded-lg px-4 py-2.5 border border-slate-100"
                                  >
                                    <span className="text-sm font-medium text-slate-700 w-44 truncate">
                                      {investorName(d.investorId)}
                                    </span>
                                    <span className="text-xs text-slate-400 w-24">
                                      {d.tokens.toLocaleString()} tokens
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800 w-32">
                                      {fmt(d.amount)}
                                    </span>
                                    <StatusBadge status={d.status} size="sm" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

