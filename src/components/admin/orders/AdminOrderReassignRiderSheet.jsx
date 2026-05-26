import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, MapPin, Search, Star, X } from 'lucide-react'

function RiderCard({ rider, isSelected, isDisabled, onSelect, busyLabel }) {
  const handleClick = () => {
    if (isDisabled) return
    onSelect(rider.id)
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`relative flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors ${
          isSelected
            ? 'border-2 border-[#9D4300]/40 bg-[#9D4300]/5'
            : 'border border-[#E0C0B1]/30 bg-white'
        } ${isDisabled ? 'opacity-50' : 'hover:bg-gray-50'}`}
        aria-pressed={isSelected}
      >
        <span className="relative shrink-0">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${rider.avatarBg ?? 'bg-gray-200'} ${rider.avatarColor ?? 'text-gray-700'}`}
          >
            {rider.initials}
          </span>
          <span
            className={`absolute -bottom-0 -right-0 h-3 w-3 rounded-full border-2 border-white ${
              rider.status === 'busy' ? 'bg-[#BA1A1A]' : 'bg-emerald-500'
            }`}
            aria-hidden
          />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold tracking-[-0.025em] text-gray-900">
            {rider.name}
          </span>
          {rider.status === 'busy' ? (
            <span className="text-xs font-semibold text-[#BA1A1A]">
              {busyLabel}
            </span>
          ) : (
            <span className="flex items-center gap-2 text-xs text-[#584237]">
              <span className="flex items-center gap-1 font-semibold">
                <MapPin size={10} strokeWidth={2} aria-hidden />
                {rider.distance}
              </span>
              <span
                className="h-1 w-1 rounded-full bg-[#DADADB]"
                aria-hidden
              />
              <span className="flex items-center gap-1 font-bold">
                <Star
                  size={10}
                  strokeWidth={2}
                  className="fill-[#584237] text-[#584237]"
                  aria-hidden
                />
                {rider.rating}
              </span>
            </span>
          )}
        </span>

        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
            isDisabled
              ? 'border-[#DADADB] bg-[#EEEEEF]'
              : 'border-[#DADADB] bg-white'
          }`}
          aria-hidden
        >
          {isSelected && !isDisabled ? (
            <span className="h-2.5 w-2.5 rounded-full bg-[#9D4300]" />
          ) : null}
        </span>
      </button>
    </li>
  )
}

export default function AdminOrderReassignRiderSheet({ open, sheet, onClose, onConfirm }) {
  const defaultId = sheet?.defaultSelectedId ?? null
  const [selectedId, setSelectedId] = useState(defaultId)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (open) {
      setSelectedId(defaultId)
      setQuery('')
    }
  }, [open, defaultId])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  const filteredRiders = useMemo(() => {
    if (!sheet?.riders) return []
    const q = query.trim().toLowerCase()
    if (!q) return sheet.riders
    return sheet.riders.filter((r) => r.name.toLowerCase().includes(q))
  }, [sheet?.riders, query])

  if (!open || !sheet) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={sheet.title}
    >
      <button
        type="button"
        aria-label={sheet.closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-[#2F3132]/40 backdrop-blur-sm"
      />

      <div className="relative z-10 flex h-[78vh] max-h-[800px] w-full max-w-[28rem] flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0px_-8px_32px_rgba(26,28,29,0.12)]">
        <div className="bg-white px-6 pt-4">
          <div className="flex justify-center pb-6">
            <span
              className="h-1.5 w-12 rounded-full bg-[#DADADB]"
              aria-hidden
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[22px] font-bold tracking-[-0.025em] text-gray-900">
              {sheet.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={sheet.closeLabel}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3F3F4] text-[#584237] transition-colors hover:bg-gray-200"
            >
              <X size={14} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div className="bg-white px-6 py-4 shadow-[0px_4px_12px_rgba(26,28,29,0.02)]">
          <div className="relative">
            <Search
              size={18}
              strokeWidth={2}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={sheet.searchPlaceholder}
              className="w-full rounded-xl bg-[#F3F3F4] px-11 py-4 text-sm font-medium text-gray-900 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline-none placeholder:text-[#584237]/70 focus:ring-2 focus:ring-rapid-orange/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-4 px-6 py-4">
            {filteredRiders.length === 0 ? (
              <li className="rounded-xl bg-[#F3F3F4] p-6 text-center text-sm text-[#584237]">
                No riders match your search.
              </li>
            ) : (
              filteredRiders.map((rider) => (
                <RiderCard
                  key={rider.id}
                  rider={rider}
                  isSelected={selectedId === rider.id}
                  isDisabled={rider.status === 'busy'}
                  onSelect={setSelectedId}
                  busyLabel={sheet.busyLabel}
                />
              ))
            )}
          </ul>
        </div>

        <div className="border-t border-[#E8E8E9] bg-white px-6 py-6">
          <button
            type="button"
            onClick={() => {
              onConfirm?.(selectedId)
              onClose?.()
            }}
            disabled={!selectedId}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-[0.05em] text-white shadow-[0px_8px_20px_rgba(249,115,22,0.25)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
            }}
          >
            {sheet.ctaLabel}
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
