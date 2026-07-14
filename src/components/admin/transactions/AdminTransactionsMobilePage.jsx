import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownLeft, ArrowUpRight, Landmark, Search } from 'lucide-react'
import { ADMIN_TRANSACTIONS_PATH } from '../../../services/data/adminTransactions.mock'

const typeChipStyles = {
  payment: 'text-[#9D4300]',
  refund: 'text-[#8F4D27]',
  payout: 'text-[#584237]',
}

const typeIcons = {
  payment: ArrowDownLeft,
  refund: ArrowUpRight,
  payout: Landmark,
}

const statusDotStyles = {
  success: 'bg-[#22C55E]',
  pending: 'bg-[#F59E0B]',
  failed: 'bg-[#BA1A1A]',
}

const statusTextStyles = {
  success: 'text-[#22C55E]',
  pending: 'text-[#F59E0B]',
  failed: 'text-[#BA1A1A]',
}

const filterTypeMap = {
  payments: 'payment',
  refunds: 'refund',
  payouts: 'payout',
}

function TransactionCard({ tx }) {
  const Icon = typeIcons[tx.type] ?? ArrowDownLeft
  const isHistoric = tx.historic ?? false
  const decoration = tx.decoration

  return (
    <Link
      to={`${ADMIN_TRANSACTIONS_PATH}/${tx.id}`}
      className={`relative block overflow-hidden rounded-xl bg-white p-4 shadow-[0px_4px_24px_rgba(26,28,29,0.03)] transition-colors hover:bg-gray-50 ${
        isHistoric ? 'opacity-80' : ''
      }`}
    >
      {decoration === 'orangeGradient' ? (
        <span
          className="pointer-events-none absolute right-0 top-0 h-16 w-16"
          style={{
            background:
              'linear-gradient(225deg, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0) 100%)',
            borderRadius: '0 0 0 24px',
          }}
          aria-hidden
        />
      ) : null}
      {decoration === 'redOverlay' ? (
        <span
          className="pointer-events-none absolute inset-0 bg-[#BA1A1A]/[0.05]"
          aria-hidden
        />
      ) : null}

      <div className="relative space-y-3">
        <div className="flex items-center justify-between gap-4 text-xs text-[#584237]">
          <span className="font-medium tracking-[0.05em]">#{tx.id}</span>
          <span>{tx.timestamp}</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold tracking-[-0.025em] text-[#1A1C1D]">
              {tx.customer}
            </h3>
            <span
              className={`mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#F3F3F4] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] ${
                typeChipStyles[tx.type] ?? typeChipStyles.payout
              }`}
            >
              <Icon size={10} strokeWidth={2.5} aria-hidden />
              {tx.typeLabel}
            </span>
          </div>

          <div className="text-right">
            <p
              className={`text-xl font-extrabold leading-7 tracking-[-0.05em] text-[#842BD2] ${
                tx.amountStrikethrough
                  ? 'line-through decoration-[#842BD2]/40 decoration-2'
                  : ''
              }`}
            >
              {tx.amount}
            </p>
            <div className="mt-1 inline-flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  statusDotStyles[tx.status] ?? statusDotStyles.success
                }`}
                aria-hidden
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.1em] ${
                  statusTextStyles[tx.status] ?? statusTextStyles.success
                }`}
              >
                {tx.statusLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function AdminTransactionsMobilePage({ data }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')

  const items = data.mobileTransactions ?? []

  const filtered = useMemo(() => {
    let list = items
    if (activeFilter !== 'all') {
      const type = filterTypeMap[activeFilter]
      if (type) list = list.filter((tx) => tx.type === type)
    }
    const trimmed = query.trim().toLowerCase()
    if (trimmed) {
      list = list.filter((tx) =>
        [tx.id, tx.customer, tx.amount].some((v) =>
          v.toLowerCase().includes(trimmed),
        ),
      )
    }
    return list
  }, [activeFilter, items, query])

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto bg-[#F9F9FA] pb-12">
      <section className="space-y-5 px-5 pt-6">
        <div>
          <h1 className="text-[30px] font-extrabold leading-9 tracking-[-0.05em] text-[#1A1C1D]">
            {data.mobileTitle ?? 'Transactions'}
          </h1>
          <p className="mt-1 text-sm text-[#584237]">
            {data.mobileSubtitle ?? 'Manage all rapid ecosystem flows.'}
          </p>
        </div>

        <div className="relative">
          <Search
            size={15}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#584237]"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              data.mobileSearchPlaceholder ?? 'Search ref, user, or amount...'
            }
            className="w-full rounded-lg bg-[#F3F3F4] py-3 pl-10 pr-4 text-sm text-[#1A1C1D] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline-none placeholder:text-[#584237]/80 focus:ring-2 focus:ring-rapid-orange/20"
          />
        </div>

        <nav
          className="-mx-5 flex gap-2 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Filter transactions"
        >
          {(data.mobileFilters ?? []).map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-shadow ${
                  isActive
                    ? 'text-white shadow-[0px_2px_8px_rgba(249,115,22,0.2)]'
                    : 'bg-white text-[#584237] hover:bg-gray-50'
                }`}
                style={
                  isActive
                    ? {
                        backgroundImage:
                          'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
                      }
                    : undefined
                }
              >
                {filter.label}
              </button>
            )
          })}
        </nav>
      </section>

      <div className="space-y-4 px-5 pt-5">
        {filtered.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-center text-sm text-[#584237]">
            No transactions match these filters.
          </p>
        ) : (
          filtered.map((tx) => <TransactionCard key={tx.id} tx={tx} />)
        )}
      </div>
    </div>
  )
}
