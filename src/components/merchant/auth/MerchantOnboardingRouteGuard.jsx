import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getStoredMerchantSession } from '../../../services/merchantAuthService'
import { MERCHANT_SIGNUP_EMAIL_KEY } from '../../../services/data/merchantEmailVerification.mock'
import {
  canVisitSignupPath,
  getMerchantOnboardingState,
  merchantRedirectPath,
} from '../../../services/merchantOnboardingService'

const PUBLIC_AUTH_PATHS = new Set([
  '/merchant/login',
  '/merchant/signup',
  '/merchant/forgot-password',
])

export default function MerchantOnboardingRouteGuard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const pathname = location.pathname

    if (PUBLIC_AUTH_PATHS.has(pathname) || pathname.startsWith('/merchant/forgot-password')) {
      setReady(true)
      return
    }

    const session = getStoredMerchantSession()
    const isSignupFlow = pathname.startsWith('/merchant/signup')
    const isEmailVerifyPage = pathname === '/merchant/signup/verify'
    const urlEmail = new URLSearchParams(location.search).get('email')?.trim().toLowerCase() || ''
    const signupEmail = sessionStorage.getItem(MERCHANT_SIGNUP_EMAIL_KEY)?.trim().toLowerCase() || ''
    const isFreshEmailVerification =
      isEmailVerifyPage && urlEmail !== '' && (signupEmail === '' || urlEmail === signupEmail)

    if (!session?.token && !isSignupFlow) {
      navigate('/merchant/login', { replace: true })
      return
    }

    if (!session?.token || isFreshEmailVerification) {
      setReady(true)
      return
    }

    let cancelled = false

    const sync = async () => {
      try {
        const onboarding = await getMerchantOnboardingState()

        if (cancelled) return

        const target = merchantRedirectPath(onboarding)
        const onDashboard = !pathname.startsWith('/merchant/signup') && pathname.startsWith('/merchant')

        if (onboarding?.can_access_dashboard) {
          if (isSignupFlow) {
            navigate('/merchant', { replace: true })
            return
          }
          setReady(true)
          return
        }

        if (onDashboard) {
          navigate(target, { replace: true })
          return
        }

        if (isSignupFlow && !canVisitSignupPath(pathname, onboarding)) {
          navigate(target, { replace: true })
          return
        }

        setReady(true)
      } catch {
        if (!cancelled) {
          setReady(true)
        }
      }
    }

    sync()

    return () => {
      cancelled = true
    }
  }, [location.pathname, location.search, navigate])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-merchant-canvas text-sm text-merchant-muted">
        Loading…
      </div>
    )
  }

  return <Outlet />
}
