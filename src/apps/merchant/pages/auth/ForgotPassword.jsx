import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import MerchantAuthShell from '../../../../components/merchant/auth/MerchantAuthShell'
import MerchantAuthCard from '../../../../components/merchant/auth/MerchantAuthCard'
import MerchantAuthField from '../../../../components/merchant/auth/MerchantAuthField'
import MerchantButton from '../../../../components/merchant/auth/MerchantButton'
import { merchantRequestPasswordReset } from '../../../../services/merchantAuthService'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
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
      const result = await merchantRequestPasswordReset(email)
      navigate(`/merchant/forgot-password/verify?email=${encodeURIComponent(result.email)}`, {
        state: { debugOtp: result.debugOtp },
      })
    } catch (err) {
      setError(err.message || 'Unable to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MerchantAuthShell footerVariant="minimal" withGradient>
      <MerchantAuthCard bordered>
        <header className="flex flex-col gap-3 text-left md:gap-4">
          <h1 className="text-xl font-semibold leading-[25px] tracking-[-0.02em] text-merchant-ink md:text-2xl md:leading-[30px] md:tracking-normal">
            Forgot password?
          </h1>
          <p className="text-[13px] font-normal leading-[19px] text-merchant-body md:text-base md:leading-6">
            Enter your email to reset your password. We&apos;ll send you a link to get back into
            your account.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
          <MerchantAuthField
            id="forgot-email"
            label="Email address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            error={error}
            trailingIcon="mail"
          />

          <MerchantButton
            type="submit"
            disabled={loading}
            className="gap-2 shadow-[0px_8px_24px_0px_rgba(67,66,255,0.25)] md:shadow-[0px_8px_24px_0px_rgba(67,66,255,0.2)]"
          >
            {loading ? 'Sending…' : 'Send Reset Link'}
            {!loading && <ArrowRight size={18} strokeWidth={2} aria-hidden />}
          </MerchantButton>
        </form>

        <Link
          to="/merchant/login"
          className="mt-2 flex items-center justify-center gap-2 text-sm font-medium leading-[21px] text-merchant-body transition-colors hover:text-merchant-ink md:text-base"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          Back to Login
        </Link>
      </MerchantAuthCard>
    </MerchantAuthShell>
  )
}
