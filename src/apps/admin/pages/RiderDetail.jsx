import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminRiderDetailPage from '../../../components/admin/riders/AdminRiderDetailPage'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import {
  fetchAdminRiderDetail,
  mapAdminRiderDetailFromApi,
} from '../../../services/adminRidersService'
import { ADMIN_RIDERS_PATH } from '../../../services/data/adminRiders.mock'

export default function RiderDetail() {
  const { riderId } = useParams()
  const [rider, setRider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!riderId) {
        setError('Rider not found.')
        setLoading(false)
        return
      }

      if (!getAdminAuthToken()) {
        setError('Please sign in to view this rider.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      try {
        const payload = await fetchAdminRiderDetail(riderId)
        if (!cancelled) {
          setRider(mapAdminRiderDetailFromApi(payload))
        }
      } catch (err) {
        if (!cancelled) {
          setRider(null)
          const message =
            err.response?.status === 404
              ? 'Rider not found.'
              : err.response?.data?.message ||
                'Unable to load rider details.'
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
  }, [riderId])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-sm text-gray-500">
        Loading rider details…
      </div>
    )
  }

  if (error || !rider) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
        <p role="alert" className="text-sm text-red-700">
          {error || 'Rider not found.'}
        </p>
        <Link
          to={ADMIN_RIDERS_PATH}
          className="text-sm font-semibold text-rapid-orange hover:text-[#E84A15]"
        >
          Back to Riders
        </Link>
      </div>
    )
  }

  return (
    <AdminRiderDetailPage
      rider={rider}
      onRiderUpdated={(payload) => setRider(mapAdminRiderDetailFromApi(payload))}
    />
  )
}
