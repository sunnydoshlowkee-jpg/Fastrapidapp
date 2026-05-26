import {
  AlertTriangle,
  Bell,
  Bike,
  Bitcoin,
  Wallet,
} from 'lucide-react'

const icons = {
  wallet: Wallet,
  crypto: Bitcoin,
  bike: Bike,
  bell: Bell,
}

const ICON_TONE = {
  orange: 'text-[#F97316]',
  violet: 'text-[#842BD2]',
  default: 'text-[#584237]',
}

const BADGE_STYLES = {
  violet: {
    container: 'bg-violet-300/30 text-[#4C0084]',
    dot: 'bg-[#842BD2]',
  },
}

export default function AdminFeatureFlagCard({ flag, enabled, onToggle }) {
  const Icon = icons[flag.icon] ?? Wallet
  const iconTone = ICON_TONE[flag.iconTone] ?? ICON_TONE.default
  const showWarning = flag.warning && (flag.showWarningAlways || (flag.showWarningWhenEnabled && enabled))

  return (
    <article
      className={`relative overflow-hidden rounded-xl bg-white p-5 shadow-[0px_4px_16px_rgba(26,28,29,0.04)] ${
        flag.highImpact ? 'pl-6' : ''
      }`}
    >
      {flag.highImpact ? (
        <span className="absolute inset-y-0 left-0 w-1 bg-[#F97316]" aria-hidden />
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F3F4]">
            <Icon size={18} strokeWidth={2} className={iconTone} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-tight text-gray-900">{flag.title}</h3>
            <p className="mt-1 text-sm leading-snug text-[#584237]">
              {flag.description}
            </p>
            {flag.badge ? (
              <span
                className={`mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${
                  BADGE_STYLES[flag.badge.tone]?.container ?? BADGE_STYLES.violet.container
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    BADGE_STYLES[flag.badge.tone]?.dot ?? BADGE_STYLES.violet.dot
                  }`}
                  aria-hidden
                />
                {flag.badge.label}
              </span>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`Toggle ${flag.title}`}
          onClick={() => onToggle(flag.id)}
          className={`relative h-6 w-12 shrink-0 rounded-full transition-colors ${
            enabled ? 'bg-rapid-orange' : 'bg-[#E2E2E3]'
          }`}
        >
          <span
            className={`absolute top-0 h-6 w-6 rounded-full border-4 bg-white shadow transition-all ${
              enabled
                ? 'left-6 border-rapid-orange'
                : 'left-0 border-[#E2E2E3]'
            }`}
          />
        </button>
      </div>

      {showWarning ? (
        <div className="mt-4 flex items-start gap-2 rounded-md border border-[#FFDAD6] bg-[#FFDAD6]/30 px-3 py-2.5">
          <AlertTriangle
            size={14}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-[#BA1A1A]"
            aria-hidden
          />
          <p className="text-xs leading-snug text-[#93000A]">{flag.warning}</p>
        </div>
      ) : null}
    </article>
  )
}
