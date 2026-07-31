import { useState } from 'react'
import { Ban } from 'lucide-react'

export default function AdminOrderDetailSidebar({ adminActions, notes, onForceCancel }) {
  const [note, setNote] = useState('')

  return (
    <div className="space-y-4">
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">{adminActions.title}</h2>
        <ul className="mt-3 divide-y divide-gray-100">
          <li>
            <button
              type="button"
              onClick={() => onForceCancel?.()}
              className="flex w-full items-center gap-3 py-3.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-gray-50"
            >
              <Ban size={18} strokeWidth={2} className="shrink-0" aria-hidden />
              Force cancel order
            </button>
          </li>
          <li className="py-3.5 text-xs text-gray-500">
            Refund / reassign rider stay Phase 2. Use Update Status above for other force moves.
          </li>
        </ul>
      </article>

      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">{notes.title}</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={notes.placeholder}
          rows={4}
          disabled
          className="mt-3 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
        />
        <button
          type="button"
          disabled
          className="mt-3 w-full cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-500"
        >
          {notes.saveLabel || 'Coming soon'}
        </button>
      </article>
    </div>
  )
}
