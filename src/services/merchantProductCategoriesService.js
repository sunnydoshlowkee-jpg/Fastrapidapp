import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchMerchantProductCatalog() {
  try {
    const { data } = await api.get('/merchant/product-categories')
    return data?.data ?? {
      business_type: null,
      allows_multiple_images: false,
      categories: [],
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function createMerchantProductCategory(name) {
  try {
    const { data } = await api.post('/merchant/product-categories', { name: name.trim() })
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'name') || getApiFieldError(err, 'form'))
  }
}

export function isFoodBusinessType(businessType) {
  const normalized = String(businessType ?? '').trim().toLowerCase()
  return normalized === 'restaurant' || normalized === 'grocery'
}
