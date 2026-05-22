import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminRecoveryCard from '../../../../components/admin/auth/AdminRecoveryCard'
import AdminAuthField from '../../../../components/admin/auth/AdminAuthField'
import AdminOtpInput from '../../../../components/admin/auth/AdminOtpInput'
import AdminPasswordStrength from '../../../../components/admin/auth/AdminPasswordStrength'
import AdminVerifyButton from '../../../../components/admin/auth/AdminVerifyButton'
import {
  adminResendResetCode,
  adminResetPassword,
  getAdminResetEmail,
} from '../../../../services/adminAuthService'
import {
  ADMIN_FORGOT_PASSWORD_PATH,
  ADMIN_RESET_PASSWORD_COPY,
  ADMIN_RESET_SUCCESS_PATH,
} from '../../../../services/data/adminAuth.mock'
import { markAdminResetSuccess } from './ResetSuccess'

export default function AdminResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const copy = ADMIN_RESET_PASSWORD_COPY
  const email = searchParams.get('email') || getAdminResetEmail()

  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('password123!')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  useEffect(() => {
    if (!email) {
      navigate(ADMIN_FORGOT_PASSWORD_PATH, { replace: true })
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
      await adminResetPassword({
        email,
        code,
        newPassword,
        confirmPassword,
      })
      markAdminResetSuccess()
      navigate(ADMIN_RESET_SUCCESS_PATH, { replace: true })
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
      const result = await adminResendResetCode(email)
      setResendMessage(result.message)
      setCode('')
    } catch (err) {
      setError(err.message || 'Unable to resend code.')
    } finally {
      setResending(false)
    }
  }

  if (!email) return null

  return (
    <AdminRecoveryCard>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{copy.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{copy.description}</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span
            id="admin-reset-otp-label"
            className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#C4590E]"
          >
            {copy.codeLabel}
          </span>
          <AdminOtpInput
            id="admin-reset-otp"
            split={false}
            value={code}
            onChange={(val) => {
              setCode(val)
              if (fieldErrors.code) setFieldErrors((prev) => ({ ...prev, code: '' }))
              if (error) setError('')
            }}
          />
          {fieldErrors.code ? (
            <p className="text-xs text-red-600">{fieldErrors.code}</p>
          ) : null}
          <div className="flex items-center justify-between gap-2 pt-1 text-sm">
            <span className="text-gray-500">{copy.resendPrefix}</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-semibold text-[#C4590E] transition-colors hover:text-[#A84A18] disabled:opacity-60"
            >
              {resending ? 'Sending…' : copy.resendAction}
            </button>
          </div>
          {resendMessage ? (
            <p className="text-xs text-emerald-600">{resendMessage}</p>
          ) : null}
        </div>

        <div>
          <AdminAuthField
            id="admin-reset-new-password"
            label={copy.newPasswordLabel}
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              if (fieldErrors.newPassword) setFieldErrors((prev) => ({ ...prev, newPassword: '' }))
            }}
            labelVariant="recoveryMuted"
            error={fieldErrors.newPassword}
          />
          <AdminPasswordStrength password={newPassword} hint={copy.passwordHint} />
        </div>

        <AdminAuthField
          id="admin-reset-confirm-password"
          label={copy.confirmPasswordLabel}
          type="password"
          placeholder={copy.confirmPlaceholder}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            if (fieldErrors.confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }))
            }
          }}
          labelVariant="recoveryMuted"
          error={fieldErrors.confirmPassword}
        />

        {error && !fieldErrors.code ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <AdminVerifyButton disabled={loading}>
          {loading ? 'Resetting…' : copy.submitLabel}
        </AdminVerifyButton>
      </form>

      <button
        type="button"
        onClick={() => navigate(ADMIN_LOGIN_PATH)}
        className="mt-8 flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        {copy.backToLogin}
      </button>
    </AdminRecoveryCard>
  )
}
