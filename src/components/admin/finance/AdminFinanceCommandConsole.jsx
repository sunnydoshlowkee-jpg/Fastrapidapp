import { Link } from 'react-router-dom'
import { ChevronRight, Download, FileText } from 'lucide-react'

const icons = {
  file: FileText,
  download: Download,
}

export default function AdminFinanceCommandConsole({ commandConsole }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {commandConsole.title}
      </h2>
      <ul className="mt-4 space-y-2">
        {commandConsole.actions.map((action) => {
          const Icon = icons[action.icon] ?? FileText
          const className =
            'flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3.5 text-left text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100'

          const content = (
            <>
              <span className="flex items-center gap-3">
                <Icon size={18} strokeWidth={2} className="text-gray-500" aria-hidden />
                {action.label}
              </span>
              <ChevronRight size={18} className="text-gray-400" aria-hidden />
            </>
          )

          return (
            <li key={action.id}>
              {action.path ? (
                <Link to={action.path} className={className}>
                  {content}
                </Link>
              ) : (
                <button type="button" className={className}>
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </article>
  )
}
