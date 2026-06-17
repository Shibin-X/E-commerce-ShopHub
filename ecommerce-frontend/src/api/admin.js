import api from './axios';

export async function getAdminStats() {
  const { data } = await api.get('/admin/stats');
  return data;
}

export async function getRevenueChart() {
  const { data } = await api.get('/admin/charts/revenue');
  return data;
}

export async function getOrderStatusChart() {
  const { data } = await api.get('/admin/charts/order-status');
  return data;
}

export async function getAllOrders() {
  const { data } = await api.get('/admin/orders');
  return data;
}

export async function updateOrderStatus(orderId, status) {
  const { data } = await api.patch(`/admin/orders/${orderId}/status`, { status });
  return data;
}
