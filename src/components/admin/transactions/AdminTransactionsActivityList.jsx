import { Link } from 'react-router-dom'
import { ADMIN_TRANSACTIONS_PATH } from '../../../services/data/adminTransactions.mock'
import AdminTransactionStatusBadge from './AdminTransactionStatusBadge'

const statusTextClass = {
  success: 'text-emerald-600',
  failed: 'text-red-600',
  pending: 'text-gray-500',
}

export default function AdminTransactionsActivityList({
  title,
  viewAllLabel,
  activity,
  tabs,
  activeTab,
  onTabChange,
  selectedId,
  onSelect,
}) {
  const filtered =
    activeTab === 'all' ? activity : activity.filter((item) => item.status === activeTab)

  return (
    <aside className="flex w-full max-w-sm shrink-0 flex-col border-r border-gray-200 bg-white lg:w-80 xl:w-[22rem]">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</h2>
        <Link
          to={ADMIN_TRANSACTIONS_PATH}
          className="text-xs font-bold uppercase tracking-wide text-rapid-orange transition-colors hover:text-[#E84A15]"
        >
          {viewAllLabel}
        </Link>
      </div>

      <div className="border-b border-gray-100 px-4 py-3">
        <nav className="flex flex-wrap gap-2" aria-label="Activity filters">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {filtered.map((item) => {
          const isSelected = item.id === selectedId
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={`relative w-full border-b border-gray-50 px-4 py-4 text-left transition-colors hover:bg-gray-50 ${
                  isSelected ? 'bg-orange-50/50' : 'bg-white'
                }`}
              >
                {isSelected ? (
                  <span
                    className="absolute left-0 top-0 h-full w-1 bg-rapid-orange"
                    aria-hidden
                  />
                ) : null}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-gray-900">{item.id}</span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide ${
                      statusTextClass[item.status] ?? 'text-gray-500'
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-gray-900">₦{item.amount}</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-600">{item.customer}</span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
