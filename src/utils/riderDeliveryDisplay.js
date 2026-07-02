export function getMerchantFromDelivery(delivery) {
  return delivery?.order?.items?.[0]?.product?.merchant ?? null
}

export function getDeliveryAddress(delivery) {
  const order = delivery?.order
  return order?.delivery_address || order?.deliveryAddress || null
}

export function getCustomerFromDelivery(delivery) {
  return delivery?.order?.user ?? null
}

export function formatMerchantName(merchant) {
  if (!merchant) return 'Merchant'
  return merchant.business_name || merchant.name || 'Merchant'
}

export function formatMerchantCity(merchant) {
  if (!merchant) return ''
  return merchant.address_city || merchant.city || ''
}

export function formatMerchantAddress(merchant) {
  if (!merchant) return 'Address not available'

  const parts = [
    merchant.registered_address,
    merchant.address_city,
    merchant.address_zip,
  ].filter(Boolean)

  if (parts.length > 0) {
    return parts.join(', ')
  }

  return merchant.address_line1 || merchant.address || 'Address not available'
}

export function formatMerchantPhone(merchant) {
  return merchant?.representative_phone || merchant?.phone || ''
}

export function formatCustomerName(user) {
  if (!user) return 'Customer'

  const composed = [user.first_name, user.last_name].filter(Boolean).join(' ')
  return user.full_name || composed || 'Customer'
}

export function formatCustomerAddress(address) {
  if (!address) return 'Delivery address not provided'

  const parts = [
    address.address || address.address_line1,
    address.city,
    address.state,
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(', ') : 'Delivery address not provided'
}

export function countOrderItems(delivery) {
  const items = delivery?.order?.items
  if (!Array.isArray(items) || items.length === 0) return 0
  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
}
