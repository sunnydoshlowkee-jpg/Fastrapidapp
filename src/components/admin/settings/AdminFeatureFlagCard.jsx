import { AlertTriangle, Bell, Coins, Fingerprint, UserPlus, Wallet } from 'lucide-react'

const icons = {
  wallet: Wallet,
  crypto: Coins,
  users: UserPlus,
  bell: Bell,
  fingerprint: Fingerprint,
}

export default function AdminFeatureFlagCard({ flag, enabled, onToggle }) {
  const Icon = icons[flag.icon] ?? Wallet
  const showWarning = flag.showWarningWhenEnabled && enabled && flag.warning

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Icon size={20} strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="pt-1.5 text-base font-bold text-gray-900">{flag.title}</h3>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onToggle(flag.id)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            enabled ? 'bg-rapid-orange' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              enabled ? 'left-[1.35rem]' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">{flag.description}</p>

      {showWarning ? (
        <div className="mt-4 flex gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5">
          <AlertTriangle
            size={16}
            className="mt-0.5 shrink-0 text-amber-700"
            strokeWidth={2}
            aria-hidden
          />
          <p className="text-xs font-medium text-amber-900">{flag.warning}</p>
        </div>
      ) : null}

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {flag.lastChanged}
      </p>
    </article>
  )
}
