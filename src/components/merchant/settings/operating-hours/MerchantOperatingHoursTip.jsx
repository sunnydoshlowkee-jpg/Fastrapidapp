export default function MerchantOperatingHoursTip({ tip }) {
  return (
    <aside className="rounded-merchant-stat bg-[#EEF0FF] p-5 lg:p-6">
      <h2 className="text-base font-bold text-merchant-link">{tip.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-merchant-primary/90">{tip.description}</p>
    </aside>
  )
}
