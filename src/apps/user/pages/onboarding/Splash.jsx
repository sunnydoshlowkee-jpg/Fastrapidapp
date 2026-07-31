import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import Logo from '../../../../components/brand/Logo'
import { getMe } from '../../../../services/authService'
import { hasAuthToken, isBiometricUnlockEnabled } from '../../../../utils/biometricSession'
import { APP_ROLES, getRoleConfig } from '../../../../utils/appRole'
import {
  clearLoginSecurityVerified,
  isLoginSecurityVerified,
  markLoginSecurityVerified,
  resolveUserLoginSecurity,
} from '../../../../utils/userLoginSecurity'

export default function Splash() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('one')
  const role = APP_ROLES.user
  const roleConfig = getRoleConfig(role)

  useEffect(() => {
    let cancelled = false
    let t1
    let t2

    const routeReturningUser = async () => {
      if (!hasAuthToken(role)) return false

      let user = null
      let security = null

      try {
        const { data } = await getMe()
        if (cancelled) return true
        user = data?.data?.user || null
        security = resolveUserLoginSecurity(user)
      } catch {
        // Offline / expired — fall through with local biometric flag only.
      }

      // Authenticator login method: always challenge TOTP on cold start.
      if (security?.method === 'totp' && security.totpEnabled) {
        clearLoginSecurityVerified()
        navigate('/auth/login-security', {
          replace: true,
          state: { method: 'totp' },
        })
        return true
      }

      let forceBiometric =
        Capacitor.isNativePlatform() && (await isBiometricUnlockEnabled(role))

      if (!forceBiometric && Capacitor.isNativePlatform() && security) {
        forceBiometric = security.biometricEnabled
      }

      if (forceBiometric) {
        navigate(roleConfig.biometricUnlockPath, {
          replace: true,
          state: { setupDevice: true },
        })
        return true
      }

      if (!isLoginSecurityVerified()) {
        markLoginSecurityVerified()
      }

      navigate(roleConfig.homePath, { replace: true })
      return true
    }

    const startOnboardingSplash = () => {
      t1 = setTimeout(() => {
        if (!cancelled) setPhase('two')
      }, 1500)

      t2 = setTimeout(() => {
        if (!cancelled) navigate('/onboarding/slider', { replace: true })
      }, 3500)
    }

    routeReturningUser().then((handled) => {
      if (!handled && !cancelled) {
        startOnboardingSplash()
      }
    })

    return () => {
      cancelled = true
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [navigate, role, roleConfig.biometricUnlockPath, roleConfig.homePath])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#4F46E5' }}>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <Logo variant="icon" height={48} />
          </div>

          {phase === 'two' && (
            <span className="text-white text-4xl font-semibold tracking-tight animate-fade-in">
              Fast Rapid
            </span>
          )}
        </div>

        {phase === 'two' && (
          <p className="text-white/80 text-sm mt-3 tracking-wide animate-fade-in">
            Fast · Fresh · Reliable
          </p>
        )}
      </div>

      <div className="absolute bottom-16 w-full flex flex-col items-center justify-center">
        {phase === 'one' ? (
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full px-12 max-w-xs animate-fade-in">
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4 relative">
              <div className="h-full bg-white w-1/3 rounded-full absolute left-0 top-0 animate-[loading_1.5s_ease-in-out_infinite]" />
            </div>
            <p className="text-white/60 text-[10px] uppercase tracking-[0.15em] font-medium">
              Initializing Delivery Network
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
