export default function MerchantMenuItemCreateIntro({ title, subtitle }) {
  return (
    <div className="text-center lg:text-left">
      <h2 className="hidden text-2xl font-bold tracking-[-0.02em] text-merchant-ink lg:block">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-merchant-muted md:text-base lg:mt-2">
        {subtitle}
      </p>
    </div>
  )
}
