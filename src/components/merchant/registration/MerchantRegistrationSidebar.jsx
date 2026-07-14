import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../../brand/Logo'
import { MERCHANT_HELP_SUPPORT_PATH } from '../../../services/data/merchantHelpSupport.mock'

export default function MerchantRegistrationSidebar({ brandSubtitle, steps, help }) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-r border-merchant-divider bg-merchant-onboarding-sidebar px-8 py-10 lg:w-72 lg:px-8 lg:py-10">
      <div className="pb-12">
        <Logo height={26} className="h-[26px] w-auto" />
        <p className="mt-4 text-xs font-normal leading-4 text-merchant-body">{brandSubtitle}</p>
      </div>

      <nav className="flex-1" aria-label="Registration progress">
        <p className="mb-3 text-xs font-semibold text-merchant-muted lg:sr-only">
          Step 1 of {steps.length}
        </p>
        <ol className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {steps.map((step) => {
            const isActive = step.status === 'active'
            return (
              <li
                key={step.id}
                className={`shrink-0 rounded-xl px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? 'bg-merchant-primary text-[#FAF6FF] shadow-merchant-step-active'
                    : 'bg-merchant-icon-tile text-merchant-muted'
                }`}
              >
                {step.id}. {step.label}
              </li>
            )
          })}
        </ol>
        <ol className="relative hidden space-y-8 lg:block">
          {steps.map((step, index) => {
            const isActive = step.status === 'active'
            const isCompleted = step.status === 'completed'
            const isUpcoming = !isActive && !isCompleted

            return (
              <li key={step.id} className="relative">
                {index < steps.length - 1 ? (
                  <span
                    className="absolute left-4 top-8 z-0 h-8 w-0.5 -translate-x-1/2 bg-merchant-divider"
                    aria-hidden
                  />
                ) : null}
                <div
                  className={`relative z-10 flex items-center gap-4 py-0 ${isUpcoming ? 'opacity-40' : ''}`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                      isActive
                        ? 'bg-merchant-primary text-[#FAF6FF] shadow-merchant-step-active'
                        : isCompleted
                          ? 'bg-merchant-nav-active text-merchant-primary'
                          : 'bg-merchant-icon-tile text-merchant-muted'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={16} strokeWidth={2.5} aria-hidden />
                    ) : (
                      step.id
                    )}
                  </span>
                  <span
                    className={`text-sm leading-5 ${
                      isActive
                        ? 'font-semibold text-merchant-primary'
                        : isCompleted
                          ? 'font-normal text-merchant-ink'
                          : 'font-normal text-merchant-ink'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="mt-auto rounded-lg border border-[rgba(171,179,183,0.1)] bg-white p-6">
        <p className="text-[10px] font-normal uppercase tracking-[0.1em] text-merchant-body">
          {help.title}
        </p>
        <p className="mt-2 text-xs leading-5 text-merchant-body">{help.body}</p>
        <Link
          to={MERCHANT_HELP_SUPPORT_PATH}
          className="mt-2 inline-block text-xs font-bold text-merchant-primary hover:text-merchant-link"
        >
          {help.linkLabel}
        </Link>
      </div>
    </aside>
  )
}