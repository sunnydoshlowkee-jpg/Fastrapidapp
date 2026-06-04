import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getStoredMerchantSession } from '../../../services/merchantAuthService'
import {
  getMerchantOnboardingState,
  merchantRedirectPath,
} from '../../../services/merchantOnboardingService'

export default function MerchantDashboardGuard() {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const session = getStoredMerchantSession()

    if (!session?.token) {
      navigate('/merchant/login', { replace: true })
      return
    }

    let cancelled = false

    const verify = async () => {
      try {
        const onboarding = await getMerchantOnboardingState()

        if (cancelled) return

        if (!onboarding?.can_access_dashboard) {
          navigate(merchantRedirectPath(onboarding), { replace: true })
          return
        }

        setReady(true)
      } catch {
        if (!cancelled) {
          const cached = session.user?.onboarding
          if (cached && !cached.can_access_dashboard) {
            navigate(merchantRedirectPath(cached), { replace: true })
          } else if (cached?.can_access_dashboard) {
            setReady(true)
          } else {
            navigate('/merchant/login', { replace: true })
          }
        }
      }
    }

    verify()

    return () => {
      cancelled = true
    }
  }, [navigate])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-merchant-canvas text-sm text-merchant-muted">
        Checking your account…
      </div>
    )
  }

  return <Outlet />
}
