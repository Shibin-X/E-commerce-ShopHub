import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../ui/Button';

export default function CartItem({ item, onUpdateQuantity, onRemove, updating }) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 py-4 sm:flex-row sm:items-center">
      <img
        src={item.imageUrl || 'https://via.placeholder.com/80?text=No+Image'}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-lg object-cover"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/80?text=No+Image';
        }}
      />

      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={updating || item.quantity <= 1}
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          disabled={updating}
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className="w-24 text-right font-semibold text-gray-900">
        {formatCurrency(lineTotal)}
      </p>

      <Button
        variant="ghost"
        size="sm"
        disabled={updating}
        onClick={() => onRemove(item.productId)}
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
