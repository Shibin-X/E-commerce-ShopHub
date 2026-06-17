import { ORDER_STATUS_COLORS } from '../../utils/constants';

export default function Badge({ status, className = '' }) {
  const colorClass = ORDER_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass} ${className}`}>
      {status}
    </span>
  );
}
