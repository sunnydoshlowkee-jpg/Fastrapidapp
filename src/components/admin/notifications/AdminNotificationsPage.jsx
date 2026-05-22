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

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })))
  }

  const markOneRead = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
        <button
          type="button"
          onClick={markAllRead}
          className="text-xs font-bold uppercase tracking-wide text-rapid-orange transition-colors hover:text-[#E84A15]"
        >
          {data.markAllReadLabel}
        </button>
      </div>

      <nav
        className="mb-6 flex gap-6 border-b border-gray-200"
        aria-label="Notification categories"
      >
        {data.tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'text-rapid-orange'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
              {isActive ? (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-rapid-orange"
                  aria-hidden
                />
              ) : null}
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
