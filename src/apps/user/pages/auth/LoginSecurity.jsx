import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SecurityAuthPanel from '../../../../components/security/SecurityAuthPanel'
import { verifyLoginSecurity } from '../../../../services/securityService'
import {
  isNativeApp,
  markLoginSecurityVerified,
  resolveEffectiveLoginMethod,
  resolveUserLoginSecurity,
} from '../../../../utils/userLoginSecurity'
import { useAuth } from '../../../../context/AuthContext'
import Logo from '../../../../components/brand/Logo'

/**
 * Second-factor challenge after email/phone OTP (TOTP, or email fallback on web).
 */
export default function LoginSecurity() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, refreshUser } = useAuth()
  const [error, setError] = useState('')
  const method = location.state?.method || resolveEffectiveLoginMethod(user) || 'totp'
  const panelMethod = method === 'biometric' && !isNativeApp() ? 'email' : method

  const handleVerified = async (payload) => {
    setError('')
    try {
      await verifyLoginSecurity({
        method: panelMethod,
        auth_code: payload?.auth_code,
        biometric_verified: payload?.biometric_verified,
      })

      markLoginSecurityVerified()
      const fresh = await refreshUser({ background: false }).catch(() => user)
      const security = resolveUserLoginSecurity(fresh || user)

      if (security.requireBiometricUnlock) {
        navigate('/auth/biometric-unlock', {
          state: { setupDevice: true, fromLogin: true },
          replace: true,
        })
        return
      }

      navigate('/app', { replace: true })
    } catch (err) {
      setError(err?.message || 'Verification failed. Try again.')
    }
  }

  const subtitle =
    panelMethod === 'totp'
      ? 'Enter the 6-digit code from your authenticator app to finish signing in.'
      : panelMethod === 'email'
        ? 'Enter the 6-digit code we sent to your email to finish signing in.'
        : 'Complete the security check to continue.'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] px-6 py-10">
      <div className="mb-8">
        <Logo variant="icon" height={48} />
      </div>
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
        {error ? (
          <p className="mx-5 mt-5 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            {error}
          </p>
        ) : null}
        <SecurityAuthPanel
          purpose="login"
          method={panelMethod === 'biometric' ? 'biometric' : panelMethod === 'email' ? 'email' : 'totp'}
          title="Confirm it's you"
          subtitle={subtitle}
          onCancel={() => navigate('/auth/login', { replace: true })}
          onVerified={handleVerified}
        />
      </div>
    </div>
  )
}
