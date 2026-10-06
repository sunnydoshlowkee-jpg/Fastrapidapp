import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import {
  clearAdminSession,
  isAdminAuthenticated,
} from '../../../services/adminAuthService'
import { ADMIN_LOGIN_PATH } from '../../../services/data/adminAuth.mock'

export default function AdminAuthGuard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate(ADMIN_LOGIN_PATH, {
        replace: true,
        state: { from: location.pathname },
      })
      return undefined
    }

    let cancelled = false

    api
      .get('/admin/me')
      .then((response) => {
        if (cancelled) return
        const user = response?.data?.data?.user
        if (user?.must_change_password) {
          navigate('/admin/change-password', { replace: true })
          return
        }
        setReady(true)
      })
      .catch(() => {
        if (!cancelled) {
          clearAdminSession()
          navigate(ADMIN_LOGIN_PATH, {
            replace: true,
            state: { from: location.pathname },
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [navigate, location.pathname])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F6F8] text-sm text-gray-500">
        Checking your session…
      </div>
    )
  }

  return <Outlet />
}
