import {
  Plus,
  Eye,
  Pencil,
  MapPin,
  Building2,
  Coins,
  Banknote,
  UserCheck,
  FileText,
  Upload,
} from 'lucide-react';
import { properties } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';

const fmt = (n) =>
  `AED ${n.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

const columns = [
  {
    key: 'name',
    label: 'Property',
    render: (_, row) => (
      <div>
        <p className="font-semibold text-slate-900">{row.name}</p>
        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3" />
          {row.location}
        </p>
      </div>
    ),
  },
  {
    key: 'propertyType',
    label: 'Type',
    render: (val) => (
      <span className="inline-flex items-center text-xs font-medium capitalize text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
        {val}
      </span>
    ),
  },
  {
    key: 'totalTokens',
    label: 'Total Tokens',
    render: (val) => <span className="font-medium text-slate-700">{val?.toLocaleString()}</span>,
  },
  {
    key: 'tokensSold',
    label: 'Tokens Sold',
    render: (_, row) => {
      const sold = row.totalTokens - row.availableTokens;
      const pct = row.totalTokens > 0 ? Math.round((sold / row.totalTokens) * 100) : 0;
      return (
        <div className="min-w-[100px]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium text-slate-700">{sold.toLocaleString()}</span>
            <span className="text-slate-400">{pct}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    key: 'monthlyRent',
    label: 'Monthly Rent',
    render: (val) => <span className="font-medium text-slate-700">{fmt(val)}</span>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
          <Eye className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
          <Pencil className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

// Sample pre-filled form data
const sampleProperty = {
  name: 'Al Barsha Business Park',
  location: 'Al Barsha South, Dubai',
  type: 'commercial',
  description:
    'Modern Grade-B+ office complex in Al Barsha South featuring 12 floors of premium office suites with dedicated parking, 24/7 security, and direct metro access.',
  bedrooms: 0,
  area: '45,000',
  totalTokens: '15,000',
  pricePerToken: '800',
  totalValue: '12,000,000',
  monthlyRent: '75,000',
  bankAccount: '0098-7654-3210',
  iban: 'AE42 0331 0098 7654 3210 01',
  tenantName: 'Dubai Smart Solutions LLC',
  leaseStart: '2025-04-01',
  leaseEnd: '2030-03-31',
};

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="p-2 bg-primary-50 rounded-lg">
        <Icon className="w-4 h-4 text-primary-600" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    </div>
  );
}

function FormField({ label, value, type = 'text', span = 1 }) {
  return (
    <div className={span === 2 ? 'sm:col-span-2' : ''}>
      <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          readOnly
          value={value}
          rows={3}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none"
        />
      ) : (
        <input
          type={type}
          readOnly
          value={value}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none"
        />
      )}
    </div>
  );
}

function UploadArea({ label }) {
  return (
    <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center hover:border-primary-300 transition-colors cursor-pointer">
      <Upload className="w-6 h-6 text-slate-300 mx-auto" />
      <p className="text-sm font-medium text-slate-600 mt-2">{label}</p>
      <p className="text-xs text-slate-400 mt-0.5">PDF, JPG, PNG up to 10 MB</p>
    </div>
  );
}

export default function PropertyManagement() {
  return (
    <div>
      <PageHeader
        title="Property Management"
        subtitle="Manage tokenized properties and onboard new assets"
        action={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm shadow-primary-600/25">
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        }
      />

      {/* ── Properties Table ── */}
      <DataTable columns={columns} data={properties} />

      {/* ── Onboarding Form ── */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-primary-50/50 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Plus className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">New Property Onboarding</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete all sections to tokenize a new real estate asset
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Property Details */}
          <section>
            <SectionTitle icon={Building2} title="Property Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Property Name" value={sampleProperty.name} />
              <FormField label="Location" value={sampleProperty.location} />
              <FormField label="Property Type" value={sampleProperty.type} />
              <FormField label="Bedrooms / Units" value={sampleProperty.bedrooms} />
              <FormField label="Total Area (sq ft)" value={sampleProperty.area} />
              <FormField label="Description" value={sampleProperty.description} type="textarea" span={2} />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Token Configuration */}
          <section>
            <SectionTitle icon={Coins} title="Token Configuration" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Total Tokens" value={sampleProperty.totalTokens} />
              <FormField label="Price per Token (AED)" value={sampleProperty.pricePerToken} />
              <FormField label="Total Value (AED)" value={sampleProperty.totalValue} />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Financial Setup */}
          <section>
            <SectionTitle icon={Banknote} title="Financial Setup" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Monthly Rent (AED)" value={sampleProperty.monthlyRent} />
              <FormField label="Zand Bank Account No." value={sampleProperty.bankAccount} />
              <FormField label="IBAN" value={sampleProperty.iban} />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Tenant Information */}
          <section>
            <SectionTitle icon={UserCheck} title="Tenant Information" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Tenant Name" value={sampleProperty.tenantName} />
              <FormField label="Lease Start" value={sampleProperty.leaseStart} type="date" />
              <FormField label="Lease End" value={sampleProperty.leaseEnd} type="date" />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Documents */}
          <section>
            <SectionTitle icon={FileText} title="Documents" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <UploadArea label="Title Deed" />
              <UploadArea label="Valuation Report" />
              <UploadArea label="Tenancy Contract" />
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
              Save Draft
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm shadow-primary-600/25">
              Submit for Tokenization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
