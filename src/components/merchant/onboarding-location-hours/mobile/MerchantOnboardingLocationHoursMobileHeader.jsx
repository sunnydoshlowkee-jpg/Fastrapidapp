import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { MERCHANT_HELP_SUPPORT_PATH } from '../../../../services/data/merchantHelpSupport.mock'

export default function MerchantOnboardingLocationHoursMobileHeader({ title, backTo }) {
  const navigate = useNavigate()

  return (
    <header className="grid shrink-0 grid-cols-[2.5rem_1fr_2.5rem] items-center border-b border-merchant-divider bg-merchant-surface px-2 py-3">
      <button
        type="button"
        onClick={() => navigate(backTo)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-merchant-primary"
        aria-label="Go back"
      >
        <ArrowLeft size={22} strokeWidth={2} />
      </button>
      <h1 className="truncate text-center text-sm font-bold text-merchant-ink">{title}</h1>
      <Link
        to={MERCHANT_HELP_SUPPORT_PATH}
        className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-merchant-primary/35 text-merchant-primary transition-colors hover:bg-merchant-input/80"
        aria-label="Help and support"
      >
        <HelpCircle size={20} strokeWidth={1.75} />
      </Link>
    </header>
  )
}
