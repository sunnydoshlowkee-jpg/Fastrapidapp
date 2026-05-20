export default function MerchantSettingsIntro({ heading, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink lg:text-[28px]">
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-merchant-muted lg:text-base">{subtitle}</p>
    </div>
  )
}
