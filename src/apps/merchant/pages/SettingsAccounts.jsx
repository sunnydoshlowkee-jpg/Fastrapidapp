import { useNavigate, useOutletContext } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import MerchantAccountSwitcher from '../../../components/merchant/accounts/MerchantAccountSwitcher'

export default function SettingsAccounts() {
  const navigate = useNavigate()
  const outlet = useOutletContext() || {}
  const openMobileNav = outlet.openMobileNav

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:gap-6 lg:p-8">
      <header className="flex items-center gap-3">
        {openMobileNav ? (
          <button
            type="button"
            onClick={openMobileNav}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-merchant-divider bg-merchant-surface text-merchant-ink lg:hidden"
            aria-label="Open navigation menu"
          >
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => navigate('/merchant/settings')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-merchant-divider bg-merchant-surface text-merchant-ink"
          aria-label="Back to settings"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>
        <h1 className="truncate text-xl font-semibold tracking-[-0.02em] text-merchant-ink lg:text-2xl">
          Merchant accounts
        </h1>
      </header>

      <MerchantAccountSwitcher />
    </div>
  )
}
