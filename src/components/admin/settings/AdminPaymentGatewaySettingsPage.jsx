import { useState } from 'react'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { ADMIN_PAYMENT_GATEWAY_SETTINGS } from '../../../services/data/adminPaymentGatewaySettings.mock'
import AdminPaymentCredentialField from './AdminPaymentCredentialField'

function ProviderTile({ provider, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(provider.id)}
      className={`relative flex w-full flex-col items-start gap-3 rounded-xl p-4 text-left transition-colors ${
        isSelected
          ? 'border-2 border-[#9D4300] bg-[#9D4300]/5'
          : 'border border-[#E2E2E3] bg-white hover:border-gray-300'
      }`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
        <span
          className="text-base font-bold"
          style={{ color: provider.initialColor }}
        >
          {provider.initial}
        </span>
      </span>
      <span className="text-sm font-semibold text-gray-900">{provider.name}</span>
      <span
        className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          isSelected ? 'border-[#9D4300]' : 'border-[#584237]/40'
        }`}
        aria-hidden
      >
        {isSelected ? (
          <span className="h-2.5 w-2.5 rounded-full bg-[#9D4300]" />
        ) : null}
      </span>
    </button>
  )
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-[#9D4300]' : 'bg-[#E2E2E3]'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

export default function AdminPaymentGatewaySettingsPage() {
  const data = ADMIN_PAYMENT_GATEWAY_SETTINGS
  const [testMode, setTestMode] = useState(true)
  const [providerId, setProviderId] = useState(data.providers.defaultId)
  const [publicKey, setPublicKey] = useState(data.credentials.publicKey.value)
  const [secretKey, setSecretKey] = useState(data.credentials.secretKey.value)

  return (
    <div className="space-y-6 px-5 py-6 lg:p-6">
      <section className="relative overflow-hidden rounded-xl bg-[#FFFBEB] p-4 pl-6">
        <span
          className="absolute inset-y-0 left-0 w-1 bg-[#F59E0B]"
          aria-hidden
        />
        <div className="flex items-start gap-3">
          <AlertTriangle
            size={18}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-[#F59E0B]"
            aria-hidden
          />
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-[#B45309]">
              {data.testMode.title}
            </h2>
            <p className="mt-1 text-sm leading-snug text-[#B45309]/80">
              {data.testMode.body}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-white p-6 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
        <span
          className="pointer-events-none absolute right-0 top-0 h-32 w-32 bg-orange-500/5"
          style={{ borderBottomLeftRadius: '9999px' }}
          aria-hidden
        />
        <div className="relative flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {data.providers.title}
          </h2>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} strokeWidth={2.5} className="text-gray-900" aria-hidden />
            <span className="text-xs font-semibold text-gray-900">
              {data.providers.healthLabel}
            </span>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3">
          {data.providers.options.map((provider) => (
            <ProviderTile
              key={provider.id}
              provider={provider}
              isSelected={providerId === provider.id}
              onSelect={setProviderId}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
        <h2 className="text-xl font-semibold text-gray-900">
          {data.credentials.title}
        </h2>

        <div className="mt-6 flex items-center justify-between gap-3 border-b border-[#E8E8E9]/50 pb-6">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {data.credentials.testModeLabel}
            </p>
            <p className="mt-1 text-xs text-[#584237]">
              {data.credentials.testModeDescription}
            </p>
          </div>
          <Switch
            checked={testMode}
            onChange={() => setTestMode((v) => !v)}
            label={data.credentials.testModeLabel}
          />
        </div>

        <div className="mt-4 space-y-4">
          <AdminPaymentCredentialField
            id={data.credentials.publicKey.id}
            label={data.credentials.publicKey.label}
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            variant="public"
          />
          <AdminPaymentCredentialField
            id={data.credentials.secretKey.id}
            label={data.credentials.secretKey.label}
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            variant="secret"
            multiline
          />
        </div>

        <p className="mt-4 text-xs italic text-[#584237]">
          {data.credentials.lastUpdatedLabel}
        </p>
      </section>

      <section className="space-y-4 pt-2">
        <button
          type="button"
          className="w-full rounded-lg px-8 py-3 text-xs font-bold uppercase tracking-[0.05em] text-white shadow-[0px_8px_16px_rgba(249,115,22,0.25)] transition-opacity hover:opacity-95"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
          }}
        >
          {data.actions.saveLabel}
        </button>
        <button
          type="button"
          className="w-full rounded-lg border border-[#9D4300]/20 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.05em] text-[#9D4300] transition-colors hover:bg-[#9D4300]/5"
        >
          {data.actions.testConnectionLabel}
        </button>
      </section>
    </div>
  )
}
