export default function MerchantMenuUploadIntro({ heading, subheading }) {
  return (
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-[30px] font-bold leading-9 tracking-[-0.75px] text-merchant-ink">
        {heading}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-6 text-merchant-body">{subheading}</p>
    </div>
  )
}
