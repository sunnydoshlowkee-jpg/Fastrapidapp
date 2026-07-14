import { useState } from 'react'
import MerchantAccountSettingsField from '../MerchantAccountSettingsField'

export default function MerchantAccountSettingsMobileProfile({ profile }) {
  const [form, setForm] = useState({
    fullName: profile.fields.fullName.value,
    email: profile.fields.email.value,
    phone: profile.fields.phone.value,
  })

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <section className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">{profile.title}</h2>
      <p className="mt-1 text-sm text-merchant-muted">{profile.description}</p>

      <form onSubmit={(e) => e.preventDefault()} className="mt-5 space-y-4">
        <MerchantAccountSettingsField
          id="mobile-fullName"
          label={profile.fields.fullName.label}
          value={form.fullName}
          onChange={update('fullName')}
          variant="mobile"
        />
        <MerchantAccountSettingsField
          id="mobile-email"
          label={profile.fields.email.label}
          type="email"
          value={form.email}
          onChange={update('email')}
          variant="mobile"
        />
        <MerchantAccountSettingsField
          id="mobile-phone"
          label={profile.fields.phone.label}
          value={form.phone}
          onChange={update('phone')}
          variant="mobile"
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-lg bg-merchant-primary px-5 py-2.5 text-sm font-semibold text-white shadow-merchant-btn"
          >
            {profile.saveLabel}
          </button>
        </div>
      </form>
    </section>
  )
}
