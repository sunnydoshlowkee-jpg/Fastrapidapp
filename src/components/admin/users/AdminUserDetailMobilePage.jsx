import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Ban,
  Mail,
  MoreVertical,
  PauseCircle,
  Phone,
  Receipt,
  Wallet,
} from 'lucide-react'

const statusPillStyles = {
  active: { bg: 'bg-[#FFEDD5]', text: 'text-[#9D4300]' },
  inactive: { bg: 'bg-[#E7E8E9]', text: 'text-[#454557]' },
  suspended: { bg: 'bg-[#FFDDB8]', text: 'text-[#653E00]' },
  banned: { bg: 'bg-[#FFDAD7]', text: 'text-[#BA1A1A]' },
}

const orderStatusStyles = {
  delivered: { bg: 'bg-[#F3F3F4]', text: 'text-[#1A1C1D]' },
  canceled: { bg: 'bg-[#FFDAD7]/40', text: 'text-[#BA1A1A]' },
  cancelled: { bg: 'bg-[#FFDAD7]/40', text: 'text-[#BA1A1A]' },
  pending: { bg: 'bg-[#FFEDD5]', text: 'text-[#9D4300]' },
}

function ProfileCard({ user }) {
  const statusKey = user.verified ? 'active' : 'inactive'
  const statusLabel = user.verifiedLabel ?? (user.verified ? 'Active' : 'Inactive')
  const pill = statusPillStyles[statusKey] ?? statusPillStyles.active
  const isPhotoAvatar = user.avatarKind === 'photo' && user.avatarBg

  return (
    <section className="relative overflow-hidden rounded-xl bg-white p-5 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{ backgroundColor: 'rgba(249, 115, 22, 0.10)', filter: 'blur(20px)' }}
      />

      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#F3F3F4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          {isPhotoAvatar ? (
            <div
              className="flex h-full w-full items-center justify-center text-base font-bold uppercase text-white"
              style={{ backgroundImage: user.avatarBg }}
            >
              <span className="sr-only">{user.avatarGlyph}</span>
              <span aria-hidden className="text-base font-bold text-white">
                {user.avatarGlyph}
              </span>
            </div>
          ) : (
            <span
              className={`flex h-full w-full items-center justify-center text-base font-bold ${user.avatarTone}`}
              aria-hidden
            >
              {user.avatarGlyph}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h2 className="truncate text-base font-bold leading-5 text-[#1A1C1D]">
              {user.name}
            </h2>
            <span
              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.05em] ${pill.bg} ${pill.text}`}
            >
              {statusLabel}
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-[#584237]">
            <Mail size={12} strokeWidth={1.75} aria-hidden />
            <span className="truncate">{user.email}</span>
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[#584237]">
            <Phone size={11} strokeWidth={1.75} aria-hidden />
            {user.phone}
          </p>
          <p className="mt-1.5 text-sm text-[#584237]/70">Joined {user.joined}</p>
        </div>
      </div>
    </section>
  )
}

function StatsBento({ ordersValue, walletValue, spentValue }) {
  return (
    <section className="grid grid-cols-2 gap-4">
      <div className="relative flex flex-col justify-center rounded-xl bg-white p-4 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
        <p className="text-xs font-normal uppercase tracking-[0.05em] text-[#584237]">
          Total Orders
        </p>
        <p className="mt-1 text-base font-bold tracking-[-0.025em] text-[#9D4300]">
          {ordersValue}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
          <p className="text-xs font-normal uppercase tracking-[0.05em] text-[#584237]">
            Wallet (₦)
          </p>
          <p className="mt-1 text-base font-bold tracking-[-0.025em] text-[#842BD2]">
            {walletValue}
          </p>
          <Wallet
            size={42}
            strokeWidth={1.5}
            className="pointer-events-none absolute -bottom-2 -right-2 text-[#842BD2] opacity-10"
            aria-hidden
          />
        </div>
        <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
          <p className="text-xs font-normal uppercase tracking-[0.05em] text-[#584237]">
            Spent (₦)
          </p>
          <p className="mt-1 text-base font-bold tracking-[-0.025em] text-[#1A1C1D]">
            {spentValue}
          </p>
          <Receipt
            size={42}
            strokeWidth={1.5}
            className="pointer-events-none absolute -bottom-2 -right-2 text-[#1A1C1D] opacity-10"
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}

function ActionButtons({ suspendLabel, onSuspend, onBan }) {
  return (
    <section className="flex items-center gap-3">
      <button
        type="button"
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-[#E8E8E9] text-[#1A1C1D] transition-colors hover:bg-[#D9D9DA]"
      >
        <Wallet size={14} strokeWidth={2} aria-hidden />
        <span className="text-sm font-bold uppercase tracking-[0.05em]">Wallet</span>
      </button>
      <button
        type="button"
        onClick={onSuspend}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-[#FFDAD6]/50 text-[#BA1A1A] transition-colors hover:bg-[#FFDAD6]"
      >
        <PauseCircle size={15} strokeWidth={2} aria-hidden />
        <span className="text-sm font-bold uppercase tracking-[0.05em]">{suspendLabel}</span>
      </button>
      <button
        type="button"
        onClick={onBan}
        aria-label="Ban user"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#BA1A1A] text-white transition-colors hover:bg-[#9A1616]"
      >
        <Ban size={20} strokeWidth={2} aria-hidden />
      </button>
    </section>
  )
}

function OrderCard({ order }) {
  const isCancelled = order.status === 'canceled' || order.status === 'cancelled'
  const pill = orderStatusStyles[order.status] ?? orderStatusStyles.delivered

  return (
    <article
      className={`rounded-xl border border-[#E0C0B1]/15 bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${
        isCancelled ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="inline-flex w-fit rounded-sm bg-[#F3F3F4] px-2 py-1 text-sm text-[#584237]">
            #{order.id}
          </span>
          <h3 className="truncate text-base font-bold text-[#1A1C1D]">
            {order.destination}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-sm font-bold uppercase ${pill.bg} ${pill.text}`}
        >
          {order.statusLabel}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-base text-[#584237]">
          {order.dateDay}, {order.dateTime}
        </p>
        <p
          className={`text-base font-bold text-[#1A1C1D] ${
            isCancelled ? 'line-through' : ''
          }`}
        >
          {order.amount}
        </p>
      </div>
    </article>
  )
}

function NotesList({ notes }) {
  if (!notes?.items?.length) {
    return (
      <p className="rounded-lg bg-white p-6 text-center text-sm text-[#584237]">
        No notes for this user yet.
      </p>
    )
  }
  return (
    <ul className="space-y-3">
      {notes.items.map((note) => (
        <li
          key={note.id}
          className="rounded-xl border border-[#E0C0B1]/15 bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#1A1C1D]">{note.author}</p>
            <p className="text-[11px] font-medium text-[#584237]/70">{note.createdAt}</p>
          </div>
          <p className="mt-1 text-sm text-[#584237]">{note.body}</p>
        </li>
      ))}
    </ul>
  )
}

function TransactionsList({ transactions }) {
  if (!transactions?.rows?.length) {
    return (
      <p className="rounded-lg bg-white p-6 text-center text-sm text-[#584237]">
        No transactions on file.
      </p>
    )
  }
  return (
    <ul className="space-y-3">
      {transactions.rows.map((row) => (
        <li
          key={row.id}
          className="rounded-xl border border-[#E0C0B1]/15 bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-sm bg-[#F3F3F4] px-2 py-1 text-xs text-[#584237]">
                #{row.id}
              </span>
              <p className="mt-2 truncate text-sm font-bold text-[#1A1C1D]">
                {row.channel}
              </p>
            </div>
            <span className={`shrink-0 text-sm font-bold ${row.amountTone ?? 'text-[#1A1C1D]'}`}>
              {row.amount}
            </span>
          </div>
          <p className="mt-2 text-xs text-[#584237]">
            {row.dateDay}, {row.dateTime} · {row.statusLabel}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default function AdminUserDetailMobilePage({ user, onSuspend, onBan }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')

  const kpiMap = useMemo(() => {
    const map = {}
    for (const k of user.kpis ?? []) map[k.id] = k
    return map
  }, [user.kpis])

  const ordersValue = kpiMap.orders?.value ?? '0'
  const walletValue = (kpiMap.wallet?.value ?? '₦0').replace(/^₦/, '')
  const spentValue = (kpiMap.spent?.value ?? '₦0').replace(/^₦/, '')

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/admin/users')
  }

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'notes', label: 'Notes' },
  ]

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-[#F9F9FA]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-white/80 px-5 py-4 shadow-[0px_12px_32px_rgba(26,28,29,0.06)] backdrop-blur-md">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1C1D]/60 transition-colors hover:bg-gray-100"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
        </button>
        <h1 className="flex-1 text-center text-xl font-bold tracking-[-0.025em] text-[#1A1C1D]">
          User Profile
        </h1>
        <button
          type="button"
          aria-label="More actions"
          className="flex h-8 w-5 items-center justify-center text-[#1A1C1D]/60 transition-colors hover:text-[#1A1C1D]"
        >
          <MoreVertical size={16} strokeWidth={2.25} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-6">
        <div className="space-y-6">
          <ProfileCard user={user} />

          <StatsBento
            ordersValue={ordersValue}
            walletValue={walletValue}
            spentValue={spentValue}
          />

          <ActionButtons
            suspendLabel={user.suspendLabel}
            onSuspend={onSuspend}
            onBan={onBan}
          />

          <section>
            <nav
              className="flex items-end gap-6 border-b border-[#F3F3F4]"
              aria-label="User detail sections"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-2 text-base uppercase tracking-[0.05em] transition-colors ${
                      isActive
                        ? 'font-bold text-[#9D4300]'
                        : 'font-semibold text-[#584237]/60 hover:text-[#1A1C1D]'
                    }`}
                  >
                    {tab.label}
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute -bottom-px left-0 right-0 h-1 rounded-t-md bg-[#9D4300]"
                      />
                    ) : null}
                  </button>
                )
              })}
            </nav>

            <div className="mt-4">
              {activeTab === 'orders' ? (
                <div className="space-y-4">
                  {(user.orderHistory?.rows ?? []).map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                  {(user.orderHistory?.rows ?? []).length === 0 ? (
                    <p className="rounded-lg bg-white p-6 text-center text-sm text-[#584237]">
                      No orders yet.
                    </p>
                  ) : null}
                </div>
              ) : activeTab === 'transactions' ? (
                <TransactionsList transactions={user.transactions} />
              ) : (
                <NotesList notes={user.notes} />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
