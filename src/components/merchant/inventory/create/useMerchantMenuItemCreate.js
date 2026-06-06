import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMerchantProduct } from '../../../../services/merchantProductsService'

export default function useMerchantMenuItemCreate() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleCancel = () => {
    navigate('/merchant/menu')
  }

  const handleSubmit = async (formValues) => {
    setSubmitting(true)
    setError(null)

    try {
      await createMerchantProduct(formValues)
      navigate('/merchant/menu')
    } catch (err) {
      setError(err?.message || 'Could not save menu item.')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    error,
    handleCancel,
    handleSubmit,
  }
}
