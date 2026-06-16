import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { requestEmailOtp, verifyEmailOtp } from '../../../../services/authService'
import { getApiFieldError } from '../../../../utils/apiErrors'

const OTP_LENGTH = 6

export default function EmailVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const flow = location.state?.flow ?? 'login'
  const isRegister = flow === 'register'
  const backPath = isRegister ? '/onboarding/email' : '/auth/login/email'

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(''))
  const [codeError, setCodeError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer] = useState(45)

  useEffect(() => {
    if (!email) {
      navigate(backPath, { replace: true })
    }
  }, [email, backPath, navigate])

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
      const nextInput = document.getElementById(`email-verify-otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`email-verify-otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleResend = async () => {
    if (timer > 0 || !email || resending) return

    setResending(true)
    setCodeError('')
    try {
      await requestEmailOtp({ email, flow })
      setTimer(45)
      setCode(Array(OTP_LENGTH).fill(''))
    } catch (err) {
      setCodeError(getApiFieldError(err, 'email'))
    } finally {
      setResending(false)
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

    if (!email) {
      navigate(backPath, { replace: true })
      return
    }

    setLoading(true)
    try {
      const { data } = await verifyEmailOtp({ email, code: otp, flow })
      const token = data?.data?.token
      const user = data?.data?.user

      if (token) {
        localStorage.setItem('rapid_token', token)
      }

      if (user?.status === 'pending_profile') {
        navigate('/onboarding/profile', { state: { signupMethod: 'email' } })
        return
      }

      navigate('/app')
    } catch (err) {
      setCodeError(getApiFieldError(err, 'code') || getApiFieldError(err, 'email'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center px-6 max-w-md mx-auto w-full pt-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center w-full">Check your email</h1>
        <p className="text-gray-600 text-base text-center mb-10 px-4">
          We&apos;ve sent a 6-digit verification code to{' '}
          <span className="font-semibold text-gray-900">{email}</span>.{' '}
          <button
            type="button"
            onClick={() => navigate(backPath)}
            className="text-[#4F46E5] font-semibold"
          >
            Edit
          </button>
        </p>

        <div className="flex gap-2 sm:gap-3 justify-center mb-2 w-full flex-wrap">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`email-verify-otp-${idx}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              aria-label={`Digit ${idx + 1} of ${OTP_LENGTH}`}
              className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-2xl outline-none transition-colors ${
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
            Didn&apos;t get a code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={timer > 0 || resending}
              className="text-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? 'Sending…' : 'Resend code'}
            </button>
          </p>
          {timer > 0 ? (
            <p className="text-xs text-gray-400">
              Resend code in 0:{timer.toString().padStart(2, '0')}
            </p>
          ) : null}
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
