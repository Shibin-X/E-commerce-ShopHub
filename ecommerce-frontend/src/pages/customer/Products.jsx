import { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../../api/products';
import SearchFilterBar from '../../components/products/SearchFilterBar';
import ProductGrid from '../../components/products/ProductGrid';
import { PageLoader, ErrorMessage, EmptyState } from '../../components/ui/Loader';
import Button from '../../components/ui/Button';

const initialFilters = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback((activeFilters = filters) => {
    setLoading(true);
    setError('');

    const params = {};
    if (activeFilters.search) params.search = activeFilters.search;
    if (activeFilters.category) params.category = activeFilters.category;
    if (activeFilters.minPrice) params.minPrice = activeFilters.minPrice;
    if (activeFilters.maxPrice) params.maxPrice = activeFilters.maxPrice;

    getProducts(params)
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => fetchProducts(filters);

  const handleReset = () => {
    setFilters(initialFilters);
    fetchProducts(initialFilters);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-600">Browse and filter our complete catalog</p>
      </div>

      <div className="mb-8">
        <SearchFilterBar
          filters={filters}
          onChange={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      {loading && <PageLoader />}
      {error && <ErrorMessage message={error} onRetry={() => fetchProducts()} />}
      {!loading && !error && products.length === 0 && (
        <EmptyState
          title="No products found"
          description="Try adjusting your search or filter criteria."
          action={<Button variant="outline" onClick={handleReset}>Clear filters</Button>}
        />
      )}
      {!loading && !error && products.length > 0 && (
        <>
          <p className="mb-4 text-sm text-gray-500">{products.length} product(s) found</p>
          <ProductGrid products={products} />
        </>
      )}
    </div>
  );
}
