import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function CartSummary({ items, onPlaceOrder, placing }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card title="Order Summary">
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Items ({itemCount})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <Button
          className="w-full"
          size="lg"
          disabled={placing || items.length === 0}
          onClick={onPlaceOrder}
        >
          {placing ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>
    </Card>
  );
}
