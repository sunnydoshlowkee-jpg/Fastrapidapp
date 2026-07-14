import { useMemo, useState } from 'react'
import { Calendar } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { ADMIN_AUDIT_LOG } from '../../../services/data/adminAuditLog.mock'
import AdminAuditLogMobilePage from './AdminAuditLogMobilePage'
import AdminAuditLogRow from './AdminAuditLogRow'

export default function AdminAuditLogPage() {
  const data = ADMIN_AUDIT_LOG
  const [activeTab, setActiveTab] = useState('all')
  const [visibleCount, setVisibleCount] = useState(3)
  const context = useOutletContext() ?? {}

  const filtered = useMemo(() => {
    if (activeTab === 'all') return data.entries
    return data.entries.filter((entry) => entry.category === activeTab)
  }, [activeTab, data.entries])

  const visible = filtered.slice(0, visibleCount)

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminAuditLogMobilePage data={data} onOpenDrawer={context.openDrawer} />
      </div>

      <div className="hidden p-6 lg:block">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{data.subtitle}</p>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <nav
          className="inline-flex rounded-lg border border-gray-200 bg-white p-1"
          aria-label="Filter audit log"
        >
          {data.tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  setVisibleCount(3)
                }}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Calendar size={16} strokeWidth={2} aria-hidden />
          {data.dateRangeLabel}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="w-1 p-0" aria-hidden />
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.admin}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.action}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.entity}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.changeState}
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.ipTime}
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">
                    No audit records in this category.
                  </td>
                </tr>
              ) : (
                visible.map((entry) => (
                  <AdminAuditLogRow key={entry.id} entry={entry} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + 3, filtered.length))}
            disabled={visibleCount >= filtered.length}
            className="rounded-lg bg-rapid-orange px-8 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {data.loadMoreLabel}
          </button>
        </div>
      </div>
    </>
  )
}
