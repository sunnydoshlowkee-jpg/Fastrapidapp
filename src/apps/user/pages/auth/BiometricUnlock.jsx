import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Fingerprint } from 'lucide-react'
import { Capacitor } from '@capacitor/core'
import Logo from '../../../../components/brand/Logo'
import { useAuth } from '../../../../context/AuthContext'
import {
  enableDeviceBiometricUnlock,
  unlockWithBiometric,
} from '../../../../utils/biometricAuth'
import {
  hasAuthToken,
  isBiometricUnlockEnabled,
  setBiometricUnlockEnabled,
} from '../../../../utils/biometricSession'
import { detectAppRole, getRoleConfig } from '../../../../utils/appRole'
import { refreshRiderSession } from '../../../../services/riderAuthService'
import { clearAllMerchantAccounts } from '../../../../services/merchantAccountStore'
import { clearMerchantSession } from '../../../../services/merchantAuthService'
import { getMe } from '../../../../services/authService'
import {
  isLoginSecurityVerified,
  isNativeApp,
  markLoginSecurityVerified,
  resolveUserLoginSecurity,
} from '../../../../utils/userLoginSecurity'
import BrandedLoader from '../../../../components/ui/BrandedLoader'

export default function BiometricUnlock({ onUnlocked, inline = false, role: roleProp }) {
  const navigate = useNavigate()
  const location = useLocation()
  const role = roleProp || detectAppRole()
  const roleConfig = getRoleConfig(role)
  const { user, logout, refreshUser, setUser } = useAuth()
  const [profileName, setProfileName] = useState(user?.first_name || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [preparing, setPreparing] = useState(true)
  const autoAttemptedRef = useRef(false)

  const setupDevice = Boolean(location.state?.setupDevice)
  const fromLogin = Boolean(location.state?.fromLogin)

  // Browsers cannot use native biometric unlock — redirect before showing this screen.
  useLayoutEffect(() => {
    if (isNativeApp()) return

    if (!hasAuthToken(role)) {
      navigate(roleConfig.loginPath, { replace: true })
      return
    }

    if (role === 'user' && !isLoginSecurityVerified()) {
      navigate('/auth/login-security', {
        replace: true,
        state: { method: 'email' },
      })
      return
    }

    navigate(roleConfig.homePath, { replace: true })
  }, [navigate, role, roleConfig.homePath, roleConfig.loginPath])

  useEffect(() => {
    if (role !== 'user') {
      if (role === 'rider') {
        refreshRiderSession()
          .then((profile) => setProfileName(profile?.user?.first_name || ''))
          .catch(() => {})
        return
      }

      try {
        const stored = localStorage.getItem('rapid_merchant_user')
        if (stored) {
          const merchantUser = JSON.parse(stored)
          setProfileName(merchantUser?.first_name || '')
        }
      } catch {
        // Ignore invalid stored merchant session.
      }
    }
  }, [role])

  const finishUnlock = useCallback(async () => {
    if (role === 'user') {
      const fresh = await refreshUser({ background: Boolean(user) }).catch(() => user)
      const security = resolveUserLoginSecurity(fresh || user)

      // Authenticator is the login method — biometric must not skip TOTP.
      if (security.method === 'totp' && security.totpEnabled && !isLoginSecurityVerified()) {
        navigate('/auth/login-security', {
          replace: true,
          state: { method: 'totp' },
        })
        return
      }

      markLoginSecurityVerified()
    } else if (role === 'rider') {
      await refreshRiderSession().catch(() => {})
    }

    if (onUnlocked) {
      onUnlocked()
      return
    }

    navigate(roleConfig.homePath, { replace: true })
  }, [navigate, onUnlocked, refreshUser, role, roleConfig.homePath, user])

  const attemptUnlock = useCallback(async ({ reenroll = false } = {}) => {
    if (!hasAuthToken(role)) {
      navigate(roleConfig.loginPath, { replace: true })
      return
    }

    setLoading(true)
    setError('')

    try {
      await unlockWithBiometric(`Unlock ${roleConfig.brandLabel} with your biometrics`, role)

      if (reenroll && role === 'user') {
        const currentUser = user || (await getMe().then((res) => res?.data?.data?.user).catch(() => null))
        if (currentUser) {
          await enableDeviceBiometricUnlock(currentUser, role)
          if (setUser) setUser(currentUser)
        }
        await setBiometricUnlockEnabled(true, role)
      }

      await finishUnlock()
    } catch (err) {
      if (err?.message?.toLowerCase().includes('cancel')) {
        setError('Biometric unlock was cancelled.')
      } else {
        setError(err?.message || 'Biometric unlock failed. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [finishUnlock, navigate, role, roleConfig.brandLabel, roleConfig.loginPath, setUser, user])

  useEffect(() => {
    if (autoAttemptedRef.current) return undefined
    autoAttemptedRef.current = true

    let active = true

    const prepare = async () => {
      if (!isNativeApp()) return

      if (!hasAuthToken(role)) {
        navigate(roleConfig.loginPath, { replace: true })
        return
      }

      let localEnabled = await isBiometricUnlockEnabled(role)
      let serverRequires = setupDevice || fromLogin

      if (role === 'user' && Capacitor.isNativePlatform()) {
        try {
          // Never let a slow /me response hold the unlock screen hostage —
          // the local biometric flag is enough to proceed with unlocking.
          const meUser = await Promise.race([
            getMe().then((res) => res?.data?.data?.user),
            new Promise((resolve) => setTimeout(() => resolve(undefined), 2500)),
          ])
          if (!active) return
          if (meUser && setUser) setUser(meUser)
          if (meUser?.first_name) setProfileName(meUser.first_name)
          const security = resolveUserLoginSecurity(meUser)
          serverRequires = serverRequires || security.biometricEnabled
        } catch {
          // Keep local decision if /me fails.
        }
      }

      if (Capacitor.isNativePlatform()) {
        if (!localEnabled && !serverRequires) {
          navigate(roleConfig.homePath, { replace: true })
          return
        }
      }

      if (!active) return
      setPreparing(false)
      attemptUnlock({ reenroll: !localEnabled && serverRequires })
    }

    prepare()

    return () => {
      active = false
      // Allow React StrictMode dev double-invoke to retry; the first run is
      // cancelled via `active` before it can show the native prompt.
      autoAttemptedRef.current = false
    }
    // Only ever auto-attempt once per mount. The callback identity of
    // `attemptUnlock` changes when the user/profile state refreshes, and
    // re-running this effect would re-trigger the native biometric prompt
    // (rapid flicker) or keep the screen stuck on the loading state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromLogin, navigate, role, roleConfig.homePath, roleConfig.loginPath, setupDevice])

  const handleUseAnotherAccount = async () => {
    await setBiometricUnlockEnabled(false, role)

    if (role === 'user') {
      await logout()
    } else if (role === 'rider') {
      localStorage.removeItem('rider_token')
      localStorage.removeItem('rider_user')
      localStorage.removeItem('rapid_token')
    } else {
      clearAllMerchantAccounts()
      clearMerchantSession()
    }

    navigate(roleConfig.loginPath, { replace: true })
  }

  const greetingName = role === 'user' ? user?.first_name || profileName : profileName

  if (preparing) {
    return (
      <div className={`${inline ? 'min-h-0' : 'min-h-screen'} flex items-center justify-center bg-[#FAFAFA]`}>
        <BrandedLoader size="md" />
      </div>
    )
  }

  return (
    <div className={`${inline ? 'min-h-0' : 'min-h-screen'} flex flex-col items-center justify-center bg-[#FAFAFA] px-6 py-10`}>
      <div className="w-full max-w-sm text-center">
        <div className="mb-8 flex justify-center">
          <Logo height={42} />
        </div>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
          <Fingerprint size={30} />
        </div>

        <h1 className="text-[22px] font-bold text-gray-900 mb-2">
          {greetingName ? `Welcome back, ${greetingName}` : 'Welcome back'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Unlock {roleConfig.brandLabel} with your fingerprint or face.
        </p>

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

        <button
          type="button"
          disabled={loading}
          onClick={() => attemptUnlock({ reenroll: setupDevice })}
          className="w-full rounded-2xl bg-[#4F46E5] py-4 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? 'Waiting…' : 'Unlock with biometrics'}
        </button>

        <button
          type="button"
          onClick={handleUseAnotherAccount}
          className="mt-4 text-sm font-semibold text-gray-500"
        >
          Use another account
        </button>
      </div>
    </div>
  )
}
