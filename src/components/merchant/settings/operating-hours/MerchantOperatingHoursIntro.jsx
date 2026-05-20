export default function MerchantOperatingHoursIntro({ title, description }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink lg:text-[1.75rem]">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-merchant-muted lg:text-base">
        {description}
      </p>
    </div>
  )
}


