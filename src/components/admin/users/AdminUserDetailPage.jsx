import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Mail, Phone, Search } from 'lucide-react'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminUserBanModal from './AdminUserBanModal'
import AdminUserDetailMobilePage from './AdminUserDetailMobilePage'
import AdminUserKpiCard from './AdminUserKpiCard'
import AdminUserOrderStatusBadge from './AdminUserOrderStatusBadge'
import AdminUserSuspendModal from './AdminUserSuspendModal'

function OrderHistoryTable({ orderHistory }) {
  return (
    <div className="rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-100">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-50/70">
            {orderHistory.columns.map((col) => (
              <th
                key={col.id}
                className="px-6 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-500 first:text-left last:text-left"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderHistory.rows.length === 0 ? (
            <tr>
              <td
                colSpan={orderHistory.columns.length}
                className="px-6 py-10 text-center text-sm text-gray-500"
              >
                No orders yet.
              </td>
            </tr>
          ) : (
            orderHistory.rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-50 last:border-0">
                <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                  {row.id}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">
                  <p>{row.dateDay},</p>
                  <p>{row.dateTime}</p>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-700">
                  {row.destination}
                </td>
                <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  {row.amount}
                </td>
                <td className="px-6 py-4">
                  <AdminUserOrderStatusBadge
                    status={row.status}
                    label={row.statusLabel}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-100">
            <td colSpan={orderHistory.columns.length} className="px-6 py-4 text-center">
              <button
                type="button"
                className="text-xs font-bold uppercase tracking-wider text-rapid-orange transition-opacity hover:opacity-80"
              >
                {orderHistory.viewAllLabel}
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

function TransactionsTable({ transactions }) {
  return (
    <div className="rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-100">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-50/70">
            {transactions.columns.map((col) => (
              <th
                key={col.id}
                className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.rows.length === 0 ? (
            <tr>
              <td
                colSpan={transactions.columns.length}
                className="px-6 py-10 text-center text-sm text-gray-500"
              >
                No transactions on file.
              </td>
            </tr>
          ) : (
            transactions.rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-50 last:border-0">
                <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                  {row.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <p>{row.dateDay},</p>
                  <p>{row.dateTime}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.channel}</td>
                <td className={`px-6 py-4 text-sm font-bold ${row.amountTone}`}>
                  {row.amount}
                </td>
                <td className="px-6 py-4">
                  <AdminUserOrderStatusBadge
                    status={row.status}
                    label={row.statusLabel}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function NotesPanel({ notes }) {
  const [draft, setDraft] = useState('')
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-bold text-gray-900">{notes.title}</h3>
      <div className="overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-200">
        <div className="flex gap-3 border-l-4 border-rapid-orange bg-gray-100 p-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={notes.placeholder}
            rows={3}
            className="flex-1 resize-none bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="flex justify-end bg-gray-50 p-3">
          <button
            type="button"
            className="rounded-lg bg-rapid-orange px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#E84A15] disabled:opacity-50"
            disabled={!draft.trim()}
          >
            {notes.submitLabel}
          </button>
        </div>
      </div>

      {notes.items.length > 0 ? (
        <ul className="space-y-2">
          {notes.items.map((note) => (
            <li
              key={note.id}
              className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold text-gray-700">{note.author}</p>
                <p className="text-[11px] font-medium text-gray-400">
                  {note.createdAt}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-700">{note.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default function AdminUserDetailPage({ user }) {
  const [activeTab, setActiveTab] = useState('orders')
  const [suspendOpen, setSuspendOpen] = useState(false)
  const [banOpen, setBanOpen] = useState(false)

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminUserDetailMobilePage
          user={user}
          onSuspend={() => setSuspendOpen(true)}
          onBan={() => setBanOpen(true)}
        />
      </div>

      <div className="hidden h-full min-h-0 flex-1 flex-col lg:flex">
      <header className="grid shrink-0 grid-cols-3 items-center gap-4 border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex justify-start">
          <div className="relative w-full max-w-xs">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search commands..."
              className="w-full rounded-lg bg-gray-100 py-1.5 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-rapid-orange/30"
            />
          </div>
        </div>
        <h1 className="text-center text-sm font-bold uppercase tracking-[0.25em] text-gray-900">
          Kaabo Rapid
        </h1>
        <div className="flex justify-end">
          <Link
            to={ADMIN_NOTIFICATIONS_PATH}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={1.75} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-gray-100 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-start gap-4">
              <div className="relative">
                <span
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-xl font-bold ${user.avatarTone}`}
                  aria-hidden
                >
                  {user.avatarGlyph}
                </span>
                {user.verified ? (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {user.verifiedLabel}
                  </span>
                ) : null}
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-gray-900">
                  {user.name}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                  <Mail size={14} strokeWidth={1.75} className="text-gray-500" aria-hidden />
                  {user.email}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                  <Phone size={14} strokeWidth={1.75} className="text-gray-500" aria-hidden />
                  {user.phone}
                </p>
                <p className="mt-3 text-xs font-medium text-gray-500">
                  ID: <span className="font-semibold text-gray-700">{user.id}</span>
                  <span className="mx-3 text-gray-300">|</span>
                  JOINED:{' '}
                  <span className="font-semibold uppercase text-gray-700">
                    {user.joined}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSuspendOpen(true)}
                className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
              >
                {user.suspendLabel}
              </button>
              <button
                type="button"
                onClick={() => setBanOpen(true)}
                className="rounded-lg bg-gradient-to-b from-red-400 to-red-500 px-5 py-2 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                {user.banLabel}
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {user.kpis.map((kpi) => (
              <AdminUserKpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </section>

        <section className="p-6">
          <nav
            className="flex flex-wrap gap-8 border-b border-gray-200"
            aria-label="User detail sections"
          >
            {user.tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'border-rapid-orange text-rapid-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 ? (
                    <span className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-gray-100 px-1 text-[10px] font-bold text-gray-600">
                      {tab.count}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </nav>

          <div className="mt-6">
            {activeTab === 'orders' ? (
              <OrderHistoryTable orderHistory={user.orderHistory} />
            ) : activeTab === 'transactions' ? (
              <TransactionsTable transactions={user.transactions} />
            ) : null}
          </div>

          <div className="mt-8">
            <NotesPanel notes={user.notes} />
          </div>
        </section>
      </div>

      </div>

      <AdminUserSuspendModal
        isOpen={suspendOpen}
        onClose={() => setSuspendOpen(false)}
        config={user.suspendModal}
      />
      <AdminUserBanModal
        isOpen={banOpen}
        onClose={() => setBanOpen(false)}
        config={user.banModal}
      />
    </>
  )
}
