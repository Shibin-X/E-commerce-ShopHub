import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMyOrders } from '../../api/orders';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { PageLoader, ErrorMessage, EmptyState } from '../../components/ui/Loader';

export default function MyOrders() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(
    location.state?.orderPlaced ? 'Order placed successfully!' : ''
  );

  const fetchOrders = () => {
    setLoading(true);
    setError('');
    getMyOrders()
      .then(setOrders)
      .catch(() => setError('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">My Orders</h1>

      {successMessage && (
        <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={fetchOrders} />}

      {!error && orders.length === 0 && (
        <EmptyState
          title="No orders yet"
          description="Your order history will appear here after you place an order."
        />
      )}

      {!error && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id?.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : '—'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge status={order.status} />
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>

              <div className="mt-4 divide-y divide-gray-100">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-3 text-sm">
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
