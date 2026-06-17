import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProduct } from '../../api/products';
import { addToCart } from '../../api/cart';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/ui/Button';
import { PageLoader, ErrorMessage } from '../../components/ui/Loader';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isCustomer } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [addMessage, setAddMessage] = useState('');

  const fetchProduct = () => {
    setLoading(true);
    setError('');
    getProduct(id)
      .then(setProduct)
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
      return;
    }

    if (!isCustomer) {
      setAddMessage('Only customer accounts can add items to cart');
      return;
    }

    setAdding(true);
    setAddMessage('');

    try {
      await addToCart(product.id, quantity);
      setAddMessage('Added to cart!');
    } catch (err) {
      setAddMessage(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <PageLoader />;
  if (error) return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ErrorMessage message={error} onRetry={fetchProduct} />
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/600?text=No+Image'}
            alt={product.name}
            className="aspect-square w-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600?text=No+Image';
            }}
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary-600">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </p>

          <p className={`mt-2 text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>

          {product.stock > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                  className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <Button onClick={handleAddToCart} disabled={adding} size="lg">
                <ShoppingCart className="h-5 w-5" />
                {adding ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
          )}

          {addMessage && (
            <p className={`mt-4 text-sm ${addMessage.includes('Added') ? 'text-green-600' : 'text-red-600'}`}>
              {addMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
