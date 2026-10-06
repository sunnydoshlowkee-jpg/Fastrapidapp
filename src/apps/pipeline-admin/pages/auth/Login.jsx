import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GitBranch, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Logo from '../../../../components/brand/Logo'
import {
  pipelineLogin,
  isPipelineAuthenticated,
} from '../../../../services/pipelineAuthService'
import {
  PIPELINE_ADMIN_LOGIN_COPY,
  PIPELINE_ADMIN_VERIFY_2FA_PATH,
  PIPELINE_ADMIN_FORGOT_PASSWORD_PATH,
  PIPELINE_ADMIN_INDEX_PATH,
} from '../../../../services/data/pipelineAdminAuth.mock'

export default function PipelineAdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const copy = PIPELINE_ADMIN_LOGIN_COPY
  const [notice, setNotice] = useState(() =>
    location.state?.passwordReset ? location.state.message || '' : '',
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isPipelineAuthenticated()) {
      navigate(PIPELINE_ADMIN_INDEX_PATH, { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }

    setLoading(true)
    try {
      await pipelineLogin({ email, password, rememberMe })
      navigate(PIPELINE_ADMIN_VERIFY_2FA_PATH, { replace: true })
    } catch (err) {
      setError(err.message || copy.form.authErrorMessage || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen font-sans">
      <aside
        className="relative hidden w-full flex-col justify-between overflow-hidden px-12 py-14 text-white lg:flex lg:w-[44%]"
        style={{
          background:
            'linear-gradient(160deg, #7C3AED 0%, #6D28D9 45%, #5B21B6 100%)',
        }}
      >
        <span
          className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-white/5"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -left-20 bottom-10 h-[260px] w-[260px] rounded-full bg-white/5"
          aria-hidden
        />

        <div className="relative">
          <Logo variant="white" height={44} />
          <h1 className="mt-14 text-5xl font-bold leading-tight tracking-tight">
            {copy.brand.title}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
            {copy.brand.description}
          </p>
        </div>

        <div className="relative flex items-center gap-3 self-start rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <GitBranch size={20} className="text-white" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <p className="text-base font-bold text-white">{copy.brand.uptime}</p>
            <p className="text-xs text-white/75">{copy.brand.status}</p>
          </div>
        </div>
      </aside>

      <main className="relative flex w-full flex-1 flex-col overflow-hidden bg-white px-6 py-10 sm:px-10 lg:px-16">
        <span
          className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl lg:hidden"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl lg:hidden"
          aria-hidden
        />

        <div className="relative m-auto w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <Logo height={36} className="h-9 w-auto" />
            <p className="mt-2 text-sm font-medium text-gray-500">Pipeline Panel</p>
          </div>

          <h2 className="hidden text-3xl font-bold tracking-tight text-gray-900 lg:block">
            {copy.form.title}
          </h2>
          <p className="mt-2 hidden text-sm text-gray-500 lg:block">
            {copy.form.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white p-6 shadow-[0px_8px_40px_0px_rgba(25,28,29,0.06)] ring-1 ring-gray-100 lg:mt-8 lg:rounded-none lg:p-0 lg:shadow-none lg:ring-0"
            noValidate
          >
            {notice ? (
              <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                {notice}
              </div>
            ) : null}

            {error ? (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </div>
            ) : null}

            <div>
              <label
                htmlFor="pipeline-email"
                className="block text-sm font-semibold text-gray-900"
              >
                {copy.form.emailLabel}
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-100 px-3 focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-rapid-orange/30">
                <Mail size={16} className="text-gray-500" aria-hidden />
                <input
                  id="pipeline-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pipeline-password"
                className="block text-sm font-semibold text-gray-900"
              >
                {copy.form.passwordLabel}
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-100 px-3 focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-rapid-orange/30">
                <Lock size={16} className="text-gray-500" aria-hidden />
                <input
                  id="pipeline-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="text-gray-500 transition-colors hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange/30"
                />
                {copy.form.rememberMe}
              </label>
              <Link
                to={PIPELINE_ADMIN_FORGOT_PASSWORD_PATH}
                className="shrink-0 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900"
              >
                {copy.form.forgotPassword}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg bg-violet-700 px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-violet-700/25 transition-colors hover:bg-violet-800 disabled:opacity-60"
            >
              {loading ? 'Signing in…' : copy.form.submitLabel}
            </button>
          </form>
        </div>

        <p className="relative mt-8 text-center text-xs text-gray-400">
          {copy.form.footer}
        </p>
      </main>
    </div>
  )
}