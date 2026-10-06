export const BUSINESS_TYPES = ['Restaurant', 'Retail', 'Grocery', 'Pharmacy', 'Fashion', 'Other']

export const STORE_FORMATS = [
  { value: 'supermarket', label: 'Supermarket' },
  { value: 'minimart', label: 'Minimart' },
  { value: 'local_market', label: 'Local Market' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'variety', label: 'Variety Store' },
]

export function allowsStoreFormat(businessType) {
  const normalized = String(businessType ?? '').trim().toLowerCase()
  return normalized === 'grocery' || normalized === 'retail'
}

export function isFoodBusiness(businessType) {
  const normalized = String(businessType ?? '').trim().toLowerCase()
  return normalized === 'restaurant' || normalized === 'grocery'
}

export function isGroceryBusiness(businessType) {
  return String(businessType ?? '').trim().toLowerCase() === 'grocery'
}

export function storeFormatLabel(storeFormat) {
  return STORE_FORMATS.find((item) => item.value === storeFormat)?.label || null
}

export function normalizeVendorType(type) {
  const normalized = String(type ?? '').trim().toLowerCase()
  if (normalized === 'food' || normalized === 'restaurant' || normalized === 'restaurants') {
    return 'food'
  }
  if (
    normalized === 'grocery' ||
    normalized === 'groceries' ||
    normalized === 'supermarket' ||
    normalized === 'supermarkets'
  ) {
    return 'grocery'
  }
  if (normalized === 'retail' || normalized === 'shop' || normalized === 'shops') {
    return 'retail'
  }
  if (normalized === 'fashion' || normalized === 'apparel' || normalized === 'clothing') {
    return 'retail'
  }
  if (normalized === 'pharmacy' || normalized === 'pharmacies' || normalized === 'health') {
    return 'pharmacy'
  }
  if (normalized === 'other' || normalized === 'more' || normalized === 'others') {
    return 'other'
  }
  return normalized || null
}

export function browseCategoryTitle(vertical) {
  const titles = {
    retail: 'Retail & Shops',
    pharmacy: 'Pharmacy',
    other: 'More Vendors',
    food: 'Food Vendors',
    grocery: 'Grocery Stores',
  }
  return titles[vertical] || 'Vendors'
}

export function storeFormatFromFilter(filter) {
  const map = {
    Supermarkets: 'supermarket',
    Minimarts: 'minimart',
    'Local Markets': 'local_market',
    Warehouses: 'warehouse',
  }
  return map[filter] || null
}
