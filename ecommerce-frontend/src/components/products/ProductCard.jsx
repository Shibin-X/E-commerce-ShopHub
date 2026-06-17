import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/400?text=No+Image'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400?text=No+Image';
          }}
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900 group-hover:text-primary-600">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-gray-900">
          {formatCurrency(product.price)}
        </p>
        {product.stock !== undefined && (
          <p className={`mt-1 text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        )}
      </div>
    </Link>
  );
}
