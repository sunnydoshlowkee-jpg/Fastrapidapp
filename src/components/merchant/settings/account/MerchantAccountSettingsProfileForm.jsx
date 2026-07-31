import { useState } from 'react'
import MerchantAccountSettingsField from './MerchantAccountSettingsField'
import MerchantAccountSettingsSection from './MerchantAccountSettingsSection'

export default function MerchantAccountSettingsProfileForm({ profile }) {
  const [form] = useState({
    fullName: profile.fields.fullName.value,
    email: profile.fields.email.value,
    phone: profile.fields.phone.value,
  })
  const readOnly = Boolean(profile.readOnly)

  const aside = (
    <>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-merchant-ink">{profile.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-merchant-muted">{profile.description}</p>
    </>
  )

  return (
    <MerchantAccountSettingsSection aside={aside}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-merchant-stat border border-merchant-divider bg-merchant-surface p-5 shadow-merchant-stat lg:p-6"
      >
        <div className="space-y-5">
          <MerchantAccountSettingsField
            id="fullName"
            label={profile.fields.fullName.label}
            value={form.fullName}
            readOnly={readOnly}
          />
          <MerchantAccountSettingsField
            id="email"
            label={profile.fields.email.label}
            type="email"
            value={form.email}
            readOnly={readOnly}
          />
          <MerchantAccountSettingsField
            id="phone"
            label={profile.fields.phone.label}
            value={form.phone}
            readOnly={readOnly}
          />
        </div>

        {!readOnly ? (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-merchant-primary px-6 py-3 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
            >
              {profile.saveLabel}
            </button>
          </div>
        ) : (
          <p className="mt-6 text-xs text-merchant-muted">
            Account contact details are managed through support. Use Privacy &amp; Security for login preferences.
          </p>
        )}
      </form>
    </MerchantAccountSettingsSection>
  )
}
