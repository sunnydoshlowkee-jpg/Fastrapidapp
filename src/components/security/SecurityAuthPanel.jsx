import { useEffect, useState } from 'react'
import { Delete } from 'lucide-react'
import { sendSecurityActionCode } from '../../services/securityService'

export default function SecurityAuthPanel({
  purpose,
  method,
  title = 'Authorize',
  subtitle,
  onCancel,
  onVerified,
  pinMode = false,
  hasExistingPin = false,
}) {
  // Client biometric is not a trusted API factor for money/order/login step-up.
  const effectiveMethod = method === 'biometric' ? 'email' : method
  const [code, setCode] = useState('')
  const [pin, setPin] = useState('')
  const [pendingPin, setPendingPin] = useState('')
  const [pinStep, setPinStep] = useState('create')
  const [hasPin, setHasPin] = useState(Boolean(hasExistingPin))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)

  useEffect(() => {
    setHasPin(Boolean(hasExistingPin))
  }, [hasExistingPin])

  useEffect(() => {
    if (effectiveMethod === 'email' && !codeSent) {
      setLoading(true)
      sendSecurityActionCode(purpose)
        .then(() => setCodeSent(true))
        .catch((err) => setError(err?.message || 'Could not send verification code.'))
        .finally(() => setLoading(false))
    }
  }, [effectiveMethod, purpose, codeSent])

  const handlePinPress = (val) => {
    if (val === 'delete') {
      setPin((prev) => prev.slice(0, -1))
    } else if (pin.length < 4) {
      setPin((prev) => prev + val)
    }
  }

  useEffect(() => {
    if (!pinMode || pin.length !== 4) return

    if (!hasPin && pinStep === 'create') {
      setPendingPin(pin)
      setPin('')
      setPinStep('confirm')
      return
    }

    if (!hasPin && pinStep === 'confirm') {
      if (pin !== pendingPin) {
        setError('PINs do not match. Try again.')
        setPin('')
        setPendingPin('')
        setPinStep('create')
        return
      }
      onVerified({ pin })
      return
    }

    onVerified({ pin })
  }, [pin, pinMode, pinStep, pendingPin, hasPin, onVerified])

  const submitCode = async () => {
    if (code.length !== 6 || loading) return
    setError('')
    setLoading(true)
    try {
      await onVerified({ auth_code: code })
    } catch (err) {
      setError(err?.message || 'Verification failed.')
    } finally {
      setLoading(false)
    }
  }

  if (pinMode || effectiveMethod === 'pin') {
    return (
      <div className="px-5 py-8">
        <h2 className="text-[20px] font-bold text-gray-900 mb-1 text-center">{title}</h2>
        {subtitle ? <p className="text-[13px] text-gray-500 mb-8 text-center">{subtitle}</p> : null}
        {!hasPin && pinStep === 'create' ? (
          <p className="text-xs text-gray-500 mb-6 text-center">Create a 4-digit PIN to secure future transfers.</p>
        ) : null}
        {!hasPin && pinStep === 'confirm' ? (
          <p className="text-xs text-gray-500 mb-6 text-center">Confirm your 4-digit PIN.</p>
        ) : null}
        {hasPin ? (
          <p className="text-xs text-gray-500 mb-6 text-center">Enter your 4-digit PIN to authorize this transfer.</p>
        ) : null}
        {error ? <p className="mb-4 text-sm text-red-600 text-center">{error}</p> : null}
        <div className="flex gap-4 mb-10 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${i < pin.length ? 'bg-[#4F46E5] scale-110' : 'bg-gray-200'}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '#', 0, 'delete'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => key !== '#' && handlePinPress(key === 'delete' ? 'delete' : String(key))}
              className={`h-14 rounded-xl flex items-center justify-center text-[22px] font-semibold ${
                key === 'delete' ? 'text-red-500' : key === '#' ? 'text-gray-300 pointer-events-none' : 'text-gray-900'
              }`}
            >
              {key === 'delete' ? <Delete size={24} className="text-red-400" /> : key}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 py-8">
      <h2 className="text-[20px] font-bold text-gray-900 mb-1 text-center">{title}</h2>
      <p className="text-[13px] text-gray-500 mb-6 text-center">
        {effectiveMethod === 'email'
          ? (codeSent ? 'Enter the 6-digit code sent to your email.' : 'Sending verification code…')
          : 'Enter the 6-digit code from your authenticator app.'}
      </p>
      {subtitle ? <p className="text-[13px] text-gray-500 mb-4 text-center">{subtitle}</p> : null}
      {error ? <p className="mb-4 text-sm text-red-600 text-center">{error}</p> : null}
      <input
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        placeholder="000000"
        className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center tracking-[0.5em] text-lg font-semibold mb-4"
      />
      <button
        type="button"
        onClick={submitCode}
        disabled={code.length !== 6 || loading}
        className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-bold disabled:opacity-50"
      >
        {loading ? 'Processing…' : 'Continue'}
      </button>
      <button type="button" onClick={onCancel} className="w-full mt-3 text-sm font-semibold text-gray-500 py-2">
        Cancel
      </button>
    </div>
  )
}
