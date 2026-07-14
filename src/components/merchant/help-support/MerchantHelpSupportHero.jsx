import { Search } from 'lucide-react'

export default function MerchantHelpSupportHero({ hero }) {
  return (
    <section className="overflow-hidden rounded-merchant-panel bg-gradient-to-br from-merchant-primary via-[#5248F0] to-[#6D4FD8] px-6 py-8 shadow-merchant-panel lg:px-8 lg:py-10">
      <h2 className="max-w-xl text-2xl font-bold leading-tight tracking-[-0.02em] text-white lg:text-[1.75rem]">
        {hero.title}
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85 lg:text-base">
        {hero.subtitle}
      </p>

      <label className="relative mt-6 block max-w-xl">
        <span className="sr-only">Search for help</span>
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-merchant-muted"
          strokeWidth={2}
          aria-hidden
        />
        <input
          type="search"
          placeholder={hero.searchPlaceholder}
          className="w-full rounded-xl border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-merchant-ink shadow-sm outline-none placeholder:text-merchant-muted focus:ring-2 focus:ring-white/40"
        />
      </label>
    </section>
  )
}
