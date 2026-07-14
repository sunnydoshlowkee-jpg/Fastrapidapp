import { useState } from 'react'
import {
  Ban,
  RefreshCw,
  SlidersHorizontal,
  UserRound,
  Wallet,
} from 'lucide-react'

const actionIcons = {
  userSwitch: UserRound,
  sliders: SlidersHorizontal,
  refund: Wallet,
  cancel: Ban,
}

export default function AdminOrderDetailSidebar({ adminActions, notes }) {
  const [note, setNote] = useState('')

  return (
    <div className="space-y-4">
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">{adminActions.title}</h2>
        <ul className="mt-3 divide-y divide-gray-100">
          {adminActions.items.map((item) => {
            const Icon = actionIcons[item.icon] ?? RefreshCw
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-3 py-3.5 text-left text-sm font-semibold transition-colors hover:bg-gray-50 ${
                    item.danger ? 'text-red-600' : 'text-gray-800'
                  }`}
                >
                  <Icon size={18} strokeWidth={2} className="shrink-0" aria-hidden />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </article>

      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">{notes.title}</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={notes.placeholder}
          rows={4}
          className="mt-3 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
        />
        <button
          type="button"
          disabled={!note.trim()}
          className="mt-3 w-full rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors enabled:bg-rapid-orange enabled:text-white enabled:hover:bg-[#E84A15] disabled:cursor-not-allowed"
        >
          {notes.saveLabel}
        </button>
      </article>
    </div>
  )
}
