import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MerchantAuthFooter from '../auth/MerchantAuthFooter'
import MerchantEmailVerifyCard from './MerchantEmailVerifyCard'
import MerchantEmailVerifyHeader from './MerchantEmailVerifyHeader'
import { MERCHANT_REGISTRATION_PATH } from '../../../services/data/merchantRegistration.mock'
import { MERCHANT_EMAIL_VERIFICATION } from '../../../services/data/merchantEmailVerification.mock'
import { getMerchantSignupEmail, setMerchantSignupEmail } from '../../../services/merchantRegistrationService'

export default function MerchantEmailVerifyPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const emailParam = searchParams.get('email') || ''
  const email = emailParam || getMerchantSignupEmail() || MERCHANT_EMAIL_VERIFICATION.defaultEmail

  useEffect(() => {
    if (emailParam) {
      setMerchantSignupEmail(emailParam)
    }
  }, [emailParam])

  useEffect(() => {
    if (!email) {
      navigate(MERCHANT_REGISTRATION_PATH, { replace: true })
    }
  }, [email, navigate])

  if (!email) return null

  return (
    <div
      className={`relative flex min-h-screen flex-col bg-merchant-canvas font-sans text-merchant-ink antialiased`}
    >
      <div
        className="pointer-events-none absolute -left-32 -top-32 hidden h-[420px] w-[420px] rounded-full opacity-80 md:block"
        style={{
          background:
            'radial-gradient(circle, rgba(67, 66, 255, 0.09) 0%, rgba(67, 66, 255, 0) 70%)',
        }}
        aria-hidden
      />

      <MerchantEmailVerifyHeader />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-6 md:px-6 md:py-10">
        <MerchantEmailVerifyCard email={email} />
      </main>

      <div className="relative z-10 hidden px-6 pb-8 md:block">
        <MerchantAuthFooter variant="minimal" />
      </div>
    </div>
  )
}
