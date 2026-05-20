import { Search } from 'lucide-react'

export default function MerchantHelpSupportMobileHero({ hero }) {
  return (
    <section className="overflow-hidden rounded-merchant-stat bg-gradient-to-br from-merchant-primary via-[#5248F0] to-[#6D4FD8] px-5 py-6 shadow-merchant-stat">
      <h2 className="text-xl font-bold leading-tight tracking-[-0.02em] text-white">
        {hero.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/85">{hero.subtitle}</p>

      <label className="relative mt-5 block">
        <span className="sr-only">Search knowledge base</span>
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-merchant-primary"
          strokeWidth={2}
          aria-hidden
        />
        <input
          type="search"
          placeholder={hero.searchPlaceholder}
          className="w-full rounded-xl border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-merchant-ink outline-none placeholder:text-merchant-muted focus:ring-2 focus:ring-white/40"
        />
      </label>
    </section>
  )
}
