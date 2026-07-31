import { useState } from 'react'
import { Clock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { merchantLogout } from '../../../services/merchantAuthService'
import { MERCHANT_HELP_SUPPORT_PATH } from '../../../services/data/merchantHelpSupport.mock'
import { refreshMerchantOnboardingStatus } from '../../../services/merchantOnboardingService'

export default function MerchantPendingApprovalStatus({ status }) {
  const navigate = useNavigate()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const onboarding = await refreshMerchantOnboardingStatus()
      if (onboarding?.can_access_dashboard) {
        navigate('/merchant', { replace: true })
        return
      }
    } finally {
      setRefreshing(false)
    }
  }

  const handleSignOut = async () => {
    const { switchedTo } = await merchantLogout({ switchToRemaining: true })
    if (switchedTo) {
      window.location.assign('/merchant')
      return
    }
    navigate('/merchant/login', { replace: true })
  }

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
      {/* Mobile Figma [622:7212]: outer gray ring, inner amber disc, white clock */}
      <div className="flex h-[7.25rem] w-[7.25rem] shrink-0 items-center justify-center rounded-full bg-merchant-icon-tile">
        <div className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-amber-600 text-white shadow-sm">
          <Clock size={30} strokeWidth={1.85} aria-hidden />
        </div>
      </div>

      <h1 className="mt-7 text-2xl font-bold tracking-[-0.02em] text-merchant-ink md:mt-8 md:text-3xl">
        {status.title}
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-merchant-body md:text-base">
        {status.descriptionPrefix}{' '}
        <Link
          to={MERCHANT_HELP_SUPPORT_PATH}
          className="font-semibold text-merchant-primary hover:text-merchant-link"
        >
          {status.contactSupportLabel}
        </Link>
      </p>

      <button
        type="button"
        onClick={handleRefresh}
        disabled={refreshing}
        className="mt-8 w-full max-w-md rounded-lg bg-merchant-input py-4 text-sm font-bold text-merchant-ink transition-colors hover:bg-merchant-divider disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
      >
        {refreshing ? 'Refreshing…' : status.refreshLabel}
      </button>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-5 text-sm font-semibold text-merchant-primary hover:text-merchant-link"
      >
        {status.signOutLabel}
      </button>
    </section>
  )
}
