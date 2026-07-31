import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import BrandedLoader from '../ui/BrandedLoader'
import {
  isLoginSecurityVerified,
  needsPostLoginSecurityChallenge,
  resolveEffectiveLoginMethod,
} from '../../utils/userLoginSecurity'

/**
 * Blocks /app until login security (TOTP or web email fallback) is verified this session.
 */
export default function LoginSecurityGate({ children }) {
  const { user, loading } = useAuth()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!loading) setReady(true)
  }, [loading])

  if (loading || !ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <BrandedLoader size="md" />
      </div>
    )
  }

  if (!user) {
    return children
  }

  if (needsPostLoginSecurityChallenge(user) && !isLoginSecurityVerified()) {
    const method = resolveEffectiveLoginMethod(user)
    return <Navigate to="/auth/login-security" replace state={{ method }} />
  }

  return children
}
