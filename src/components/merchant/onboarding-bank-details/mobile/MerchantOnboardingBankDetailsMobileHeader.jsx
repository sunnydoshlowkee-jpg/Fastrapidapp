import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function MerchantOnboardingBankDetailsMobileHeader({ title, skipLabel, backTo, onSkip }) {
  const navigate = useNavigate()

  return (
    <header className="grid shrink-0 grid-cols-[2.5rem_1fr_auto] items-center gap-2 border-b border-merchant-divider bg-merchant-surface px-2 py-3">
      <button
        type="button"
        onClick={() => navigate(backTo)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-merchant-primary"
        aria-label="Go back"
      >
        <ArrowLeft size={22} strokeWidth={2} />
      </button>
      <h1 className="min-w-0 truncate text-center text-sm font-bold text-merchant-ink">{title}</h1>
      <button
        type="button"
        onClick={onSkip}
        className="justify-self-end pr-1 text-sm font-semibold text-merchant-primary underline decoration-merchant-primary underline-offset-2"
      >
        {skipLabel}
      </button>
    </header>
  )
}
