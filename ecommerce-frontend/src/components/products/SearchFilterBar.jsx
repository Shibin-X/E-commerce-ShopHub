import { Search, SlidersHorizontal } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

export default function SearchFilterBar({ filters, onChange, onSearch, onReset }) {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-gray-700">
        <SlidersHorizontal className="h-5 w-5" />
        <h2 className="font-semibold">Search & Filter</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Input
            label="Search"
            placeholder="Search by product name..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <Input
          label="Min Price (₹)"
          type="number"
          min="0"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => handleChange('minPrice', e.target.value)}
        />

        <Input
          label="Max Price (₹)"
          type="number"
          min="0"
          placeholder="Any"
          value={filters.maxPrice}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
        />
      </div>

      <div className="mt-4 flex gap-3">
        <Button onClick={onSearch}>
          <Search className="h-4 w-4" />
          Apply Filters
        </Button>
        <Button variant="outline" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
