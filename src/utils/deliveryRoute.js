import { formatCustomerAddress, formatMerchantAddress } from './riderDeliveryDisplay'

export function hasValidCoords(lat, lng) {
  if (lat == null || lng == null) return false
  const latitude = Number(lat)
  const longitude = Number(lng)
  return Number.isFinite(latitude) && Number.isFinite(longitude)
    && latitude >= -90 && latitude <= 90
    && longitude >= -180 && longitude <= 180
}

export function getPickupTarget(delivery, merchant) {
  const lat = delivery?.pickup_lat ?? delivery?.pickupLat
  const lng = delivery?.pickup_lng ?? delivery?.pickupLng

  if (hasValidCoords(lat, lng)) {
    return { lat: Number(lat), lng: Number(lng) }
  }

  const address = formatMerchantAddress(merchant)
  return address !== 'Address not available' ? address : null
}

export function getDropoffTarget(delivery, customerAddress) {
  const lat = delivery?.destination_lat ?? delivery?.destinationLat
  const lng = delivery?.destination_lng ?? delivery?.destinationLng

  if (hasValidCoords(lat, lng)) {
    return { lat: Number(lat), lng: Number(lng) }
  }

  if (customerAddress && customerAddress !== 'Delivery address not provided') {
    return customerAddress
  }

  const orderAddress = delivery?.order?.delivery_address || delivery?.order?.deliveryAddress
  const formatted = formatCustomerAddress(orderAddress)
  return formatted !== 'Delivery address not provided' ? formatted : null
}
