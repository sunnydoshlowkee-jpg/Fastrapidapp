import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import AdminMerchantDocumentReviewMobilePage from '../../../components/admin/merchants/AdminMerchantDocumentReviewMobilePage'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import {
  fetchAdminMerchantDetail,
  mapAdminMerchantDetailFromApi,
} from '../../../services/adminMerchantsService'
import { ADMIN_MERCHANTS_PATH } from '../../../services/data/adminMerchants.mock'

export default function MerchantDocumentReview() {
  const { merchantId } = useParams()
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!merchantId) {
        setError('Merchant not found.')
        setLoading(false)
        return
      }

      if (!getAdminAuthToken()) {
        setError('Please sign in to review documents.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      try {
        const payload = await fetchAdminMerchantDetail(merchantId)
        if (!cancelled) {
          setReview(mapAdminMerchantDetailFromApi(payload).documentReview)
        }
      } catch (err) {
        if (!cancelled) {
          setReview(null)
          setError(
            err.response?.status === 404
              ? 'Merchant not found.'
              : err.response?.data?.message ||
                  'Unable to load documents. Check that the API is running.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [merchantId])

  if (!merchantId) return <Navigate to={ADMIN_MERCHANTS_PATH} replace />

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-sm text-gray-500">
        Loading documents…
      </div>
    )
  }

  if (error || !review) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
        <p role="alert" className="text-sm text-red-700">
          {error || 'Documents unavailable.'}
        </p>
        <Link
          to={ADMIN_MERCHANTS_PATH}
          className="text-sm font-semibold text-rapid-orange hover:text-[#E84A15]"
        >
          Back to Merchants
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminMerchantDocumentReviewMobilePage review={review} />
      </div>
      <div className="hidden h-full min-h-0 flex-1 flex-col items-center justify-center p-12 lg:flex">
        <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Document Review</h2>
          <p className="mt-2 text-sm text-gray-600">
            The document review workflow is currently optimised for phone screens.
            Open this URL on a mobile device or resize your window to use it.
          </p>
        </div>
      </div>
    </>
  )
}
