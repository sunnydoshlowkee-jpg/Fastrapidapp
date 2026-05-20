export default function MerchantMenuItemCreateCardIntro({ title, subtitle }) {
  return (
    <div className="border-b border-merchant-divider pb-5">
      <h2 className="text-lg font-bold tracking-[-0.02em] text-merchant-ink">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-merchant-muted">{subtitle}</p>
    </div>
  )
}
