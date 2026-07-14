import api from './api'

function normalizeThread(payload) {
  const data = payload?.data || payload || {}
  return {
    deliveryId: data.delivery_id,
    orderId: data.order_id,
    peer: data.peer || {},
    messages: Array.isArray(data.messages) ? data.messages : [],
  }
}

function normalizeMessage(payload) {
  return payload?.data || payload
}

export async function fetchRiderDeliveryChat(deliveryId, afterId = null) {
  const { data } = await api.get(`/rider/deliveries/${deliveryId}/chat`, {
    params: afterId ? { after_id: afterId } : undefined,
  })
  return normalizeThread(data)
}

export async function sendRiderDeliveryChat(deliveryId, body) {
  const { data } = await api.post(`/rider/deliveries/${deliveryId}/chat`, { body })
  return normalizeMessage(data)
}

export async function fetchOrderChat(orderId, afterId = null) {
  const { data } = await api.get(`/user/orders/${orderId}/chat`, {
    params: afterId ? { after_id: afterId } : undefined,
  })
  return normalizeThread(data)
}

export async function sendOrderChat(orderId, body) {
  const { data } = await api.post(`/user/orders/${orderId}/chat`, { body })
  return normalizeMessage(data)
}
