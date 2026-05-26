import { useMemo, useState } from 'react'
import { ADMIN_NOTIFICATIONS } from '../../../services/data/adminNotifications.mock'
import AdminNotificationItem from './AdminNotificationItem'

export default function AdminNotificationsPage() {
  const data = ADMIN_NOTIFICATIONS
  const [activeTab, setActiveTab] = useState('all')
  const [items, setItems] = useState(() => data.items.map((item) => ({ ...item })))

  const filtered = useMemo(() => {
    if (activeTab === 'all') return items
    return items.filter((item) => item.category === activeTab)
  }, [activeTab, items])

  const unreadCount = useMemo(
    () => items.filter((item) => item.unread).length,
    [items],
  )

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })))
  }

  const markOneRead = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    )
  }

  return (
    <div className="px-5 pb-12 pt-4 lg:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={markAllRead}
          className="rounded-md px-1 text-sm font-bold text-[#9D4300] transition-colors hover:text-[#7A3500] disabled:opacity-50"
          disabled={unreadCount === 0}
        >
          {data.markAllReadLabel}
        </button>
        <p className="text-sm text-[#454557]">
          {unreadCount}{' '}
          <span className="font-medium">{data.unreadSuffix}</span>
        </p>
      </div>

      <nav
        className="-mx-5 mb-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:px-0"
        aria-label="Notification categories"
      >
        {data.tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                isActive
                  ? 'border-2 border-[#9D4300]/20 bg-white font-bold text-[#9D4300] shadow-[0px_12px_32px_rgba(26,28,29,0.06)]'
                  : 'bg-[#F3F3F4] font-medium text-[#584237] hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>

      <ul className="space-y-4">
        {filtered.length === 0 ? (
          <li className="rounded-xl border border-dashed border-gray-200 bg-white py-12 text-center text-sm text-gray-500">
            No notifications in this category.
          </li>
        ) : (
          filtered.map((item) => (
            <li key={item.id}>
              <AdminNotificationItem item={item} onMarkRead={markOneRead} />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
