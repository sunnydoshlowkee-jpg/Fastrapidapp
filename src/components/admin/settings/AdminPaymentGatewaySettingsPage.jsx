import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Bell, Save, Signal } from 'lucide-react'
import { ADMIN_PAYMENT_GATEWAY_SETTINGS } from '../../../services/data/adminPaymentGatewaySettings.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminPaymentCredentialField from './AdminPaymentCredentialField'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'

export default function AdminPaymentGatewaySettingsPage() {
  const data = ADMIN_PAYMENT_GATEWAY_SETTINGS
  const [sandbox, setSandbox] = useState(data.testMode.defaultOn)
  const [providerId, setProviderId] = useState(data.providers.defaultId)
  const [publicKey, setPublicKey] = useState(data.credentials.publicKey.value)
  const [secretKey, setSecretKey] = useState(data.credentials.secretKey.value)

  return (
    <div className="p-6">
      <header className="mb-4 flex items-start justify-between gap-4">
        <AdminSettingsBreadcrumbs items={data.breadcrumbs} />
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
      </header>

      <p className="mb-6 max-w-3xl text-sm text-gray-600">{data.intro}</p>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-red-100 bg-red-50 px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold uppercase tracking-wide text-red-800">
                {data.testMode.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-red-700/90">{data.testMode.body}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-red-800">
                {data.testMode.toggleLabel}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={sandbox}
                onClick={() => setSandbox((v) => !v)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  sandbox ? 'bg-sky-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                    sandbox ? 'left-[1.35rem]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">{data.providers.title}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.providers.options.map((provider) => {
                const isSelected = providerId === provider.id
                return (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => setProviderId(provider.id)}
                    className={`relative flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-orange-200 border-l-4 border-l-rapid-orange bg-orange-50/40'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? 'border-rapid-orange bg-rapid-orange'
                          : 'border-gray-300 bg-white'
                      }`}
                      aria-hidden
                    >
                      {isSelected ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      ) : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold ${provider.brandClass}`}
                        >
                          {provider.initials}
                        </span>
                        <span className="text-sm font-bold text-gray-900">{provider.name}</span>
                      </div>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {provider.routeLabel}
                      </p>
                      {provider.statusLabel ? (
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                          {provider.statusLabel}
                        </p>
                      ) : null}
                    </div>
                  </button>
                )
              })}
            </div>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">{data.credentials.title}</h2>
            <div className="mt-6 space-y-6">
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
              />
            </div>
            <p className="mt-4 text-xs text-gray-500">{data.credentials.disclaimer}</p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
              >
                <Signal size={16} strokeWidth={2} aria-hidden />
                {data.actions.testConnectionLabel}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
              >
                <Save size={16} strokeWidth={2} aria-hidden />
                {data.actions.saveLabel}
              </button>
            </div>
          </article>
        </div>

        <aside className="space-y-4">
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Activity size={16} strokeWidth={2} className="text-gray-500" aria-hidden />
              {data.telemetry.title}
            </h2>
            <ul className="mt-4 space-y-4">
              {data.telemetry.items.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-gray-500">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                  {item.percent != null ? (
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900">{data.activity.title}</h2>
            <ul className="mt-4 divide-y divide-gray-100">
              {data.activity.items.map((item) => (
                <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {item.time} · {item.by}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>
    </div>
  )
}
