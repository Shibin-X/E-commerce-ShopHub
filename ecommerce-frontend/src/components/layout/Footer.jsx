import { Store } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-gray-600">
            <Store className="h-5 w-5 text-primary-600" />
            <span className="font-semibold text-gray-900">ShopHub</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ShopHub. Build by shibin.web
          </p>
        </div>
      </div>
    </footer>
  );
}
