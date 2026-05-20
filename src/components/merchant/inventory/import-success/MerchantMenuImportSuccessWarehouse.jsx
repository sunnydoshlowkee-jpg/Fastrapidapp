import { CheckCircle2 } from 'lucide-react'

export default function MerchantMenuImportSuccessWarehouse({ warehouse, variant = 'desktop' }) {
  const isMobile = variant === 'mobile'

  if (isMobile) {
    return (
      <article className="relative min-h-[140px] overflow-hidden rounded-merchant-stat shadow-merchant-stat">
        <img
          src={warehouse.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative flex min-h-[140px] flex-col justify-end p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <CheckCircle2 size={16} className="shrink-0 text-merchant-primary" strokeWidth={2} aria-hidden />
            {warehouse.caption}
          </p>
        </div>
      </article>
    )
  }

  return (
    <article className="relative min-h-[220px] overflow-hidden rounded-merchant-stat shadow-merchant-stat sm:min-h-[260px]">
      <img
        src={warehouse.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
      <div className="relative flex h-full min-h-[220px] flex-col justify-end p-5 sm:min-h-[260px] sm:p-6">
        <p className="max-w-sm text-lg font-bold leading-snug text-white sm:text-xl">
          {warehouse.headline}
        </p>
        <p className="mt-2 text-sm text-white/80">{warehouse.lastSync}</p>
      </div>
    </article>
  )
}
