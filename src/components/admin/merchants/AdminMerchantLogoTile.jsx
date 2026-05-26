export default function AdminMerchantLogoTile({ merchant, size = 56 }) {
  if (merchant.logoStyle === 'kowope') {
    return (
      <span
        className="relative flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl bg-[#0E1430] text-white shadow-sm"
        style={{ width: size, height: size }}
        aria-label={merchant.name}
      >
        <svg
          viewBox="0 0 80 30"
          className="absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2"
          aria-hidden
        >
          <defs>
            <linearGradient id="kowope-arch" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5DE0E6" />
              <stop offset="50%" stopColor="#A5F0A4" />
              <stop offset="100%" stopColor="#F4D26B" />
            </linearGradient>
          </defs>
          <path
            d="M2 26 C 18 4, 62 4, 78 26"
            fill="none"
            stroke="url(#kowope-arch)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <span className="mt-3 text-[8px] font-bold leading-none tracking-[0.12em]">
          {merchant.logoGlyph}
        </span>
        <span className="mt-0.5 text-[6px] font-semibold leading-none tracking-[0.25em] text-gray-400">
          {merchant.logoSubglyph}
        </span>
      </span>
    )
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
        merchant.logoTone ?? 'bg-gray-100 text-gray-700'
      }`}
      style={{ width: size, height: size }}
    >
      {merchant.logoGlyph}
    </span>
  )
}
