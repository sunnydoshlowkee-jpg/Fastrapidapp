import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MerchantAuthShell from '../../../../components/merchant/auth/MerchantAuthShell'
import MerchantAuthCard from '../../../../components/merchant/auth/MerchantAuthCard'
import MerchantAuthField from '../../../../components/merchant/auth/MerchantAuthField'
import MerchantCheckbox from '../../../../components/merchant/auth/MerchantCheckbox'
import MerchantButton from '../../../../components/merchant/auth/MerchantButton'
import { merchantLogin } from '../../../../services/merchantAuthService'
import { getApiFieldError } from '../../../../utils/apiErrors'

const linkClass =
  'text-xs font-medium leading-[18px] text-merchant-link hover:text-merchant-primary md:text-merchant-primary md:hover:text-[#3837e6]'

export default function MerchantLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    if (!password) next.password = 'Password is required.'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setFieldErrors({})
    if (!validate()) return

    setLoading(true)
    try {
      const session = await merchantLogin({ email, password, rememberMe })
      navigate(session.redirectPath || '/merchant', { replace: true })
    } catch (err) {
      if (err.code === 'EMAIL_VERIFICATION_REQUIRED') {
        navigate(err.redirectPath || `/merchant/signup/verify?email=${encodeURIComponent(email.trim())}`, {
          replace: true,
        })
        return
      }

      const message = err.message || getApiFieldError(err, 'email')
      setFormError(message)
      setFieldErrors({ email: message, password: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MerchantAuthShell>
      <MerchantAuthCard
        className="md:pt-[15px]"
        footer={
          <p className="text-center text-xs font-medium leading-[18px] text-merchant-body md:text-base md:font-normal md:leading-6">
            Don&apos;t have an account?{' '}
            <Link to="/merchant/signup" className="font-bold text-merchant-link md:font-semibold md:text-merchant-primary">
              Create Account
            </Link>
          </p>
        }
      >
        <header className="flex flex-col items-center pb-10 text-center md:min-h-[62px] md:justify-center md:pb-0">
          <h1 className="pb-2 text-xl font-semibold leading-[25px] tracking-[-0.02em] text-merchant-ink md:pb-0 md:text-2xl md:leading-[30px] md:tracking-normal">
            Welcome Back
          </h1>
          <p className="text-[13px] font-normal leading-[17.88px] tracking-[-0.01em] text-merchant-body md:text-base md:leading-6 md:tracking-normal">
            Manage your orders, menu, and team
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[17px] md:gap-6">
          <MerchantAuthField
            id="merchant-email"
            label="Email"
            type="email"
            placeholder="merchant@rapid.io"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }))
              if (formError) setFormError('')
            }}
            error={fieldErrors.email}
          />

          <MerchantAuthField
            id="merchant-password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' }))
              if (formError) setFormError('')
            }}
            error={fieldErrors.password}
            labelAction={
              <Link to="/merchant/forgot-password" className={linkClass}>
                Forgot Password?
              </Link>
            }
          />

          <MerchantCheckbox
            id="merchant-remember"
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <div className="pt-2 md:pt-0">
            <MerchantButton type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </MerchantButton>
          </div>
        </form>
      </MerchantAuthCard>
    </MerchantAuthShell>
  )
}
