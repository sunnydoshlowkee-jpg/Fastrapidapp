import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../../brand/Logo'
import { MERCHANT_HELP_SUPPORT_PATH } from '../../../services/data/merchantHelpSupport.mock'

export default function MerchantRegistrationSidebar({ brandSubtitle, steps, help }) {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-merchant-divider bg-merchant-surface px-6 py-8">
      <div>
        <Logo height={28} className="h-7 w-auto" />
        <p className="mt-2 text-xs font-medium text-merchant-muted">{brandSubtitle}</p>
      </div>

      <nav className="mt-6 lg:mt-8" aria-label="Registration progress">
        <p className="mb-3 text-xs font-semibold text-merchant-muted lg:sr-only">
          Step 1 of {steps.length}
        </p>
        <ol className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {steps.map((step) => {
            const isActive = step.status === 'active'
            return (
              <li
                key={step.id}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? 'bg-merchant-primary text-white'
                    : 'bg-merchant-icon-tile text-merchant-muted'
                }`}
              >
                {step.id}. {step.label}
              </li>
            )
          })}
        </ol>
        <ol className="hidden space-y-1 lg:block">
          {steps.map((step) => {
            const isActive = step.status === 'active'
            const isCompleted = step.status === 'completed'

            return (
              <li key={step.id}>
                <div
                  className={`flex items-center gap-3 rounded-lg px-2 py-2.5 ${
                    isActive ? 'bg-merchant-nav-active' : ''
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isActive
                        ? 'bg-merchant-primary text-white'
                        : isCompleted
                          ? 'bg-merchant-nav-active text-merchant-primary'
                          : 'bg-merchant-icon-tile text-merchant-muted'
                    }`}
                  >
                    {isCompleted ? <Check size={16} strokeWidth={2.5} aria-hidden /> : step.id}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      isActive
                        ? 'text-merchant-primary'
                        : isCompleted
                          ? 'text-merchant-ink'
                          : 'text-merchant-muted'
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

      <div className="mt-auto rounded-lg bg-merchant-input p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
          {help.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-merchant-body">{help.body}</p>
        <Link
          to={MERCHANT_HELP_SUPPORT_PATH}
          className="mt-3 inline-block text-sm font-semibold text-merchant-primary hover:text-merchant-link"
        >
          {help.linkLabel}
        </Link>
      </div>
    </aside>
  )
}
