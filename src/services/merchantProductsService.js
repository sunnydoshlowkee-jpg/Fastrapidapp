import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

function parsePrice(value) {
  const normalized = String(value ?? '').replace(/[^\d.]/g, '')
  const amount = Number.parseFloat(normalized)
  return Number.isFinite(amount) ? amount : 0
}

export function mapInventoryProductFromApi(product) {
  if (!product) return null

  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    mobileSku: product.mobile_sku,
    category: product.category,
    price: product.price,
    stockQty: product.stock_qty,
    stockWarning: Boolean(product.stock_warning),
    available: Boolean(product.available),
    imageUrl: product.image_url,
  }
}

export async function fetchMerchantInventory({ search = '', page = 1, perPage = 4 } = {}) {
  try {
    const { data } = await api.get('/merchant/products', {
      params: {
        search: search.trim() || undefined,
        page,
        per_page: perPage,
      },
    })

    const payload = data?.data ?? {}

    return {
      summary: payload.summary ?? [],
      insights: payload.insights ?? [],
      products: (payload.products ?? []).map(mapInventoryProductFromApi).filter(Boolean),
      pagination: {
        page: payload.pagination?.page ?? page,
        pageSize: payload.pagination?.per_page ?? perPage,
        total: payload.pagination?.total ?? 0,
        totalPages: payload.pagination?.total_pages ?? 1,
      },
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function updateMerchantProductAvailability(productId, isAvailable) {
  try {
    const { data } = await api.patch(`/merchant/products/${productId}/availability`, {
      is_available: isAvailable,
    })

    return mapInventoryProductFromApi(data?.data?.product)
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function createMerchantProduct({ productName, category, stockQuantity, price, description, mediaFile }) {
  const formData = new FormData()
  formData.append('name', productName.trim())
  formData.append('category', category)
  formData.append('stock_quantity', String(Number.parseInt(stockQuantity, 10) || 0))
  formData.append('price', String(parsePrice(price)))
  if (description?.trim()) {
    formData.append('description', description.trim())
  }
  if (mediaFile) {
    formData.append('image', mediaFile)
  }

  try {
    const { data } = await api.post('/merchant/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data?.data?.product ?? null
  } catch (err) {
    const message =
      getApiFieldError(err, 'name') ||
      getApiFieldError(err, 'category') ||
      getApiFieldError(err, 'price') ||
      getApiFieldError(err, 'stock_quantity') ||
      getApiFieldError(err, 'image') ||
      getApiFieldError(err, 'form')
    throw new Error(message)
  }
}
