import { useEffect, useState } from 'react'
import { ArrowRight, MailCheck, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MerchantButton from '../auth/MerchantButton'
import MerchantOtpInput from '../auth/MerchantOtpInput'
import { MERCHANT_REGISTRATION_PATH } from '../../../services/data/merchantRegistration.mock'
import { MERCHANT_EMAIL_VERIFICATION } from '../../../services/data/merchantEmailVerification.mock'
import { merchantRedirectPath } from '../../../services/merchantOnboardingService'
import {
  merchantResendSignupCode,
  merchantVerifySignupEmail,
} from '../../../services/merchantRegistrationService'

function formatCountdown(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function MerchantEmailVerifyCard({ email, copy = MERCHANT_EMAIL_VERIFICATION }) {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(copy.resendSeconds)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (seconds <= 0) return undefined
    const timer = window.setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [seconds])

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')

    if (code.length !== 6) {
      setError('Enter the 6-digit verification code.')
      return
    }

    setLoading(true)
    try {
      const result = await merchantVerifySignupEmail({ email, code })
      navigate(merchantRedirectPath(result.onboarding) || result.redirectPath, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to verify email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (seconds > 0 || resending) return

    setResending(true)
    setError('')
    try {
      await merchantResendSignupCode(email)
      setCode('')
      setSeconds(copy.resendSeconds)
    } catch (err) {
      setError(err.message || 'Unable to resend code.')
    } finally {
      setResending(false)
    }
  }

  return (
    <article className="w-full max-w-[440px] rounded-2xl bg-merchant-surface px-5 py-8 shadow-merchant-stat md:rounded-lg md:px-10 md:py-10 md:shadow-merchant-card">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-merchant-nav-active text-merchant-primary md:h-12 md:w-12 md:rounded-xl">
          <MailCheck size={24} strokeWidth={1.75} aria-hidden />
        </span>
        <h1 className="mt-5 text-xl font-bold tracking-[-0.02em] text-merchant-ink md:text-2xl">
          {copy.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-merchant-body md:text-base">
          {copy.sentPrefix}{' '}
          <span className="font-semibold text-merchant-ink">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="mt-8 flex flex-col gap-5 md:gap-6">
        <div className="w-full">
          <MerchantOtpInput
            id="merchant-signup-otp"
            length={6}
            value={code}
            onChange={(val) => {
              setCode(val)
              if (error) setError('')
            }}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-merchant-error">
            {error}
          </p>
        )}

        <p className="text-center text-sm text-merchant-body">
          {copy.resendPrompt}{' '}
          {seconds > 0 ? (
            <span className="font-semibold text-merchant-primary">
              {copy.resendCountdownPrefix} {formatCountdown(seconds)}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-semibold text-merchant-primary hover:text-merchant-link disabled:opacity-60"
            >
              {resending ? 'Sending…' : copy.resendLabel}
            </button>
          )}
        </p>

        <MerchantButton
          type="submit"
          disabled={loading}
          className="gap-2 shadow-[0px_8px_24px_0px_rgba(67,66,255,0.25)]"
        >
          {loading ? 'Verifying…' : copy.verifyLabel}
          {!loading && <ArrowRight size={18} strokeWidth={2} aria-hidden />}
        </MerchantButton>

        <button
          type="button"
          onClick={() => navigate(MERCHANT_REGISTRATION_PATH)}
          className="w-full rounded-lg bg-merchant-input py-4 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile md:text-base"
        >
          {copy.changeEmailLabel}
        </button>
      </form>

      <footer className="mt-6 flex items-center justify-center gap-2 border-t border-merchant-divider pt-5 md:mt-8 md:pt-6">
        <Shield size={14} className="text-merchant-muted" strokeWidth={1.75} aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
          {copy.securityLabel}
        </span>
      </footer>
    </article>
  )
}
