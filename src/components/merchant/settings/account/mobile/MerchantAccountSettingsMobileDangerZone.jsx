export default function MerchantAccountSettingsMobileDangerZone({ dangerZone }) {
  return (
    <section className="overflow-hidden rounded-merchant-stat border-l-4 border-red-600 bg-merchant-surface shadow-merchant-stat">
      <div className="p-4">
        <h2 className="text-base font-bold text-red-600">{dangerZone.title}</h2>
        <p className="mt-1 text-sm text-merchant-muted">{dangerZone.description}</p>

        <div className="mt-4 rounded-lg bg-merchant-input p-4">
          <p className="text-sm font-bold text-merchant-ink">{dangerZone.deactivateTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-merchant-muted">
            {dangerZone.deactivateDescription}
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-[#B91C1C] py-3 text-sm font-semibold text-white"
          >
            {dangerZone.deactivateLabel}
          </button>
        </div>
      </div>
    </section>
  )
}
