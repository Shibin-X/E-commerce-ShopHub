import api from './axios';

export async function placeOrder() {
  const { data } = await api.post('/orders');
  return data;
}

export async function getMyOrders() {
  const { data } = await api.get('/orders/my');
  return data;
}
