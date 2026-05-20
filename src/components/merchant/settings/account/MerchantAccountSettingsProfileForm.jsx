import { useState } from 'react'
import MerchantAccountSettingsField from './MerchantAccountSettingsField'
import MerchantAccountSettingsSection from './MerchantAccountSettingsSection'

export default function MerchantAccountSettingsProfileForm({ profile }) {
  const [form, setForm] = useState({
    fullName: profile.fields.fullName.value,
    email: profile.fields.email.value,
    phone: profile.fields.phone.value,
  })

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

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
            onChange={update('fullName')}
          />
          <MerchantAccountSettingsField
            id="email"
            label={profile.fields.email.label}
            type="email"
            value={form.email}
            onChange={update('email')}
          />
          <MerchantAccountSettingsField
            id="phone"
            label={profile.fields.phone.label}
            value={form.phone}
            onChange={update('phone')}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-merchant-primary px-6 py-3 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
          >
            {profile.saveLabel}
          </button>
        </div>
      </form>
    </MerchantAccountSettingsSection>
  )
}
