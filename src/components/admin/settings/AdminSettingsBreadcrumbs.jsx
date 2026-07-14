import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { ADMIN_SETTINGS_PATH } from '../../../services/data/adminPaths'

export default function AdminSettingsBreadcrumbs({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500" aria-label="Breadcrumb">
      <Link
        to={ADMIN_SETTINGS_PATH}
        className="flex items-center text-gray-400 transition-colors hover:text-gray-700"
        aria-label="Settings home"
      >
        <Home size={16} strokeWidth={2} aria-hidden />
      </Link>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="text-gray-300" aria-hidden />
          {item.path && index < items.length - 1 ? (
            <Link to={item.path} className="font-medium transition-colors hover:text-gray-800">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
