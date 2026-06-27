import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import MerchantAuthShell from '../../../../components/merchant/auth/MerchantAuthShell'
import MerchantAuthCard from '../../../../components/merchant/auth/MerchantAuthCard'
import MerchantAuthField from '../../../../components/merchant/auth/MerchantAuthField'
import MerchantOtpInput from '../../../../components/merchant/auth/MerchantOtpInput'
import MerchantButton from '../../../../components/merchant/auth/MerchantButton'
import {
  getMerchantResetEmail,
  merchantResendResetCode,
  merchantResetPassword,
} from '../../../../services/merchantAuthService'

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const emailParam = searchParams.get('email') || ''
  const email = emailParam || getMerchantResetEmail()

  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [debugOtp, setDebugOtp] = useState(location.state?.debugOtp || '')

  useEffect(() => {
    if (!email) {
      navigate('/merchant/forgot-password', { replace: true })
    }
  }, [email, navigate])

  const validate = () => {
    const next = {}
    if (code.length !== 6) next.code = 'Enter the 6-digit verification code.'
    if (!newPassword) next.newPassword = 'New password is required.'
    if (!confirmPassword) next.confirmPassword = 'Confirm your new password.'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResendMessage('')
    if (!validate()) return

    setLoading(true)
    try {
      await merchantResetPassword({ email, code, newPassword, confirmPassword })
      navigate('/merchant/login', {
        replace: true,
        state: { message: 'Password reset successful. Sign in with your new password.' },
      })
    } catch (err) {
      const message = err.message || 'Unable to reset password. Please try again.'
      setError(message)
      if (err.code === 'INVALID_OTP') {
        setFieldErrors((prev) => ({ ...prev, code: message }))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setResendMessage('')
    setError('')
    try {
      const result = await merchantResendResetCode(email)
      setResendMessage(result.message)
      if (result.debugOtp) setDebugOtp(result.debugOtp)
      setCode('')
    } catch (err) {
      setError(err.message || 'Unable to resend code.')
    } finally {
      setResending(false)
    }
  }

  if (!email) return null

  return (
    <MerchantAuthShell footerVariant="minimal" withGradient>
      <MerchantAuthCard bordered>
        <header className="flex flex-col gap-3 text-left md:gap-4">
          <h1 className="text-xl font-semibold leading-[25px] tracking-[-0.02em] text-merchant-ink md:text-2xl md:leading-[30px] md:tracking-normal">
            Verify Identity
          </h1>
          <p className="text-[13px] font-normal leading-[19px] text-merchant-body md:text-base md:leading-6">
            We&apos;ve sent a 6-digit code to your registered email. Enter it below to secure your
            account.
          </p>
        </header>

        {import.meta.env.DEV && debugOtp && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-center text-xs text-amber-800">
            Dev code (email not configured): <strong>{debugOtp}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-2">
            <span
              id="merchant-otp-label"
              className="text-[11px] font-medium uppercase leading-[16.5px] tracking-[0.025em] text-merchant-ink md:text-xs md:normal-case md:leading-[18px] md:tracking-normal md:text-merchant-body"
            >
              Verification code
            </span>
            <MerchantOtpInput length={6} value={code} onChange={(val) => {
              setCode(val)
              if (fieldErrors.code) setFieldErrors((prev) => ({ ...prev, code: '' }))
              if (error) setError('')
            }} />
            {fieldErrors.code && (
              <p className="text-xs leading-[18px] text-merchant-error">{fieldErrors.code}</p>
            )}
          </div>

          <MerchantAuthField
            id="reset-new-password"
            label="New password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              if (fieldErrors.newPassword) setFieldErrors((prev) => ({ ...prev, newPassword: '' }))
            }}
            error={fieldErrors.newPassword}
          />

          <MerchantAuthField
            id="reset-confirm-password"
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (fieldErrors.confirmPassword) setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }))
            }}
            error={fieldErrors.confirmPassword}
            trailingIcon="lock"
          />

          {error && !fieldErrors.code && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          <MerchantButton
            type="submit"
            disabled={loading}
            className="shadow-[0px_8px_24px_0px_rgba(67,66,255,0.25)] md:shadow-[0px_8px_24px_0px_rgba(67,66,255,0.2)]"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </MerchantButton>
        </form>

        <div className="flex flex-col items-center gap-2">
          {resendMessage && (
            <p className="text-center text-xs text-emerald-600">{resendMessage}</p>
          )}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="flex items-center gap-2 text-sm font-medium leading-[21px] text-merchant-body transition-colors hover:text-merchant-ink disabled:opacity-60 md:text-base"
          >
            <RotateCcw size={16} strokeWidth={2} aria-hidden />
            {resending ? 'Sending…' : 'Resend Code'}
          </button>
        </div>
      </MerchantAuthCard>
    </MerchantAuthShell>
  )
}
