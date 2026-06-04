import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminMerchantDetailPage from '../../../components/admin/merchants/AdminMerchantDetailPage'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import {
  fetchAdminMerchantDetail,
  mapAdminMerchantDetailFromApi,
} from '../../../services/adminMerchantsService'
import { ADMIN_MERCHANTS_PATH } from '../../../services/data/adminMerchants.mock'

export default function MerchantDetail() {
  const { merchantId } = useParams()
  const [merchant, setMerchant] = useState(null)
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
        setError('Please sign in to view this merchant.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      try {
        const payload = await fetchAdminMerchantDetail(merchantId)
        if (!cancelled) {
          setMerchant(mapAdminMerchantDetailFromApi(payload))
        }
      } catch (err) {
        if (!cancelled) {
          setMerchant(null)
          const message =
            err.response?.status === 404
              ? 'Merchant not found.'
              : err.response?.data?.message ||
                'Unable to load merchant details. Check that the API is running.'
          setError(message)
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

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-sm text-gray-500">
        Loading merchant details…
      </div>
    )
  }

  if (error || !merchant) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
        <p role="alert" className="text-sm text-red-700">
          {error || 'Merchant not found.'}
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
    <AdminMerchantDetailPage
      merchant={merchant}
      onMerchantUpdated={setMerchant}
    />
  )
}
