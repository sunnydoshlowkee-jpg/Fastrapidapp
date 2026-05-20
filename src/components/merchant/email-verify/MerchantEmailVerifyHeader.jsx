import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../../brand/Logo'
import { MERCHANT_REGISTRATION_PATH } from '../../../services/data/merchantRegistration.mock'

export default function MerchantEmailVerifyHeader({ backTo = MERCHANT_REGISTRATION_PATH }) {
  const navigate = useNavigate()

  return (
    <header className="shrink-0 md:border-b md:border-merchant-divider md:bg-merchant-surface">
      {/* Mobile [622:7150](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-7150) */}
      <div className="relative flex items-center justify-center bg-merchant-canvas px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-lg text-merchant-primary"
          aria-label="Go back"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <Logo height={24} className="h-6 w-auto" />
      </div>

      <div className="mx-auto hidden w-full max-w-[640px] items-center gap-3 px-5 py-4 md:flex md:max-w-none md:px-8">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-merchant-ink transition-colors hover:bg-merchant-input"
          aria-label="Go back"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <Logo height={28} className="h-7 w-auto" />
      </div>
    </header>
  )
}
