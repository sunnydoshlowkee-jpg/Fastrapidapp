export default function MerchantRegistrationPanel({ panel }) {
  return (
    <aside className="relative hidden overflow-hidden bg-merchant-input xl:block xl:w-[min(420px,32vw)] xl:shrink-0">
      <img
        src={panel.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top opacity-90 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-merchant-canvas/80 via-merchant-canvas/20 to-transparent" />

      <div className="relative flex h-full min-h-screen items-end p-8">
        <div className="w-full max-w-sm rounded-merchant-stat bg-merchant-surface p-6 shadow-merchant-panel">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-merchant-nav-active text-lg font-bold text-merchant-primary">
            R
          </span>
          <h2 className="mt-4 text-lg font-bold leading-snug text-merchant-ink">{panel.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-merchant-muted">{panel.description}</p>
          <ul className="mt-4 space-y-2">
            {panel.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-merchant-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-merchant-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
