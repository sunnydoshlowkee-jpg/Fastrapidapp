export default function MerchantAccountSettingsMobileHeader({ title, merchantId }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-lg font-bold tracking-[-0.02em] text-merchant-ink">{title}</h1>
      <span className="text-sm font-medium text-merchant-muted">ID: {merchantId}</span>
    </header>
  )
}
