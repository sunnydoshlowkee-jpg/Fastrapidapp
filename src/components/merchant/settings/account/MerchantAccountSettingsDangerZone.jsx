import MerchantAccountSettingsSection from './MerchantAccountSettingsSection'
import { legalMailto } from '../../../../services/data/legalPaths'

export default function MerchantAccountSettingsDangerZone({ dangerZone }) {
  const aside = (
    <>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-red-600">{dangerZone.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-merchant-muted">{dangerZone.description}</p>
    </>
  )

  const mailto = legalMailto({
    subject: 'Merchant account deactivation request',
    body: 'Please deactivate my FastRapid merchant account.\n\nBusiness name:\nRegistered email:\nReason:\n',
  })

  return (
    <MerchantAccountSettingsSection aside={aside} danger>
      <div className="rounded-merchant-stat border border-red-200 bg-red-50/80 p-5 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-base font-bold text-merchant-ink">{dangerZone.deactivateTitle}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">
              {dangerZone.deactivateDescription} Requests are handled by support — this opens a prefilled email.
            </p>
          </div>
          <a
            href={mailto}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#B91C1C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#991B1B] sm:ml-4"
          >
            {dangerZone.deactivateLabel}
          </a>
        </div>
      </div>
    </MerchantAccountSettingsSection>
  )
}
