import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import {
  adminResend2fa,
  adminVerify2fa,
  getAdminPendingSession,
} from '../../../../services/adminAuthService'
import {
  ADMIN_2FA_COPY,
  ADMIN_2FA_OTP,
  ADMIN_LOGIN_PATH,
} from '../../../../services/data/adminAuth.mock'

const CODE_LENGTH = 6
const RESEND_SECONDS = ADMIN_2FA_COPY.resendCooldownSeconds

function formatCountdown(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

export default function AdminVerify2fa() {
  const navigate = useNavigate()
  const copy = ADMIN_2FA_COPY
  const [digits, setDigits] = useState(() => Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputsRef = useRef([])

  useEffect(() => {
    if (!getAdminPendingSession()) {
      navigate(ADMIN_LOGIN_PATH, { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    if (secondsLeft <= 0) return undefined
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [secondsLeft])

  const code = useMemo(() => digits.join(''), [digits])
  const canResend = secondsLeft === 0

  const focusInput = (index) => {
    const target = inputsRef.current[index]
    if (target) target.focus()
  }

  const handleChange = (index, raw) => {
    const value = raw.replace(/\D/g, '')
    if (!value) {
      setDigits((prev) => {
        const next = [...prev]
        next[index] = ''
        return next
      })
      return
    }
    if (value.length > 1) {
      const chars = value.slice(0, CODE_LENGTH - index).split('')
      setDigits((prev) => {
        const next = [...prev]
        chars.forEach((c, i) => {
          next[index + i] = c
        })
        return next
      })
      const nextFocus = Math.min(index + chars.length, CODE_LENGTH - 1)
      focusInput(nextFocus)
      return
    }
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
    if (index < CODE_LENGTH - 1) focusInput(index + 1)
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault()
      focusInput(index - 1)
      setDigits((prev) => {
        const next = [...prev]
        next[index - 1] = ''
        return next
      })
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      focusInput(index - 1)
    } else if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      event.preventDefault()
      focusInput(index + 1)
    }
  }

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return
    event.preventDefault()
    const chars = pasted.slice(0, CODE_LENGTH).split('')
    setDigits((prev) => {
      const next = [...prev]
      chars.forEach((c, i) => {
        next[i] = c
      })
      return next
    })
    focusInput(Math.min(chars.length, CODE_LENGTH - 1))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (code.length !== CODE_LENGTH) {
      setError('Please enter all 6 digits.')
      return
    }

    setLoading(true)
    try {
      await adminVerify2fa({ code })
      navigate('/admin', { replace: true })
    } catch (err) {
      if (err.code === 'SESSION_EXPIRED') {
        navigate('/admin/session-expired', { replace: true })
        return
      }
      setError(
        err.code === 'INVALID_OTP'
          ? copy.invalidCodeMessage
          : err.message || copy.invalidCodeMessage,
      )
      setDigits(Array(CODE_LENGTH).fill(''))
      focusInput(0)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return
    try {
      await adminResend2fa()
      setDigits(Array(CODE_LENGTH).fill(''))
      setError('')
      setSecondsLeft(RESEND_SECONDS)
      focusInput(0)
    } catch (err) {
      if (err.message?.includes('Session expired')) {
        navigate('/admin/session-expired', { replace: true })
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F6F8] px-4 py-10 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0px_8px_40px_0px_rgba(25,28,29,0.08)] sm:p-8">
        <div className="flex justify-center">
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <ShieldCheck size={24} className="text-[#C4590E]" strokeWidth={2} aria-hidden />
            <span
              className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-violet-500 ring-2 ring-white"
              aria-hidden
            />
          </span>
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold tracking-tight text-gray-900">
          {copy.title}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">{copy.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6" noValidate>
          {error ? (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-700"
            >
              {error}
            </div>
          ) : null}

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {digits.map((digit, index) => (
              <div key={index} className="flex items-center">
                <input
                  ref={(el) => {
                    inputsRef.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={CODE_LENGTH}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  aria-label={`Digit ${index + 1}`}
                  className="h-14 w-12 rounded-lg bg-gray-100 text-center text-2xl font-bold text-gray-800 outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-rapid-orange/40 sm:h-16 sm:w-14"
                />
                {index === 2 ? (
                  <span className="mx-1 text-2xl font-bold text-gray-300 sm:mx-2" aria-hidden>
                    –
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-md shadow-rapid-orange/25 transition-opacity hover:opacity-95 disabled:opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #FF6B30 0%, #FF5A1F 100%)',
            }}
          >
            {loading ? 'Verifying…' : 'Verify'}
          </button>

          <p className="mt-5 text-center text-sm text-gray-600">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-rapid-orange hover:text-[#E84A15]"
              >
                Resend now
              </button>
            ) : (
              <>
                Resend in{' '}
                <span className="font-bold text-violet-600">
                  {formatCountdown(secondsLeft)}
                </span>
              </>
            )}
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            to={ADMIN_LOGIN_PATH}
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden />
            {copy.backToLogin}
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          {import.meta.env.VITE_ADMIN_2FA_STRICT === 'true' ? (
            <>
              Enter the code sent to your email, or demo code{' '}
              <span className="text-gray-500">{ADMIN_2FA_OTP}</span>
            </>
          ) : (
            <>Demo mode: enter any 6-digit code (e.g. {ADMIN_2FA_OTP})</>
          )}
        </p>
      </div>
    </div>
  )
}
