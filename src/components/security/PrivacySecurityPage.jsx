import { useEffect, useState } from 'react'
import { ArrowLeft, ShieldCheck, Mail, Smartphone, Fingerprint, KeyRound, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  SECURITY_METHODS,
  confirmTotp,
  disableBiometric,
  disableTotp,
  enableBiometric,
  getSecuritySettings,
  setupTotp,
  updateSecurityPreferences,
} from '../../services/securityService'
import {
  canUseBiometric,
  disableDeviceBiometricUnlock,
  enableDeviceBiometricUnlock,
} from '../../utils/biometricAuth'
import { setBiometricUnlockEnabled } from '../../utils/biometricSession'
import { detectAppRole, getRoleConfig } from '../../utils/appRole'

const ICONS = {
  email: Mail,
  totp: Smartphone,
  biometric: Fingerprint,
  pin: KeyRound,
}

function MethodOption({ method, selected, disabled, onSelect }) {
  const meta = SECURITY_METHODS[method]
  const Icon = ICONS[method] || ShieldCheck

  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(method)}
      disabled={disabled}
      className={`w-full text-left rounded-2xl border p-4 transition-all ${
        selected
          ? 'border-[#4F46E5] bg-indigo-50/60 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected ? 'bg-[#4F46E5] text-white' : 'bg-gray-100 text-gray-500'}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-gray-900">{meta.label}</p>
          <p className="text-[12px] text-gray-500 mt-0.5">{meta.description}</p>
        </div>
        {selected ? <CheckCircle2 size={18} className="text-[#4F46E5] mt-1" /> : null}
      </div>
    </button>
  )
}

function SecuritySection({ title, description, methods, value, onChange, disabledMethods = [] }) {
  return (
    <section className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-6">
      <h2 className="text-[16px] font-bold text-gray-900 mb-1">{title}</h2>
      <p className="text-[13px] text-gray-500 mb-4">{description}</p>
      <div className="flex flex-col gap-3">
        {methods.map((method) => (
          <MethodOption
            key={method}
            method={method}
            selected={value === method}
            disabled={disabledMethods.includes(method)}
            onSelect={onChange}
          />
        ))}
      </div>
    </section>
  )
}

export default function PrivacySecurityPage({
  role = detectAppRole(),
  accountUser = null,
  onUserSecurityUpdate,
  showTransactionSection = false,
  showOrderSection = false,
  surfaceClassName = 'bg-[#FAFAFA]',
}) {
  const navigate = useNavigate()
  const roleConfig = getRoleConfig(role)
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [totpSetup, setTotpSetup] = useState(null)
  const [totpCode, setTotpCode] = useState('')
  const [disableCode, setDisableCode] = useState('')
  const [biometricSupported, setBiometricSupported] = useState(false)
  const [biometricBusy, setBiometricBusy] = useState(false)

  useEffect(() => {
    canUseBiometric().then(setBiometricSupported)
  }, [])

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        setLoading(true)
        const data = await getSecuritySettings()
        if (active) setSettings(data)
      } catch (err) {
        if (active) setError(err?.message || 'Could not load security settings.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  const persistPreferences = async (next) => {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const data = await updateSecurityPreferences(next)
      setSettings(data)
      onUserSecurityUpdate?.(data)
      setMessage('Security preferences saved.')
    } catch (err) {
      setError(err?.message || 'Could not save security preferences.')
    } finally {
      setSaving(false)
    }
  }

  const handleLoginMethod = (method) => persistPreferences({ login_method: method })
  const handleTransactionMethod = (method) => persistPreferences({ transaction_method: method })
  const handleOrderMethod = (method) => persistPreferences({ order_method: method })

  const startTotpSetup = async () => {
    setError('')
    try {
      const data = await setupTotp()
      setTotpSetup(data)
      setTotpCode('')
    } catch (err) {
      setError(err?.message || 'Could not start authenticator setup.')
    }
  }

  const finishTotpSetup = async () => {
    try {
      const data = await confirmTotp(totpCode)
      setSettings(data)
      setTotpSetup(null)
      setTotpCode('')
      setMessage('Authenticator app connected.')
      onUserSecurityUpdate?.(data)
    } catch (err) {
      setError(err?.message || 'Could not verify authenticator code.')
    }
  }

  const removeTotp = async () => {
    try {
      const data = await disableTotp(disableCode)
      setSettings(data)
      setDisableCode('')
      setMessage('Authenticator app removed.')
      onUserSecurityUpdate?.(data)
    } catch (err) {
      setError(err?.message || 'Could not disable authenticator app.')
    }
  }

  const turnOnBiometric = async () => {
    if (biometricBusy) return

    setError('')
    setMessage('')
    setBiometricBusy(true)

    try {
      await enableDeviceBiometricUnlock(accountUser, role)
      const data = await enableBiometric('native')
      await setBiometricUnlockEnabled(true, role)
      setSettings(data)
      setMessage(`Biometric unlock enabled. You can unlock ${roleConfig.brandLabel} with fingerprint or face ID.`)
      onUserSecurityUpdate?.(data)
    } catch (err) {
      await disableDeviceBiometricUnlock(role).catch(() => {})
      await setBiometricUnlockEnabled(false, role).catch(() => {})
      setError(err?.message || 'Could not enable biometric unlock.')
    } finally {
      setBiometricBusy(false)
    }
  }

  const turnOffBiometric = async () => {
    if (biometricBusy) return

    setBiometricBusy(true)
    setError('')
    setMessage('')

    try {
      await disableDeviceBiometricUnlock(role)
      const data = await disableBiometric()
      await setBiometricUnlockEnabled(false, role)
      setSettings(data)
      setMessage('Biometric unlock disabled.')
      onUserSecurityUpdate?.(data)
    } catch (err) {
      setError(err?.message || 'Could not disable biometric unlock.')
    } finally {
      setBiometricBusy(false)
    }
  }

  const disabledForTotp = settings?.totp_enabled ? [] : ['totp']
  const disabledForBiometric = settings?.biometric_enabled ? [] : ['biometric']

  if (loading || !settings) {
    return (
      <div className={`flex min-h-screen items-center justify-center text-gray-500 ${surfaceClassName}`}>
        Loading security settings…
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen pb-24 md:pb-12 ${surfaceClassName}`}>
      <div className="px-5 md:px-8 pt-12 md:pt-8 pb-4 flex items-center gap-3 border-b border-gray-100 bg-inherit sticky top-0 z-20">
        <button type="button" onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 rounded-full">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="text-[18px] md:text-[22px] font-bold text-gray-900">Privacy & Security</h1>
          <p className="text-[12px] text-gray-500">Choose how you sign in and confirm sensitive actions.</p>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto px-5 md:px-8 py-6 flex flex-col gap-5">
        {message ? <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">{message}</p> : null}
        {error ? <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p> : null}

        <SecuritySection
          title="Login"
          description={`How you verify yourself when signing in to ${roleConfig.brandLabel}.`}
          methods={settings.available_methods.login}
          value={settings.login_method}
          onChange={handleLoginMethod}
          disabledMethods={[...disabledForTotp, ...disabledForBiometric]}
        />

        {showTransactionSection ? (
          <SecuritySection
            title="Transactions"
            description="How you confirm wallet transfers and payments."
            methods={settings.available_methods.transaction}
            value={settings.transaction_method}
            onChange={handleTransactionMethod}
            disabledMethods={[...disabledForTotp, ...disabledForBiometric]}
          />
        ) : null}

        {showOrderSection ? (
          <SecuritySection
            title="Orders"
            description="How you confirm food and grocery orders at checkout."
            methods={settings.available_methods.order}
            value={settings.order_method}
            onChange={handleOrderMethod}
            disabledMethods={[...disabledForTotp, ...disabledForBiometric]}
          />
        ) : null}

        <section className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
              <Smartphone size={18} />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-gray-900">Authenticator app</h2>
              <p className="text-[13px] text-gray-500">
                {settings.totp_enabled ? 'Connected and ready to use.' : 'Set up an app to generate 6-digit codes.'}
              </p>
            </div>
          </div>

          {!settings.totp_enabled && !totpSetup ? (
            <button type="button" onClick={startTotpSetup} className="w-full bg-[#4F46E5] text-white py-3.5 rounded-xl font-semibold">
              Set up authenticator app
            </button>
          ) : null}

          {totpSetup ? (
            <div className="space-y-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(totpSetup.otpauth_url)}`}
                alt="Authenticator QR code"
                className="mx-auto rounded-2xl border border-gray-100"
              />
              <p className="text-center text-[12px] text-gray-500 break-all">Manual key: {totpSetup.secret}</p>
              <input
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-center tracking-[0.4em] font-semibold"
              />
              <button type="button" onClick={finishTotpSetup} disabled={totpCode.length !== 6} className="w-full bg-[#4F46E5] text-white py-3.5 rounded-xl font-semibold disabled:opacity-50">
                Confirm authenticator
              </button>
            </div>
          ) : null}

          {settings.totp_enabled ? (
            <div className="space-y-3">
              <input
                value={disableCode}
                onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter code to remove authenticator"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-center tracking-[0.4em] font-semibold"
              />
              <button type="button" onClick={removeTotp} disabled={disableCode.length !== 6} className="w-full border border-red-200 text-red-600 py-3.5 rounded-xl font-semibold disabled:opacity-50">
                Remove authenticator app
              </button>
            </div>
          ) : null}
        </section>

        <section className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
              <Fingerprint size={18} />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-gray-900">Biometric unlock</h2>
              <p className="text-[13px] text-gray-500">
                {settings.biometric_enabled
                  ? 'Face ID, fingerprint, or device lock can confirm actions.'
                  : biometricSupported
                    ? 'Use your device biometrics for faster confirmation.'
                    : 'Biometric unlock is not available in this browser or device.'}
              </p>
            </div>
          </div>

          {!settings.biometric_enabled ? (
            <button
              type="button"
              onClick={turnOnBiometric}
              disabled={!biometricSupported || biometricBusy}
              className="w-full bg-[#4F46E5] text-white py-3.5 rounded-xl font-semibold disabled:opacity-50"
            >
              {biometricBusy ? 'Setting up biometrics…' : 'Enable biometric unlock'}
            </button>
          ) : (
            <button
              type="button"
              onClick={turnOffBiometric}
              disabled={biometricBusy}
              className="w-full border border-red-200 text-red-600 py-3.5 rounded-xl font-semibold disabled:opacity-50"
            >
              {biometricBusy ? 'Updating…' : 'Disable biometric unlock'}
            </button>
          )}
        </section>

        {saving ? <p className="text-center text-sm text-gray-500">Saving…</p> : null}
      </div>
    </div>
  )
}
