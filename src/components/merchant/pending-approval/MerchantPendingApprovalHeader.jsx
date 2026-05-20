import { HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../../brand/Logo'
import { MERCHANT_HELP_SUPPORT_PATH } from '../../../services/data/merchantHelpSupport.mock'

export default function MerchantPendingApprovalHeader({ supportLabel }) {
  return (
    <header className="flex items-center justify-between bg-merchant-surface px-5 py-4 md:border-b md:border-merchant-divider md:px-8">
      <Logo height={28} className="h-7 w-auto" />
      <Link
        to={MERCHANT_HELP_SUPPORT_PATH}
        className="inline-flex items-center gap-2 text-sm font-semibold text-merchant-primary transition-colors hover:text-merchant-link"
      >
        <span>{supportLabel}</span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border border-merchant-primary/35 text-merchant-primary"
          aria-hidden
        >
          <HelpCircle size={18} strokeWidth={1.75} />
        </span>
      </Link>
    </header>
  )
}
