import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut, GitBranch, LayoutGrid, CheckSquare, FileText, Activity } from 'lucide-react'
import Logo from '../../brand/Logo'
import { getStoredPipelineSession } from '../../../services/pipelineAuthService'
import { pipelineLogout } from '../../../services/pipelineAuthService'
import { pipelineBasePath } from '../../../utils/pipeline'
import { PIPELINE_ADMIN_LOGIN_PATH } from '../../../services/data/pipelineAdminAuth.mock'

const NAV_ITEMS = [
  { key: 'overview', to: '/pipeline-admin', icon: LayoutGrid, label: 'Overview', end: true },
  { key: 'board', to: '/pipeline-admin/board', icon: GitBranch, label: 'Board' },
  { key: 'my-items', to: '/pipeline-admin/my-items', icon: CheckSquare, label: 'My Items' },
  { key: 'documents', to: '/pipeline-admin/documents', icon: FileText, label: 'Documents' },
  { key: 'activity', to: '/pipeline-admin/activity', icon: Activity, label: 'Activity' },
]

export default function PipelineAdminSidebar({ onClose }) {
  const navigate = useNavigate()
  const base = pipelineBasePath()
  const session = getStoredPipelineSession()
  const user = session?.user

  const handleLogout = async () => {
    await pipelineLogout()
    navigate(base, { replace: true })
    navigate(PIPELINE_ADMIN_LOGIN_PATH, { replace: true })
  }

  const displayName = user?.name || user?.email || 'Pipeline User'
  const initials =
    displayName
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'P'

  return (
    <aside className={`flex w-60 shrink-0 flex-col xl:w-64 ${onClose ? 'h-full bg-gray-50 shadow-2xl' : 'border-r border-gray-200 bg-white'}`}>
      <div
        className={`flex items-center justify-between gap-3 px-5 py-5 ${onClose ? 'bg-white' : 'border-b border-gray-100'}`}
      >
        <div>
          <Logo height={26} className="h-[26px] w-auto" />
          <p className="mt-1 text-xs font-semibold text-violet-700">Strategy Pipeline</p>
        </div>
        {onClose ? (
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Pipeline
        </p>
        <div className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <span
                      className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-violet-600"
                      aria-hidden
                    />
                  ) : null}
                  <Icon size={18} strokeWidth={1.75} />
                  <span className="flex-1 truncate">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className={`border-t border-gray-100 ${onClose ? 'bg-white' : ''} p-4`}>
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
            <p className="truncate text-xs text-gray-500">Pipeline Staff</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={16} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  )
}