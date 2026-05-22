import { useState } from 'react'
import { ArrowLeft, KeyRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminRecoveryShell from '../../../../components/admin/auth/AdminRecoveryShell'
import AdminAuthField from '../../../../components/admin/auth/AdminAuthField'
import AdminRecoveryButton from '../../../../components/admin/auth/AdminRecoveryButton'
import { adminRequestPasswordReset } from '../../../../services/adminAuthService'
import {
  ADMIN_FORGOT_PASSWORD_COPY,
  ADMIN_LOGIN_PATH,
  ADMIN_RESET_PASSWORD_PATH,
} from '../../../../services/data/adminAuth.mock'

export default function AdminForgotPassword() {
  const navigate = useNavigate()
  const copy = ADMIN_FORGOT_PASSWORD_COPY

  const [email, setEmail] = useState(copy.emailPlaceholder)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required.')
      return
    }

    setLoading(true)
    try {
      const result = await adminRequestPasswordReset(email)
      navigate(
        `${ADMIN_RESET_PASSWORD_PATH}?email=${encodeURIComponent(result.email)}`,
        { replace: true },
      )
    } catch (err) {
      setError(err.message || 'Unable to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminRecoveryShell icon={KeyRound}>
      <header className="mb-8 w-full text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{copy.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{copy.description}</p>
      </header>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <AdminAuthField
          id="admin-forgot-email"
          label={copy.emailLabel}
          type="email"
          placeholder={copy.emailPlaceholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          leadingIcon="mail"
          labelVariant="recovery"
          error={error}
        />

        <AdminRecoveryButton disabled={loading}>
          {loading ? 'Sending…' : copy.submitLabel}
        </AdminRecoveryButton>
      </form>

      <button
        type="button"
        onClick={() => navigate(ADMIN_LOGIN_PATH)}
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        {copy.backToLogin}
      </button>
    </AdminRecoveryShell>
  )
}
