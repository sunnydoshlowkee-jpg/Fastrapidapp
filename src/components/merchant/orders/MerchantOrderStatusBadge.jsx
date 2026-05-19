const statusStyles = {
  desktop: {
    new: 'bg-merchant-nav-active text-merchant-primary',
    preparing: 'bg-[rgba(230,126,34,0.14)] text-[#E67E22]',
    ready: 'bg-[rgba(67,66,255,0.1)] text-merchant-primary',
    dispatched: 'bg-merchant-icon-tile text-merchant-body',
    delivered: 'bg-[rgba(34,197,94,0.14)] text-[#16A34A]',
  },
  mobile: {
    new: 'bg-[rgba(139,92,246,0.14)] text-[#7C3AED]',
    preparing: 'bg-[rgba(230,126,34,0.14)] text-[#E67E22]',
    ready: 'bg-[rgba(67,66,255,0.1)] text-merchant-primary',
    dispatched: 'bg-merchant-icon-tile text-merchant-body',
    delivered: 'bg-[rgba(34,197,94,0.14)] text-[#16A34A]',
  },
}

const statusLabels = {
  new: 'New',
  preparing: 'Preparing',
  ready: 'Ready',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
}

export default function MerchantOrderStatusBadge({ status, variant = 'desktop' }) {
  const palette = statusStyles[variant] || statusStyles.desktop

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:px-2.5 sm:py-1 sm:text-xs sm:capitalize ${palette[status] || palette.new}`}
    >
      {statusLabels[status] || status}
    </span>
  )
}
