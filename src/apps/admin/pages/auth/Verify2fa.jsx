import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminTwoFactorShell from '../../../../components/admin/auth/AdminTwoFactorShell'
import AdminOtpInput from '../../../../components/admin/auth/AdminOtpInput'
import AdminVerifyButton from '../../../../components/admin/auth/AdminVerifyButton'
import {
  adminResend2fa,
  adminVerify2fa,
  clearAdminPendingSession,
  getAdminPendingSession,
} from '../../../../services/adminAuthService'
import {
  ADMIN_2FA_COPY,
  ADMIN_LOGIN_PATH,
} from '../../../../services/data/adminAuth.mock'

function formatCountdown(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function AdminVerify2fa() {
  const navigate = useNavigate()
  const copy = ADMIN_2FA_COPY

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(copy.resendCooldownSeconds)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (!getAdminPendingSession()) {
      navigate(ADMIN_LOGIN_PATH, { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    if (resendSeconds <= 0) return undefined
    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [resendSeconds])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (code.length !== 6) {
      setError('Enter the 6-digit code.')
      return
    }

    setLoading(true)
    try {
      await adminVerify2fa({ code })
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || copy.invalidCodeMessage)
      if (err.code === 'SESSION_EXPIRED') {
        navigate(ADMIN_LOGIN_PATH, { replace: true })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendSeconds > 0 || resending) return
    setResending(true)
    setError('')
    try {
      await adminResend2fa()
      setCode('')
      setResendSeconds(copy.resendCooldownSeconds)
    } catch (err) {
      setError(err.message || 'Unable to resend code.')
      if (err.message?.includes('expired')) {
        navigate(ADMIN_LOGIN_PATH, { replace: true })
      }
    } finally {
      setResending(false)
    }
  }

  const handleBack = () => {
    clearAdminPendingSession()
    navigate(ADMIN_LOGIN_PATH)
  }

  return (
    <AdminTwoFactorShell>
      <header className="mb-8 w-full text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{copy.title}</h1>
        <p className="mt-2 text-sm text-gray-500">{copy.subtitle}</p>
      </header>

      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-6">
        <div className="w-full">
          <p id="admin-otp-label" className="sr-only">
            {copy.title}
          </p>
          <AdminOtpInput
            id="admin-2fa"
            value={code}
            onChange={(val) => {
              setCode(val)
              if (error) setError('')
            }}
          />
          {error ? (
            <p className="mt-3 text-center text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <AdminVerifyButton disabled={loading || code.length < 6}>
          {loading ? 'Verifying…' : copy.verifyLabel}
        </AdminVerifyButton>

        <p className="text-center text-sm text-gray-500">
          {copy.resendPrefix}{' '}
          {resendSeconds > 0 ? (
            <span className="font-medium text-[#A84A18]">
              {copy.resendCountdownPrefix} {formatCountdown(resendSeconds)}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-medium text-[#A84A18] underline decoration-[#A84A18]/40 underline-offset-2 hover:text-[#FF6B2C] disabled:opacity-60"
            >
              {resending ? 'Sending…' : copy.resendAction}
            </button>
          )}
        </p>
      </form>

      <button
        type="button"
        onClick={handleBack}
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        {copy.backToLogin}
      </button>
    </AdminTwoFactorShell>
  )
}
