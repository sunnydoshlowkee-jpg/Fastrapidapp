import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../../../brand/Logo'

export default function MerchantRegistrationMobileHeader({ backTo = '/merchant/login' }) {
  const navigate = useNavigate()

  return (
    <header className="relative flex items-center justify-center px-4 py-3">
      <button
        type="button"
        onClick={() => navigate(backTo)}
        className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-lg text-merchant-ink"
        aria-label="Go back"
      >
        <ArrowLeft size={22} strokeWidth={2} />
      </button>
      <Logo height={24} className="h-6 w-auto" />
    </header>
  )
}
