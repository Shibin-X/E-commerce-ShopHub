import { useEffect, useState } from 'react';
import { IndianRupee, Package, ShoppingBag, Users } from 'lucide-react';
import { getAdminStats, getRevenueChart, getOrderStatusChart } from '../../api/admin';
import { formatCurrency } from '../../utils/formatCurrency';
import RevenueChart from '../../components/charts/RevenueChart';
import OrderStatusPieChart from '../../components/charts/OrderStatusPieChart';
import { PageLoader, ErrorMessage } from '../../components/ui/Loader';

const statCards = [
  { key: 'revenue', label: 'Revenue', icon: IndianRupee, format: (v) => formatCurrency(v), color: 'bg-green-500' },
  { key: 'totalOrders', label: 'Orders', icon: ShoppingBag, format: (v) => v?.toLocaleString('en-IN'), color: 'bg-blue-500' },
  { key: 'totalProducts', label: 'Products', icon: Package, format: (v) => v?.toLocaleString('en-IN'), color: 'bg-purple-500' },
  { key: 'customers', label: 'Customers', icon: Users, format: (v) => v?.toLocaleString('en-IN'), color: 'bg-orange-500' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = () => {
    setLoading(true);
    setError('');

    Promise.all([getAdminStats(), getRevenueChart(), getOrderStatusChart()])
      .then(([statsRes, revenueRes, statusRes]) => {
        setStats(statsRes);
        setRevenueData(revenueRes);
        setStatusData(statusRes);
      })
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Overview of your store performance</p>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchDashboard} />}

      {!error && stats && (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map(({ key, label, icon: Icon, format, color }) => (
              <div
                key={key}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {format(stats[key])}
                    </p>
                  </div>
                  <div className={`rounded-lg p-3 ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <RevenueChart data={revenueData} />
            <OrderStatusPieChart data={statusData} />
          </div>
        </>
      )}
    </div>
  );
}
