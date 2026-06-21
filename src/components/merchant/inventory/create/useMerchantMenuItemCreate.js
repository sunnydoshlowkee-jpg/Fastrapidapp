import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { MERCHANT_MENU_ITEM_CREATE } from '../../../../services/data/merchantMenuItemCreate.mock'
import {
  createMerchantProduct,
  fetchMerchantProduct,
  mapMerchantProductForForm,
  updateMerchantProduct,
} from '../../../../services/merchantProductsService'

const CATEGORY_NAME_TO_SLUG = {
  Mains: 'mains',
  Sides: 'sides',
  Drinks: 'drinks',
  Desserts: 'desserts',
  Combos: 'combos',
}

function categoryNameToSlug(name) {
  if (!name) return ''
  return CATEGORY_NAME_TO_SLUG[name] ?? String(name).toLowerCase()
}

function parseInventoryPrice(value) {
  const normalized = String(value ?? '').replace(/[^\d.]/g, '')
  const amount = Number.parseFloat(normalized)
  return Number.isFinite(amount) ? String(amount) : ''
}

export default function useMerchantMenuItemCreate() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const location = useLocation()
  const isEditMode = Boolean(productId)

  const [loading, setLoading] = useState(isEditMode)
  const [initialForm, setInitialForm] = useState(null)
  const [initialImageUrl, setInitialImageUrl] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isEditMode) {
      const duplicateFrom = location.state?.duplicateFrom
      if (duplicateFrom) {
        setInitialForm({
          productName: duplicateFrom.productName ?? '',
          category: categoryNameToSlug(duplicateFrom.category) || duplicateFrom.category || '',
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
        setInitialImageUrl(product.image_url ?? null)
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

  const copy = useMemo(() => {
    if (!isEditMode) return MERCHANT_MENU_ITEM_CREATE

    return {
      ...MERCHANT_MENU_ITEM_CREATE,
      pageTitle: 'Edit Menu Item',
      subtitle: 'Update this item in your digital menu catalogue.',
      actions: {
        cancel: 'Cancel',
        submit: 'Save Changes',
      },
      mobile: {
        ...MERCHANT_MENU_ITEM_CREATE.mobile,
        subtitle: 'Update this menu item.',
      },
    }
  }, [isEditMode])

  const handleCancel = () => {
    navigate('/merchant/menu')
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
      setError(err?.message || 'Could not save menu item.')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    copy,
    isEditMode,
    loading,
    initialForm,
    initialImageUrl,
    submitting,
    error,
    handleCancel,
    handleSubmit,
  }
}
