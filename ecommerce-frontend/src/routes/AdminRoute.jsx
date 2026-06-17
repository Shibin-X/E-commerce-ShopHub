import { Navigate } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/Loader';
import ProtectedRoute from './ProtectedRoute';

function AdminForbidden() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <ShieldX className="h-8 w-8 text-red-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">403 — Access Denied</h1>
      <p className="mt-2 text-gray-600">
        You do not have permission to access the admin panel. Admin role required.
      </p>
    </div>
  );
}

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  return (
    <ProtectedRoute>
      {loading ? (
        <PageLoader />
      ) : isAdmin ? (
        children
      ) : (
        <AdminForbidden />
      )}
    </ProtectedRoute>
  );
}

export function CustomerRoute({ children }) {
  const { isCustomer, isAdmin, loading } = useAuth();

  return (
    <ProtectedRoute>
      {loading ? (
        <PageLoader />
      ) : isCustomer || isAdmin ? (
        children
      ) : (
        <Navigate to="/" replace />
      )}
    </ProtectedRoute>
  );
}
