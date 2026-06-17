import api from './axios';

export async function getCart() {
  const { data } = await api.get('/cart');
  return data;
}

export async function addToCart(productId, quantity = 1) {
  const { data } = await api.post('/cart/items', { productId, quantity });
  return data;
}

export async function removeFromCart(productId) {
  const { data } = await api.delete(`/cart/items/${productId}`);
  return data;
}
