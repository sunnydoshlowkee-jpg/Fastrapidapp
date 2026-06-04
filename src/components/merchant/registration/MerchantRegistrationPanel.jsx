export default function MerchantRegistrationPanel({ panel }) {
  return (
    <aside className="relative hidden overflow-hidden bg-merchant-onboarding-panel xl:block xl:w-[400px] xl:shrink-0">
      <img
        src={panel.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top opacity-30 mix-blend-overlay grayscale"
      />

      <div className="relative flex h-full min-h-screen items-end p-12">
        <div className="w-full max-w-[304px] rounded-2xl border border-white/20 bg-white/90 p-8 shadow-merchant-panel-card backdrop-blur-md">
          <span className="flex h-[25px] w-[33px] items-center justify-center text-2xl font-bold text-merchant-primary">
            R
          </span>
          <h2 className="mt-4 text-2xl font-normal leading-[30px] tracking-[-0.6px] text-merchant-ink">
            {panel.title}
          </h2>
          <p className="mt-4 text-sm leading-[23px] text-merchant-body">{panel.description}</p>
          <ul className="mt-4 space-y-4 pt-2">
            {panel.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.03em] text-merchant-ink"
              >
                <span className="h-2 w-2 shrink-0 rounded-xl bg-merchant-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}