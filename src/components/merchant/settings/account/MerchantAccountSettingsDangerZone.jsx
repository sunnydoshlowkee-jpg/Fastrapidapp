import MerchantAccountSettingsSection from './MerchantAccountSettingsSection'

export default function MerchantAccountSettingsDangerZone({ dangerZone }) {
  const aside = (
    <>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-red-600">{dangerZone.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-merchant-muted">{dangerZone.description}</p>
    </>
  )

  return (
    <MerchantAccountSettingsSection aside={aside} danger>
      <div className="rounded-merchant-stat border border-red-200 bg-red-50/80 p-5 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-base font-bold text-merchant-ink">{dangerZone.deactivateTitle}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">
              {dangerZone.deactivateDescription}
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg bg-[#B91C1C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#991B1B] sm:ml-4"
          >
            {dangerZone.deactivateLabel}
          </button>
        </div>
      </div>
    </MerchantAccountSettingsSection>
  )
}
