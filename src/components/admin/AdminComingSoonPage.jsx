import { Link } from 'react-router-dom'

/**
 * Shared "not launch-ready" shell for admin screens that still lack live APIs.
 * Prefer this over rendering fake money / fake tickets.
 */
export default function AdminComingSoonPage({
  title,
  summary,
  backTo = '/admin',
  backLabel = 'Back to dashboard',
}) {
  return (
    <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phase 2</p>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="max-w-md text-sm text-gray-600">{summary}</p>
      <Link
        to={backTo}
        className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white hover:bg-[#E84A15]"
      >
        {backLabel}
      </Link>
    </div>
  )
}
