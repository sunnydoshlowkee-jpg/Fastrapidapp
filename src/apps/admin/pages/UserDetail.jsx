import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminUserDetailPage from '../../../components/admin/users/AdminUserDetailPage'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import {
  fetchAdminUserDetail,
  mapAdminUserDetailFromApi,
} from '../../../services/adminUsersService'
import { ADMIN_USERS_PATH } from '../../../services/data/adminUsers.mock'

export default function UserDetail() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!userId) {
        setError('User not found.')
        setLoading(false)
        return
      }

      if (!getAdminAuthToken()) {
        setError('Please sign in to view this user.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      try {
        const payload = await fetchAdminUserDetail(userId)
        if (!cancelled) {
          setUser(mapAdminUserDetailFromApi(payload))
        }
      } catch (err) {
        if (!cancelled) {
          setUser(null)
          const message =
            err.response?.status === 404
              ? 'User not found.'
              : err.response?.data?.message ||
                'Unable to load user details. Check that the API is running.'
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
  }, [userId])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-sm text-gray-500">
        Loading user details…
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
        <p role="alert" className="text-sm text-red-700">
          {error || 'User not found.'}
        </p>
        <Link
          to={ADMIN_USERS_PATH}
          className="text-sm font-semibold text-rapid-orange hover:text-[#E84A15]"
        >
          Back to Users
        </Link>
      </div>
    )
  }

  return <AdminUserDetailPage user={user} />
}
