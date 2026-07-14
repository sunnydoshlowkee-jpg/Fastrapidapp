import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { MERCHANT_MENU_ITEM_CREATE } from '../../../../services/data/merchantMenuItemCreate.mock'
import {
  createMerchantProductCategory,
  fetchMerchantProductCatalog,
  isFoodBusinessType,
} from '../../../../services/merchantProductCategoriesService'
import {
  createMerchantProduct,
  fetchMerchantProduct,
  mapMerchantProductForForm,
  updateMerchantProduct,
} from '../../../../services/merchantProductsService'

function parseInventoryPrice(value) {
  const normalized = String(value ?? '').replace(/[^\d.]/g, '')
  const amount = Number.parseFloat(normalized)
  return Number.isFinite(amount) ? String(amount) : ''
}

function buildCopy(businessType, isEditMode) {
  const foodBusiness = isFoodBusinessType(businessType)
  const base = MERCHANT_MENU_ITEM_CREATE

  const pageTitle = isEditMode ? 'Edit Product' : foodBusiness ? 'Create Menu Item' : 'Create Product'
  const subtitle = isEditMode
    ? foodBusiness
      ? 'Update this item in your digital menu catalogue.'
      : 'Update this product in your catalogue.'
    : foodBusiness
      ? 'Add a new dish to your digital menu catalogue. Focus on high-quality visuals.'
      : 'Add a new product to your catalogue. Upload multiple photos to showcase every angle.'

  return {
    ...base,
    pageTitle,
    subtitle,
    fields: {
      ...base.fields,
      media: {
        ...base.fields.media,
        title: foodBusiness ? 'Upload product photo' : 'Upload product photos',
        hint: foodBusiness
          ? '16:9 ratio recommended. High resolution JPG or PNG.'
          : 'Add up to 6 photos. High resolution JPG, PNG, or WebP.',
      },
      description: {
        ...base.fields.description,
        placeholder: foodBusiness
          ? 'Tell your customers about the ingredients and flavor profile...'
          : 'Describe the product features, specs, and what makes it stand out...',
      },
    },
    actions: {
      cancel: 'Cancel',
      submit: isEditMode ? 'Save Changes' : foodBusiness ? 'Create Menu Item' : 'Create Product',
    },
    mobile: {
      ...base.mobile,
      subtitle: isEditMode
        ? foodBusiness
          ? 'Update this menu item.'
          : 'Update this product.'
        : foodBusiness
          ? 'Add a new dish to your digital menu catalogue.'
          : 'Add a new product with multiple photos.',
      fields: {
        ...base.mobile.fields,
        media: {
          ...base.mobile.fields.media,
          hint: foodBusiness ? '16:9 ratio recommended.' : 'Add up to 6 photos.',
        },
        description: {
          ...base.mobile.fields.description,
          placeholder: foodBusiness
            ? 'Describe the ingredients and flavor profile...'
            : 'Describe the product features and specs...',
        },
      },
    },
  }
}

export default function useMerchantMenuItemCreate() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const location = useLocation()
  const isEditMode = Boolean(productId)

  const [loading, setLoading] = useState(isEditMode)
  const [catalogLoading, setCatalogLoading] = useState(true)
  const [initialForm, setInitialForm] = useState(null)
  const [initialImageUrls, setInitialImageUrls] = useState([])
  const [categories, setCategories] = useState([])
  const [businessType, setBusinessType] = useState(null)
  const [allowsMultipleImages, setAllowsMultipleImages] = useState(false)
  const [creatingCategory, setCreatingCategory] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadCatalog() {
      try {
        setCatalogLoading(true)
        const catalog = await fetchMerchantProductCatalog()
        if (cancelled) return
        setCategories(catalog.categories ?? [])
        setBusinessType(catalog.business_type ?? null)
        setAllowsMultipleImages(Boolean(catalog.allows_multiple_images))
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Could not load product categories.')
      } finally {
        if (!cancelled) setCatalogLoading(false)
      }
    }

    loadCatalog()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isEditMode) {
      const duplicateFrom = location.state?.duplicateFrom
      if (duplicateFrom) {
        setInitialForm({
          productName: duplicateFrom.productName ?? '',
          category: duplicateFrom.category ?? '',
          stockQuantity: String(duplicateFrom.stockQuantity ?? ''),
          price: parseInventoryPrice(duplicateFrom.price),
          description: duplicateFrom.description ?? '',
        })
      }
      return undefined
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchMerchantProduct(productId)
      .then((product) => {
        if (cancelled || !product) return
        setInitialForm(mapMerchantProductForForm(product))
        const urls = product.image_urls?.length ? product.image_urls : product.image_url ? [product.image_url] : []
        setInitialImageUrls(urls)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message || 'Could not load product.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isEditMode, productId, location.state])

  const copy = useMemo(() => buildCopy(businessType, isEditMode), [businessType, isEditMode])

  const handleCancel = () => {
    navigate('/merchant/menu')
  }

  const handleCreateCategory = async (name) => {
    setCreatingCategory(true)
    setError(null)

    try {
      const created = await createMerchantProductCategory(name)
      if (created) {
        setCategories((current) => {
          if (current.some((category) => category.slug === created.slug)) {
            return current
          }

          return [...current, created].sort((a, b) => a.name.localeCompare(b.name))
        })
      }

      return created
    } catch (err) {
      setError(err?.message || 'Could not create category.')
      return null
    } finally {
      setCreatingCategory(false)
    }
  }

  const handleSubmit = async (formValues) => {
    setSubmitting(true)
    setError(null)

    try {
      if (isEditMode) {
        await updateMerchantProduct(productId, formValues)
      } else {
        await createMerchantProduct(formValues)
      }
      navigate('/merchant/menu')
    } catch (err) {
      setError(err?.message || 'Could not save product.')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    copy,
    categories,
    allowsMultipleImages,
    creatingCategory,
    isEditMode,
    loading: loading || catalogLoading,
    initialForm,
    initialImageUrls,
    submitting,
    error,
    handleCancel,
    handleCreateCategory,
    handleSubmit,
  }
}
