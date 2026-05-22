import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ADMIN_SETTINGS_PATH } from '../../../services/data/adminPaths'

export default function AdminSettingsSectionPlaceholder({ title, description }) {
  return (
    <div className="p-6">
      <Link
        to={ADMIN_SETTINGS_PATH}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        Back to settings
      </Link>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      <p className="mt-6 rounded-lg border border-dashed border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
        Configuration for this section is coming soon.
      </p>
    </div>
  )
}
