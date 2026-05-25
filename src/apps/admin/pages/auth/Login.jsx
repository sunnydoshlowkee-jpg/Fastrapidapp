import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Cloud, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Logo from '../../../../components/brand/Logo'

const DUMMY_CREDENTIALS = {
  email: 'admin@kaabo.system',
  password: 'admin123',
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(DUMMY_CREDENTIALS.email)
  const [password, setPassword] = useState(DUMMY_CREDENTIALS.password)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === DUMMY_CREDENTIALS.email &&
        password === DUMMY_CREDENTIALS.password
      ) {
        navigate('/admin/verify-2fa', { replace: true })
      } else {
        setError('Incorrect email or password. Try again.')
        setLoading(false)
      }
    }, 400)
  }

  return (
    <div className="flex min-h-screen font-sans">
      <aside
        className="relative hidden w-full flex-col justify-between overflow-hidden px-12 py-14 text-white lg:flex lg:w-[44%]"
        style={{
          background:
            'linear-gradient(160deg, #FF7A3D 0%, #FF5A1F 45%, #E14A12 100%)',
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
            Command Center
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
            The centralized hub for orchestrating logistics,
            <br />
            managing operations, and overseeing the Rapid Ecosystem
          </p>
        </div>

        <div className="relative flex items-center gap-3 self-start rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Cloud size={20} className="text-white" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <p className="text-base font-bold text-white">99.9% Uptime</p>
            <p className="text-xs text-white/75">Platform Status: Optimal</p>
          </div>
        </div>
      </aside>

      <main className="flex w-full flex-1 flex-col bg-white px-6 py-10 sm:px-10 lg:px-16">
        <div className="m-auto w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access the administrative dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
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
                htmlFor="admin-email"
                className="block text-sm font-semibold text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-100 px-3 focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-rapid-orange/30">
                <Mail size={16} className="text-gray-500" aria-hidden />
                <input
                  id="admin-email"
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
                htmlFor="admin-password"
                className="block text-sm font-semibold text-gray-900"
              >
                Password
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-100 px-3 focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-rapid-orange/30">
                <Lock size={16} className="text-gray-500" aria-hidden />
                <input
                  id="admin-password"
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

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange/30"
                />
                Remember me
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-sm font-semibold text-rapid-orange hover:text-[#E84A15]"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg bg-rapid-orange px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-rapid-orange/25 transition-colors hover:bg-[#E84A15] disabled:opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, #FF6B30 0%, #FF5A1F 100%)',
              }}
            >
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Secure login for Rapid administrators — Powered by Systems
        </p>
      </main>
    </div>
  )
}
