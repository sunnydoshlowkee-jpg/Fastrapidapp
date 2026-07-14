import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import Logo from '../../../components/brand/Logo'
import { hasAuthToken, isBiometricUnlockEnabled } from '../../../utils/biometricSession'
import { APP_ROLES, getRoleConfig } from '../../../utils/appRole'

export default function MerchantSplash() {
  const navigate = useNavigate()
  const role = APP_ROLES.merchant
  const roleConfig = getRoleConfig(role)
  const [phase, setPhase] = useState('one')

  useEffect(() => {
    let cancelled = false
    let t1
    let t2

    const routeReturningUser = async () => {
      if (!hasAuthToken(role)) return false

      if (Capacitor.isNativePlatform() && await isBiometricUnlockEnabled(role)) {
        navigate(roleConfig.biometricUnlockPath, { replace: true })
        return true
      }

      navigate(roleConfig.homePath, { replace: true })
      return true
    }

    const startOnboardingSplash = () => {
      t1 = setTimeout(() => {
        if (!cancelled) setPhase('two')
      }, 1500)

      t2 = setTimeout(() => {
        if (!cancelled) navigate(roleConfig.loginPath, { replace: true })
      }, 3200)
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
  }, [navigate, role, roleConfig.biometricUnlockPath, roleConfig.homePath, roleConfig.loginPath])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-merchant-primary">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3">
          <Logo variant="icon" height={48} />
          {phase === 'two' ? (
            <span className="animate-fade-in text-4xl font-semibold tracking-tight text-white">
              Rapid Merchant
            </span>
          ) : null}
        </div>

        {phase === 'two' ? (
          <p className="mt-3 animate-fade-in text-sm tracking-wide text-white/80">
            Manage orders. Grow your business.
          </p>
        ) : null}
      </div>

      <div className="absolute bottom-16 flex w-full flex-col items-center justify-center">
        {phase === 'one' ? (
          <div className="flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        ) : (
          <div className="animate-fade-in flex w-full max-w-xs flex-col items-center px-12">
            <div className="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-white/20">
              <div className="absolute left-0 top-0 h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-white" />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
              Preparing merchant portal
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
