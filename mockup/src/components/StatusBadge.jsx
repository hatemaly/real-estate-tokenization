const statusStyles = {
  // Green
  verified: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  received: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  // Yellow
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  processing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  // Red
  rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  failed: 'bg-red-50 text-red-700 ring-red-600/20',
  suspended: 'bg-red-50 text-red-700 ring-red-600/20',
  // Blue
  'coming-soon': 'bg-blue-50 text-blue-700 ring-blue-600/20',
  // Gray
  'sold-out': 'bg-slate-50 text-slate-600 ring-slate-500/20',
  cancelled: 'bg-slate-50 text-slate-600 ring-slate-500/20',
};

const sizeClasses = {
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1',
};

export default function StatusBadge({ status, size = 'md' }) {
  const style = statusStyles[status] || statusStyles['pending'];
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  const label = status
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ring-1 ring-inset capitalize ${style} ${sizeClass}`}
    >
      {label}
    </span>
  );
}
