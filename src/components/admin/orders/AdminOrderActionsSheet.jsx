import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Bike,
  ChevronRight,
  NotebookPen,
  RotateCcw,
  Wallet,
  X,
  XCircle,
} from 'lucide-react'

const actionIcons = {
  bike: Bike,
  wallet: Wallet,
  note: NotebookPen,
  refund: RotateCcw,
  cancel: XCircle,
}

const toneStyles = {
  orange: {
    iconBg: 'bg-[#FFDBCA]',
    iconColor: 'text-[#9D4300]',
    rowBg: 'bg-white',
    titleColor: 'text-gray-900',
    descriptionColor: 'text-[#584237]',
  },
  neutral: {
    iconBg: 'bg-[#E8E8E9]',
    iconColor: 'text-gray-900',
    rowBg: 'bg-white',
    titleColor: 'text-gray-900',
    descriptionColor: 'text-[#584237]',
  },
  purple: {
    iconBg: 'bg-[#DDB7FF]',
    iconColor: 'text-[#842BD2]',
    rowBg: 'bg-[#F9F9FA]',
    titleColor: 'text-[#842BD2]',
    descriptionColor: 'text-[#4C0084]/70',
  },
  danger: {
    iconBg: 'bg-[#FFDAD6]',
    iconColor: 'text-[#BA1A1A]',
    rowBg: 'bg-[#F9F9FA]',
    titleColor: 'text-[#BA1A1A]',
    descriptionColor: 'text-[#93000A]/70',
  },
}

export default function AdminOrderActionsSheet({ open, order, sheet, onClose, onAction }) {
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

  const customerName = order?.stakeholders?.customer?.name ?? ''
  const statusLabel = order?.statusLabel ?? ''
  const subtitle = [customerName, statusLabel].filter(Boolean).join(' • ')

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`${sheet.titlePrefix} #${order?.id ?? ''}`}
    >
      <button
        type="button"
        aria-label={sheet.closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-[#2F3132]/40 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-[28rem] rounded-t-[32px] bg-white shadow-[0px_-8px_32px_rgba(26,28,29,0.1)]">
        <div className="flex justify-center pb-2 pt-4">
          <span
            className="h-1.5 w-12 rounded-full bg-[#E8E8E9]"
            aria-hidden
          />
        </div>

        <div className="flex items-center justify-between gap-4 px-6 pb-4 pt-2">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-[#191C1D]">
              {sheet.titlePrefix} #{order?.id}
            </h2>
            <p className="mt-1 truncate text-sm text-[#454557]">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={sheet.closeLabel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F3F4] text-gray-900 transition-colors hover:bg-gray-200"
          >
            <X size={14} strokeWidth={2.25} />
          </button>
        </div>

        <ul className="flex flex-col gap-2 px-4 pb-8">
          {sheet.items.map((item) => {
            const Icon = actionIcons[item.icon] ?? Bike
            const tone = toneStyles[item.tone] ?? toneStyles.neutral
            return (
              <li key={item.id} className={item.spacingTop ? 'pt-2' : undefined}>
                <button
                  type="button"
                  onClick={() => {
                    onAction?.(item.id)
                    onClose?.()
                  }}
                  className={`flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-colors hover:bg-gray-50 ${tone.rowBg}`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tone.iconBg}`}
                  >
                    <Icon size={20} strokeWidth={2} className={tone.iconColor} aria-hidden />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className={`text-base font-semibold ${tone.titleColor}`}>
                      {item.label}
                    </span>
                    <span className={`mt-0.5 text-sm font-normal ${tone.descriptionColor}`}>
                      {item.description}
                    </span>
                  </span>
                  {item.chevron ? (
                    <ChevronRight
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 text-[#DADADB]"
                      aria-hidden
                    />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>,
    document.body,
  )
}
