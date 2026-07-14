import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import Logo from '../../../../components/brand/Logo'
import { hasAuthToken, isBiometricUnlockEnabled } from '../../../../utils/biometricSession'
import { APP_ROLES, getRoleConfig } from '../../../../utils/appRole'

export default function RiderSplash() {
  const navigate = useNavigate()
  const role = APP_ROLES.rider
  const roleConfig = getRoleConfig(role)
  const [phase, setPhase] = useState('intro')

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
        if (!cancelled) setPhase('brand')
      }, 1200)

      t2 = setTimeout(() => {
        if (!cancelled) navigate('/dispatch/welcome', { replace: true })
      }, 2400)
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #5B5BFF 0%, #4040E8 50%, #3535D4 100%)' }}>

      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-60 h-60 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />

      <div className="flex flex-col items-center gap-5 z-10">
        <div className="w-[88px] h-[88px] bg-white/20 backdrop-blur-sm rounded-[24px] flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
          <Logo variant="icon" height={40} className="brightness-0 invert" />
        </div>

        {phase === 'brand' ? (
          <div className="text-center animate-fade-in">
            <p className="text-white text-4xl tracking-tight leading-none">
              <span className="font-black">Rapid</span>
              <span className="font-light"> Rider</span>
            </p>
            <p className="text-white/60 text-[11px] font-bold tracking-[0.22em] uppercase mt-3">
              Deliver. Earn. Grow.
            </p>
          </div>
        ) : null}
      </div>

      <div className="absolute bottom-10 left-0 right-0 px-10 z-10">
        <div className="flex gap-2 mb-4">
          <div className={`h-1 flex-1 rounded-full ${phase === 'brand' ? 'bg-white' : 'bg-white/25'}`} />
          <div className="h-1 flex-1 rounded-full bg-white/25" />
        </div>
        <p className="text-white/40 text-[10px] font-bold tracking-[0.18em] uppercase text-center">
          Version 2.4.0 • Secure Connection
        </p>
      </div>

      <style>{`
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
