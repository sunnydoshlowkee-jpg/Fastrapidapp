import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'

export default function AdminFinanceAttentionCard({ attention }) {
  const parts = attention.message.split(attention.highlight)

  return (
    <article className="rounded-xl border border-orange-100 border-l-4 border-l-rapid-orange bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-rapid-orange">
          <Bell size={18} strokeWidth={2} aria-hidden />
        </span>
        <div>
          <p className="text-sm leading-relaxed text-gray-700">
            {parts[0]}
            <strong className="font-bold text-gray-900">{attention.highlight}</strong>
            {parts[1]}
          </p>
          <Link
            to={attention.actionPath}
            className="mt-3 inline-flex text-sm font-bold uppercase tracking-wide text-rapid-orange transition-colors hover:text-[#E84A15]"
          >
            {attention.actionLabel} →
          </Link>
        </div>
      </div>
    </article>
  )
}
