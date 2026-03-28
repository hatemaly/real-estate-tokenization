import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';

const typeGradients = {
  residential: 'from-blue-400 to-indigo-600',
  villa: 'from-purple-400 to-pink-600',
  commercial: 'from-emerald-400 to-teal-600',
  industrial: 'from-amber-400 to-orange-600',
  mixed: 'from-violet-400 to-fuchsia-600',
  land: 'from-lime-400 to-green-600',
};

export default function PropertyCard({ property }) {
  const {
    id,
    name,
    location,
    type = 'residential',
    propertyType,
    pricePerToken,
    annualYield,
    totalTokens,
    availableTokens,
    status,
  } = property;

  const gradient = typeGradients[type] || typeGradients.residential;
  const typeLabel = propertyType || type;
  const soldPercentage =
    totalTokens > 0
      ? Math.round(((totalTokens - availableTokens) / totalTokens) * 100)
      : 0;

  return (
    <Link
      to={`/investor/properties/${id}`}
      className="block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group"
    >
      {/* Colored placeholder */}
      <div className={`h-44 bg-gradient-to-br ${gradient} relative`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 21V7l9-4 9 4v14H3zm2-2h5v-5H5v5zm7 0h5v-5h-5v5zm-7-7h14V8.5L12 5.3 5 8.5V12z" />
          </svg>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge status={status} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80 bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Price / Token</p>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">AED {pricePerToken?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Annual Yield</p>
            <p className="text-sm font-semibold text-emerald-600 mt-0.5">{annualYield}%</p>
          </div>
        </div>

        {/* Token progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>{availableTokens?.toLocaleString()} tokens left</span>
            <span className="font-medium text-slate-700">{soldPercentage}% sold</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
