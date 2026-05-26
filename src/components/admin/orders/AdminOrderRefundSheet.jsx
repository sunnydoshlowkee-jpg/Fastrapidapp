import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, ChevronDown, X } from 'lucide-react'

export default function AdminOrderRefundSheet({ open, order, sheet, onClose, onConfirm }) {
  const [methodId, setMethodId] = useState(sheet?.defaultMethodId ?? null)
  const [amount, setAmount] = useState(sheet?.defaultAmount ?? '')
  const [reason, setReason] = useState(sheet?.defaultReason ?? '')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!open || !sheet) return
    setMethodId(sheet.defaultMethodId ?? null)
    setAmount(sheet.defaultAmount ?? '')
    setReason(sheet.defaultReason ?? '')
    setNotes('')
  }, [open, sheet])

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

  if (!open || !sheet) return null

  const orderSubtitle = `${sheet.orderPrefix} #${order?.id ?? ''}`

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
        className="absolute inset-0 bg-[#1A1C1D]/40 backdrop-blur-sm"
      />

      <div className="relative z-10 flex h-[92vh] max-h-[850px] w-full max-w-[28rem] flex-col overflow-hidden rounded-t-[32px] bg-white shadow-[0px_-12px_48px_rgba(26,28,29,0.12)]">
        <div className="flex justify-center pb-2 pt-4">
          <span
            className="h-1.5 w-12 rounded-full bg-[#E2E2E3]"
            aria-hidden
          />
        </div>

        <div className="flex items-start justify-between gap-4 px-6 pb-6 pt-2">
          <div className="min-w-0">
            <h2 className="text-[22px] font-bold tracking-[-0.025em] text-gray-900">
              {sheet.title}
            </h2>
            <p className="mt-1 truncate text-sm text-[#584237]">{orderSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={sheet.closeLabel}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3F3F4] text-[#584237] transition-colors hover:bg-gray-200"
          >
            <X size={14} strokeWidth={2.25} />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 pb-32">
          <section className="flex flex-col items-center justify-center rounded-2xl bg-[#F3F3F4] px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#584237]">
              {sheet.eligibleLabel}
            </p>
            <p className="mt-1 text-[36px] font-extrabold leading-[1.4] tracking-[-0.05em] text-[#842BD2]">
              {sheet.currency}
              {sheet.eligibleAmount}
            </p>
          </section>

          <section className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
              {sheet.methodLabel}
            </label>
            <div className="grid grid-cols-3 gap-0 rounded-xl bg-[#F3F3F4] p-1">
              {sheet.methods.map((method) => {
                const isSelected = methodId === method.id
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setMethodId(method.id)}
                    className={`flex items-center justify-center rounded-lg py-2.5 text-sm transition-colors ${
                      isSelected
                        ? 'bg-white font-semibold text-[#9D4300] shadow-[0px_2px_8px_rgba(26,28,29,0.04)]'
                        : 'font-medium text-[#584237]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {method.label}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="space-y-2">
            <label
              htmlFor="refund-amount"
              className="block text-sm font-semibold text-gray-900"
            >
              {sheet.amountLabel}
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-medium text-[#584237]"
                aria-hidden
              >
                {sheet.currency}
              </span>
              <input
                id="refund-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl bg-[#F3F3F4] py-3.5 pl-9 pr-4 text-base font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-rapid-orange/30"
              />
            </div>
          </section>

          <section className="space-y-2">
            <label
              htmlFor="refund-reason"
              className="block text-sm font-semibold text-gray-900"
            >
              {sheet.reasonLabel}
            </label>
            <div className="relative">
              <select
                id="refund-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full appearance-none rounded-xl bg-[#F3F3F4] py-3.5 pl-4 pr-10 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-rapid-orange/30"
              >
                {sheet.reasonOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#584237]"
                aria-hidden
              />
            </div>
          </section>

          <section className="space-y-2">
            <label
              htmlFor="refund-notes"
              className="block text-sm font-semibold text-gray-900"
            >
              {sheet.notesLabel}
            </label>
            <textarea
              id="refund-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={sheet.notesPlaceholder}
              rows={3}
              className="w-full resize-none rounded-xl bg-[#F3F3F4] px-4 py-4 text-sm text-gray-900 outline-none placeholder:text-[#6B7280] focus:ring-2 focus:ring-rapid-orange/30"
            />
          </section>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-[#E2E2E3]/20 bg-white/90 px-6 py-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              onConfirm?.({ methodId, amount, reason, notes })
              onClose?.()
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-[0.05em] text-white shadow-[0px_8px_24px_rgba(132,43,210,0.25)] transition-opacity hover:opacity-95"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #BE7BFF 0%, #842BD2 100%)',
            }}
          >
            <CheckCircle2 size={16} strokeWidth={2.5} aria-hidden />
            {sheet.ctaLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
