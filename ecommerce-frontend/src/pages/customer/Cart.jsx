import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { getCart, addToCart, removeFromCart } from '../../api/cart';
import { placeOrder } from '../../api/orders';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PageLoader, ErrorMessage, EmptyState } from '../../components/ui/Loader';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  const fetchCart = () => {
    setLoading(true);
    setError('');
    getCart()
      .then(setCart)
      .catch(() => setError('Failed to load cart'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    setUpdatingId(productId);
    try {
      const updated = await addToCart(productId, quantity);
      setCart(updated);
    } catch {
      setError('Failed to update quantity');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (productId) => {
    setUpdatingId(productId);
    try {
      const updated = await removeFromCart(productId);
      setCart(updated);
    } catch {
      setError('Failed to remove item');
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setOrderMessage('');
    try {
      await placeOrder();
      navigate('/orders', { state: { orderPlaced: true } });
    } catch (err) {
      setOrderMessage(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <PageLoader />;

  const items = cart.items || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      {error && <div className="mb-6"><ErrorMessage message={error} onRetry={fetchCart} /></div>}

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Add some products to get started!"
          action={
            <Button onClick={() => navigate('/products')}>
              <ShoppingBag className="h-4 w-4" />
              Browse Products
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              {items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                  updating={updatingId === item.productId}
                />
              ))}
            </Card>
            {orderMessage && (
              <p className="mt-4 text-sm text-red-600">{orderMessage}</p>
            )}
          </div>
          <div>
            <CartSummary
              items={items}
              onPlaceOrder={handlePlaceOrder}
              placing={placing}
            />
          </div>
        </div>
      )}
    </div>
  );
}
