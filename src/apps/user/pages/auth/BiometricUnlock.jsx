import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fingerprint } from 'lucide-react'
import { Capacitor } from '@capacitor/core'
import Logo from '../../../../components/brand/Logo'
import { useAuth } from '../../../../context/AuthContext'
import { unlockWithBiometric } from '../../../../utils/biometricAuth'
import { hasAuthToken, isBiometricUnlockEnabled, setBiometricUnlockEnabled } from '../../../../utils/biometricSession'
import { detectAppRole, getRoleConfig } from '../../../../utils/appRole'
import { refreshRiderSession } from '../../../../services/riderAuthService'
import { clearMerchantSession } from '../../../../services/merchantAuthService'

export default function BiometricUnlock({ onUnlocked, inline = false, role: roleProp }) {
  const navigate = useNavigate()
  const role = roleProp || detectAppRole()
  const roleConfig = getRoleConfig(role)
  const { user, logout, refreshUser } = useAuth()
  const [profileName, setProfileName] = useState(user?.first_name || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      await refreshUser({ background: Boolean(user) })
    } else if (role === 'rider') {
      await refreshRiderSession().catch(() => {})
    }

    if (onUnlocked) {
      onUnlocked()
      return
    }

    navigate(roleConfig.homePath, { replace: true })
  }, [navigate, onUnlocked, refreshUser, role, roleConfig.homePath, user])

  const attemptUnlock = useCallback(async () => {
    if (!hasAuthToken(role)) {
      navigate(roleConfig.loginPath, { replace: true })
      return
    }

    setLoading(true)
    setError('')

    try {
      await unlockWithBiometric(`Unlock ${roleConfig.brandLabel} with your biometrics`, role)
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
  }, [finishUnlock, navigate, role, roleConfig.brandLabel, roleConfig.loginPath])

  useEffect(() => {
    let active = true

    const prepare = async () => {
      if (!hasAuthToken(role)) {
        navigate(roleConfig.loginPath, { replace: true })
        return
      }

      if (Capacitor.isNativePlatform()) {
        const enabled = await isBiometricUnlockEnabled(role)
        if (!enabled) {
          navigate(roleConfig.homePath, { replace: true })
          return
        }
      }

      if (active) {
        attemptUnlock()
      }
    }

    prepare()

    return () => {
      active = false
    }
  }, [attemptUnlock, navigate, role, roleConfig.homePath, roleConfig.loginPath])

  const handleUseAnotherAccount = async () => {
    await setBiometricUnlockEnabled(false, role)

    if (role === 'user') {
      await logout()
    } else if (role === 'rider') {
      localStorage.removeItem('rider_token')
      localStorage.removeItem('rider_user')
      localStorage.removeItem('rapid_token')
    } else {
      clearMerchantSession()
    }

    navigate(roleConfig.loginPath, { replace: true })
  }

  const greetingName = role === 'user' ? user?.first_name : profileName

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
          {inline ? 'Confirm it’s you' : 'Welcome back'}
        </h1>
        <p className="text-[14px] text-gray-500 mb-8">
          {greetingName
            ? `Hi ${greetingName}, use your fingerprint or face to continue.`
            : `Use your fingerprint or face to unlock ${roleConfig.brandLabel}.`}
        </p>

        {error ? (
          <p className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={attemptUnlock}
          disabled={loading}
          className="w-full rounded-xl bg-[#4F46E5] py-4 text-[15px] font-bold text-white shadow-lg shadow-indigo-200 disabled:opacity-70"
        >
          {loading ? 'Waiting for biometrics…' : 'Unlock with biometrics'}
        </button>

        <button
          type="button"
          onClick={handleUseAnotherAccount}
          className="mt-4 text-[14px] font-semibold text-gray-500"
        >
          Use another account
        </button>
      </div>
    </div>
  )
}
