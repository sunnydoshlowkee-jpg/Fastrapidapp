import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { verifyPhoneOtp } from '../../../../services/authService'
import { getApiFieldError } from '../../../../utils/apiErrors'

const OTP_LENGTH = 4

function formatPhoneDisplay(phoneE164, nationalPhone) {
  if (phoneE164) {
    const digits = phoneE164.replace(/\D/g, '')
    if (digits.length >= 13 && digits.startsWith('234')) {
      const local = digits.slice(3)
      return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
    }
    return phoneE164
  }
  if (nationalPhone) {
    const local = nationalPhone.replace(/\D/g, '')
    if (local.length === 10) {
      return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
    }
    return `+234 ${nationalPhone}`
  }
  return ''
}

export default function VerifyIdentity() {
  const navigate = useNavigate()
  const location = useLocation()
  const phoneE164 = location.state?.phoneE164
  const nationalPhone = location.state?.phone
  const flow = location.state?.flow ?? 'login'

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(''))
  const [codeError, setCodeError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(45)

  useEffect(() => {
    if (!phoneE164) {
      navigate('/auth/login', { replace: true })
    }
  }, [phoneE164, navigate])

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  const handleInput = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const newCode = [...code]
    newCode[index] = digit
    setCode(newCode)
    if (codeError) setCodeError('')

    if (digit && index < OTP_LENGTH - 1) {
      const nextInput = document.getElementById(`verify-otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`verify-otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleVerify = async () => {
    setCodeError('')

    const otp = code.join('')
    if (otp.length === 0) {
      setCodeError('Enter the verification code.')
      return
    }
    if (otp.length < OTP_LENGTH) {
      setCodeError(`Enter the ${OTP_LENGTH}-digit verification code.`)
      return
    }

    if (!phoneE164) {
      navigate('/auth/login', { replace: true })
      return
    }

    setLoading(true)
    try {
      const { data } = await verifyPhoneOtp({
        phone_e164: phoneE164,
        code: otp,
        flow,
      })
      const token = data?.data?.token
      const user = data?.data?.user
      if (token) {
        localStorage.setItem('rapid_token', token)
      }

      if (user?.status === 'pending_profile') {
        navigate('/onboarding/profile', { state: { phoneE164, phone: nationalPhone } })
        return
      }

      navigate('/app')
    } catch (err) {
      setCodeError(getApiFieldError(err, 'code') || getApiFieldError(err, 'phone'))
    } finally {
      setLoading(false)
    }
  }

  const displayPhone = formatPhoneDisplay(phoneE164, nationalPhone)

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <div className="flex-1 flex flex-col items-center px-6 max-w-md mx-auto w-full pt-16">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center w-full">Verify Your Identity</h1>
        <p className="text-gray-600 text-base text-center mb-10 px-4">
          We&apos;ve sent a 4-digit code to{' '}
          <span className="font-semibold text-gray-900">{displayPhone || 'your number'}</span>.{' '}
          <button type="button" onClick={() => navigate('/auth/login')} className="text-[#4F46E5] font-semibold">Edit</button>
        </p>

        <div className="flex gap-4 justify-center mb-2 w-full">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`verify-otp-${idx}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              aria-label={`Digit ${idx + 1} of ${OTP_LENGTH}`}
              className={`w-16 h-16 text-center text-2xl font-bold rounded-2xl outline-none transition-colors ${
                codeError
                  ? 'border-2 border-red-500 bg-red-50/30'
                  : digit
                    ? 'border border-[#4F46E5] bg-indigo-50/30 text-gray-900'
                    : 'bg-[#F4F5F7] border border-transparent focus:border-[#4F46E5]'
              }`}
            />
          ))}
        </div>
        {codeError ? (
          <p className="text-center text-sm font-medium text-red-600 mb-6" role="alert">
            {codeError}
          </p>
        ) : (
          <div className="mb-6" />
        )}

        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2">
            Didn&apos;t get a code? <button type="button" className="text-[#4F46E5]">Resend link</button>
          </p>
          <p className="text-xs text-gray-400">
            Resend code in 0:{timer.toString().padStart(2, '0')}
          </p>
        </div>

        <div className="mt-auto w-full pb-8">
          <button 
            type="button"
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#4F46E5] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-base uppercase tracking-wider shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700"
          >
            {loading ? 'Verifying…' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  )
}
