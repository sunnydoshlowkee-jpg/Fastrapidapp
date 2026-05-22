import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AdminAuthShell from '../../../../components/admin/auth/AdminAuthShell'
import AdminAuthErrorAlert from '../../../../components/admin/auth/AdminAuthErrorAlert'
import AdminAuthField from '../../../../components/admin/auth/AdminAuthField'
import AdminAuthCheckbox from '../../../../components/admin/auth/AdminAuthCheckbox'
import AdminLoginButton from '../../../../components/admin/auth/AdminLoginButton'
import { adminLogin } from '../../../../services/adminAuthService'
import {
  ADMIN_DUMMY_CREDENTIALS,
  ADMIN_FORGOT_PASSWORD_PATH,
  ADMIN_LOGIN_COPY,
  ADMIN_VERIFY_2FA_PATH,
} from '../../../../services/data/adminAuth.mock'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const resetMessage = location.state?.resetMessage
  const { form } = ADMIN_LOGIN_COPY

  const [email, setEmail] = useState(ADMIN_DUMMY_CREDENTIALS.email)
  const [password, setPassword] = useState(ADMIN_DUMMY_CREDENTIALS.password)
  const [rememberMe, setRememberMe] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [authError, setAuthError] = useState(null)
  const [loading, setLoading] = useState(false)

  const clearAuthError = () => {
    if (authError) setAuthError(null)
  }

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    if (!password) next.password = 'Password is required.'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFieldErrors({})
    setAuthError(null)
    if (!validate()) return

    setLoading(true)
    try {
      await adminLogin({ email, password, rememberMe })
      navigate(ADMIN_VERIFY_2FA_PATH, { replace: true })
    } catch {
      setAuthError({
        title: form.authErrorTitle,
        message: form.authErrorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminAuthShell>
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{form.title}</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">{form.subtitle}</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {resetMessage ? (
          <p
            className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            role="status"
          >
            {resetMessage}
          </p>
        ) : null}

        {authError ? (
          <AdminAuthErrorAlert title={authError.title} message={authError.message} />
        ) : null}

        <AdminAuthField
          id="admin-email"
          label={form.emailLabel}
          type="email"
          placeholder="admin@kaabo.system"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            clearAuthError()
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }))
          }}
          leadingIcon="mail"
          error={fieldErrors.email}
        />

        <AdminAuthField
          id="admin-password"
          label={form.passwordLabel}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            clearAuthError()
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' }))
          }}
          leadingIcon="lock"
          error={fieldErrors.password}
        />

        <div className="flex items-center justify-between gap-4 pt-1">
          <AdminAuthCheckbox
            id="admin-remember"
            label={form.rememberMe}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link
            to={ADMIN_FORGOT_PASSWORD_PATH}
            className="shrink-0 text-sm font-medium text-rapid-orange transition-colors hover:text-[#E84A15]"
          >
            {form.forgotPassword}
          </Link>
        </div>

        <div className="pt-2">
          <AdminLoginButton disabled={loading}>
            {loading ? 'Signing in…' : form.submitLabel}
          </AdminLoginButton>
        </div>
      </form>

      <p className="mt-10 text-center text-xs text-gray-400">{form.footer}</p>
    </AdminAuthShell>
  )
}
