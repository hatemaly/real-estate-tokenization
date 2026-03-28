import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Ruler,
  Users,
  FileText,
  Download,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Coins,
} from 'lucide-react';
import { properties } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';

const typeGradients = {
  apartment: 'from-blue-400 to-indigo-600',
  villa: 'from-purple-400 to-pink-600',
  commercial: 'from-emerald-400 to-teal-600',
};

const fmt = (n) =>
  new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const property = properties.find((p) => String(p.id) === String(propertyId));
  const [tokenQty, setTokenQty] = useState(1);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Property Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The property you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/investor/properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Link>
      </div>
    );
  }

  const {
    name,
    location,
    propertyType,
    status,
    description,
    totalTokens,
    availableTokens,
    pricePerToken,
    totalValue,
    annualYield,
    monthlyRent,
    bedrooms,
    area,
    tenantName,
    documents,
  } = property;

  const gradient = typeGradients[propertyType] || typeGradients.apartment;
  const soldPct =
    totalTokens > 0
      ? Math.round(((totalTokens - availableTokens) / totalTokens) * 100)
      : 0;
  const totalCost = tokenQty * pricePerToken;
  const isSoldOut = availableTokens === 0 || status === 'sold-out';
  const isComingSoon = status === 'coming-soon';

  const handleBuy = () => {
    alert(
      `Purchase Order Submitted!\n\nProperty: ${name}\nTokens: ${tokenQty.toLocaleString()}\nTotal Cost: ${fmt(totalCost)}\n\nThis is a demo -- no real transaction was made.`
    );
  };

  return (
    <div>
      {/* Back nav */}
      <Link
        to="/investor/properties"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Properties
      </Link>

      {/* Hero */}
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${gradient} h-56 sm:h-64 flex items-end overflow-hidden mb-8`}
      >
        {/* Faint decorative building icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 21V7l9-4 9 4v14H3zm2-2h5v-5H5v5zm7 0h5v-5h-5v5zm-7-7h14V8.5L12 5.3 5 8.5V12z" />
          </svg>
        </div>
        <div className="relative z-10 w-full p-6 sm:p-8 bg-gradient-to-t from-black/40 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <StatusBadge status={status} size="lg" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
              {propertyType}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{name}</h1>
          <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Description</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Property Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {bedrooms > 0 && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Bed className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Bedrooms / Units</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{bedrooms}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Ruler className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total Area</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {area.toLocaleString()} sq ft
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Tenant</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{tenantName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Documents</h2>
            <div className="space-y-2.5">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                    <span className="text-xs text-slate-400 uppercase">{doc.type}</span>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-primary-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - 1/3 */}
        <div className="space-y-6">
          {/* Investment Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">Invest in This Property</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Coins className="w-4 h-4" />
                  <span>Price per Token</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{fmt(pricePerToken)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Available Tokens</span>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {availableTokens.toLocaleString()} / {totalTokens.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>Annual Yield</span>
                </div>
                <span className="text-sm font-bold text-emerald-600">{annualYield}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Property Value</span>
                <span className="text-sm font-bold text-slate-900">{fmt(totalValue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Monthly Rent</span>
                <span className="text-sm font-bold text-slate-900">{fmt(monthlyRent)}</span>
              </div>
            </div>

            {/* Token availability progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>{soldPct}% sold</span>
                <span>{availableTokens.toLocaleString()} remaining</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all"
                  style={{ width: `${soldPct}%` }}
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              {/* Token quantity input */}
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Tokens
              </label>
              <input
                type="number"
                min={1}
                max={availableTokens}
                value={tokenQty}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(Number(e.target.value) || 1, availableTokens || 1));
                  setTokenQty(v);
                }}
                disabled={isSoldOut || isComingSoon}
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-50 disabled:text-slate-400"
              />

              {/* Total cost */}
              <div className="flex items-center justify-between mt-4 p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Total Cost</span>
                <span className="text-lg font-bold text-slate-900">{fmt(totalCost)}</span>
              </div>

              {/* Buy button */}
              <button
                onClick={handleBuy}
                disabled={isSoldOut || isComingSoon}
                className="w-full mt-4 px-6 py-3 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm"
              >
                {isSoldOut
                  ? 'Sold Out'
                  : isComingSoon
                    ? 'Coming Soon'
                    : 'Buy Tokens'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
