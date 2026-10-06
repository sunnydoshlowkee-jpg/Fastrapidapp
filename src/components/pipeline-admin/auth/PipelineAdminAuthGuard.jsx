import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import {
  clearPipelineSession,
  isPipelineAuthenticated,
} from '../../../services/pipelineAuthService'
import { PIPELINE_ADMIN_LOGIN_PATH } from '../../../services/data/pipelineAdminAuth.mock'

export default function PipelineAdminAuthGuard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isPipelineAuthenticated()) {
      navigate(PIPELINE_ADMIN_LOGIN_PATH, {
        replace: true,
        state: { from: location.pathname },
      })
      return undefined
    }

    let cancelled = false

    api
      .get('/admin/pipeline/me')
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch((err) => {
        if (cancelled) return

        // Only a real 401 means the session is gone. Transient failures
        // (e.g. the request fired while a mobile browser was resuming from
        // backgrounding, or a dropped connection) must NOT log the user out.
        if (err.response?.status === 401) {
          clearPipelineSession()
          navigate(PIPELINE_ADMIN_LOGIN_PATH, {
            replace: true,
            state: { from: location.pathname },
          })
          return
        }

        setReady(true)
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