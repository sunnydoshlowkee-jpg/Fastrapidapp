import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { resolveStorageUrl } from '../utils/mediaUrl'

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
    imageUrl: resolveStorageUrl(product.image_url) || product.image_url,
    imageKey: product.image_url || product.id,
  }
}

export function mapMerchantProductForForm(product) {
  if (!product) return null

  return {
    productName: product.name ?? '',
    category: product.category ?? '',
    stockQuantity: product.stock != null ? String(product.stock) : '',
    price: product.price != null ? String(product.price) : '',
    description: product.description ?? '',
  }
}

export async function fetchMerchantProduct(productId) {
  try {
    const { data } = await api.get(`/merchant/products/${productId}`)
    return data?.data?.product ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
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

export async function deleteMerchantProduct(productId) {
  try {
    await api.delete(`/merchant/products/${productId}`)
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

function buildMerchantProductFormData({
  productName,
  category,
  stockQuantity,
  price,
  description,
  mediaFile,
  mediaFiles = [],
  allowsMultipleImages = false,
}) {
  const formData = new FormData()
  formData.append('name', productName.trim())
  formData.append('category', category)
  formData.append('stock_quantity', String(Number.parseInt(stockQuantity, 10) || 0))
  formData.append('price', String(parsePrice(price)))
  if (description?.trim()) {
    formData.append('description', description.trim())
  }

  const files = allowsMultipleImages
    ? (mediaFiles.length > 0 ? mediaFiles : mediaFile ? [mediaFile] : [])
    : mediaFile
      ? [mediaFile]
      : mediaFiles.slice(0, 1)

  if (allowsMultipleImages) {
    files.forEach((file) => {
      formData.append('images[]', file)
    })
  } else if (files[0]) {
    formData.append('image', files[0])
  }

  return formData
}

export async function createMerchantProduct({
  productName,
  category,
  stockQuantity,
  price,
  description,
  mediaFile,
  mediaFiles,
  allowsMultipleImages,
}) {
  const formData = buildMerchantProductFormData({
    productName,
    category,
    stockQuantity,
    price,
    description,
    mediaFile,
    mediaFiles,
    allowsMultipleImages,
  })

  try {
    const { data } = await api.post('/merchant/products', formData)

    return data?.data?.product ?? null
  } catch (err) {
    const message =
      getApiFieldError(err, 'name') ||
      getApiFieldError(err, 'category') ||
      getApiFieldError(err, 'price') ||
      getApiFieldError(err, 'stock_quantity') ||
      getApiFieldError(err, 'image') ||
      getApiFieldError(err, 'images') ||
      getApiFieldError(err, 'form')
    throw new Error(message)
  }
}

export async function updateMerchantProduct(productId, formValues) {
  const formData = buildMerchantProductFormData(formValues)

  try {
    const { data } = await api.post(`/merchant/products/${productId}/update`, formData)

    return data?.data?.product ?? null
  } catch (err) {
    const message =
      getApiFieldError(err, 'name') ||
      getApiFieldError(err, 'category') ||
      getApiFieldError(err, 'price') ||
      getApiFieldError(err, 'stock_quantity') ||
      getApiFieldError(err, 'image') ||
      getApiFieldError(err, 'images') ||
      getApiFieldError(err, 'form')
    throw new Error(message)
  }
}
