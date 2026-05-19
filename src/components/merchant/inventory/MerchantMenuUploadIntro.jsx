export default function MerchantMenuUploadIntro({ heading, subheading }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink md:text-[28px] md:leading-tight">
        {heading}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-merchant-muted md:text-base">{subheading}</p>
    </div>
  )
}
