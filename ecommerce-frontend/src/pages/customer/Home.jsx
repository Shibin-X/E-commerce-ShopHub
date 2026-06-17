import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { getProducts } from '../../api/products';
import ProductGrid from '../../components/products/ProductGrid';
import Button from '../../components/ui/Button';
import { PageLoader, ErrorMessage } from '../../components/ui/Loader';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeatured = () => {
    setLoading(true);
    setError('');
    getProducts()
      .then((data) => setProducts(data.slice(0, 8)))
      .catch(() => setError('Failed to load featured products'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Discover Amazing Products
            </h1>
            <p className="mt-4 text-lg text-primary-100">
              Shop the latest electronics, clothing, and more — all in one place.
              Fast delivery, great prices, secure checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-white text-black hover:bg-primary-50">
                  <ShoppingBag className="h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-1 text-gray-600">Hand-picked items just for you</p>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading && <PageLoader />}
        {error && <ErrorMessage message={error} onRetry={fetchFeatured} />}
        {!loading && !error && products.length > 0 && <ProductGrid products={products} />}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">No products available yet.</p>
        )}
      </section>
    </div>
  );
}
