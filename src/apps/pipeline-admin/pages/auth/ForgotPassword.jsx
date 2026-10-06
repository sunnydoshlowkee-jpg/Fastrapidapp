import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KeyRound, Mail } from 'lucide-react'
import {
  pipelineRequestPasswordReset,
  pipelineResendResetCode,
  pipelineResetPassword,
  getPipelineResetEmail,
  clearPipelineResetEmail,
} from '../../../../services/pipelineAuthService'
import {
  PIPELINE_ADMIN_FORGOT_PASSWORD_COPY,
  PIPELINE_ADMIN_LOGIN_PATH,
} from '../../../../services/data/pipelineAdminAuth.mock'

const CODE_LENGTH = 6
const RESEND_SECONDS = PIPELINE_ADMIN_FORGOT_PASSWORD_COPY.resendCooldownSeconds

function formatCountdown(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

export default function PipelineAdminForgotPassword() {
  const navigate = useNavigate()
  const copy = PIPELINE_ADMIN_FORGOT_PASSWORD_COPY
  const resumedEmail = getPipelineResetEmail()
  const [step, setStep] = useState(resumedEmail ? 'code' : 'email')
  const [email, setEmail] = useState(resumedEmail)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const codeRef = useRef(null)

  const canResend = secondsLeft === 0

  useEffect(() => {
    if (step !== 'code' || secondsLeft <= 0) return undefined
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [step, secondsLeft])

  useEffect(() => {
    if (step === 'code') codeRef.current?.focus()
  }, [step])

  const handleSendCode = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const result = await pipelineRequestPasswordReset(email.trim())
      setEmail(result.email)
      setCode('')
      setNotice(result.message || copy.codeSentMessage)
      setSecondsLeft(RESEND_SECONDS)
      setStep('code')
    } catch (err) {
      setError(err.message || 'Could not send reset code.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return
    setError('')
    setNotice('')
    try {
      const result = await pipelineResendResetCode(email)
      setNotice(result.message || copy.codeSentMessage)
      setSecondsLeft(RESEND_SECONDS)
      codeRef.current?.focus()
    } catch (err) {
      setError(err.message || 'Could not resend the code.')
    }
  }

  const handleReset = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (code.replace(/\D/g, '').length !== CODE_LENGTH) {
      setError('Please enter all 6 digits.')
      return
    }

    setLoading(true)
    try {
      const result = await pipelineResetPassword({
        email,
        code,
        newPassword,
        confirmPassword,
      })
      clearPipelineResetEmail()
      navigate(PIPELINE_ADMIN_LOGIN_PATH, {
        replace: true,
        state: { passwordReset: true, message: result.message || copy.resetSuccessMessage },
      })
    } catch (err) {
      setError(err.message || copy.invalidCodeMessage)
    } finally {
      setLoading(false)
    }
  }

  const startOver = () => {
    clearPipelineResetEmail()
    setStep('email')
    setEmail('')
    setCode('')
    setNewPassword('')
    setConfirmPassword('')
    setNotice('')
    setError('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F6F8] px-4 py-10 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0px_8px_40px_0px_rgba(25,28,29,0.08)] sm:p-8">
        <div className="flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <KeyRound size={24} className="text-[#6D28D9]" strokeWidth={2} aria-hidden />
          </span>
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold tracking-tight text-gray-900">
          {copy.title}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">{copy.subtitle}</p>

        {notice ? (
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-sm text-emerald-800">
            {notice}
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-700"
          >
            {error}
          </div>
        ) : null}

        {step === 'email' ? (
          <form onSubmit={handleSendCode} className="mt-6" noValidate>
            <label
              htmlFor="pipeline-reset-email"
              className="block text-sm font-semibold text-gray-900"
            >
              {copy.emailLabel}
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-100 px-3 focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-violet-600/40">
              <Mail size={16} className="text-gray-500" aria-hidden />
              <input
                id="pipeline-reset-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-violet-700 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-md shadow-violet-700/25 transition-opacity hover:opacity-95 disabled:opacity-60"
            >
              {loading ? 'Sending…' : copy.sendCodeLabel}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="mt-6" noValidate>
            <p className="text-center text-sm text-gray-600">
              {copy.codeSentTo}{' '}
              <span className="font-semibold text-gray-900">{email}</span>
            </p>

            <label htmlFor="pipeline-reset-code" className="mt-4 block text-sm font-semibold text-gray-900">
              {copy.codeLabel}
            </label>
            <input
              id="pipeline-reset-code"
              ref={codeRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="mt-1.5 w-full rounded-lg bg-gray-100 px-4 py-3 text-center text-xl font-bold tracking-[0.3em] text-gray-900 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-violet-600/40"
            />

            <label
              htmlFor="pipeline-new-password"
              className="mt-4 block text-sm font-semibold text-gray-900"
            >
              {copy.newPasswordLabel}
            </label>
            <input
              id="pipeline-new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-violet-600/40"
            />

            <label
              htmlFor="pipeline-confirm-password"
              className="mt-4 block text-sm font-semibold text-gray-900"
            >
              {copy.confirmPasswordLabel}
            </label>
            <input
              id="pipeline-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-violet-600/40"
            />
            <p className="mt-2 text-xs text-gray-500">{copy.passwordHint}</p>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-violet-700 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-md shadow-violet-700/25 transition-opacity hover:opacity-95 disabled:opacity-60"
            >
              {loading ? 'Updating…' : copy.updatePasswordLabel}
            </button>

            <p className="mt-5 text-center text-sm text-gray-600">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-semibold text-violet-700 hover:text-violet-900"
                >
                  {copy.resendAction} now
                </button>
              ) : (
                <>
                  {copy.resendCountdownPrefix}{' '}
                  <span className="font-bold text-orange-600">
                    {formatCountdown(secondsLeft)}
                  </span>
                </>
              )}
            </p>

            <p className="mt-3 text-center">
              <button
                type="button"
                onClick={startOver}
                className="text-sm font-semibold text-gray-500 hover:text-gray-800"
              >
                {copy.useDifferentEmail}
              </button>
            </p>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link
            to={PIPELINE_ADMIN_LOGIN_PATH}
            className="font-semibold text-violet-700 hover:text-violet-900"
          >
            {copy.backToLogin}
          </Link>
        </p>
      </div>
    </div>
  )
}