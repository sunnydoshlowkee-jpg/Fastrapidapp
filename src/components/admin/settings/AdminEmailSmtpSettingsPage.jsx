import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Lock, Mail, Save } from 'lucide-react'
import { ADMIN_EMAIL_SMTP_SETTINGS } from '../../../services/data/adminEmailSmtpSettings.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'
import { AdminSettingsFormField } from './AdminSettingsFormField'

export default function AdminEmailSmtpSettingsPage() {
  const data = ADMIN_EMAIL_SMTP_SETTINGS
  const f = data.fields

  const [host, setHost] = useState(f.host.value)
  const [port, setPort] = useState(f.port.value)
  const [username, setUsername] = useState(f.username.value)
  const [password, setPassword] = useState(f.password.value)
  const [senderName, setSenderName] = useState(f.senderName.value)
  const [senderAddress, setSenderAddress] = useState(f.senderAddress.value)
  const [enforceTls, setEnforceTls] = useState(data.encryption.defaultOn)

  const handleDiscard = () => {
    setHost(f.host.value)
    setPort(f.port.value)
    setUsername(f.username.value)
    setPassword(f.password.value)
    setSenderName(f.senderName.value)
    setSenderAddress(f.senderAddress.value)
    setEnforceTls(data.encryption.defaultOn)
  }

  return (
    <div className="p-6">
      <header className="mb-6 flex items-start justify-between gap-4">
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

      <article className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-5">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-rapid-orange">
              <Mail size={20} strokeWidth={2} aria-hidden />
            </span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{data.card.title}</h1>
              <p className="mt-1 text-sm text-gray-500">{data.card.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AdminSettingsFormField
              id={f.host.id}
              label={f.host.label}
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
            <AdminSettingsFormField
              id={f.port.id}
              label={f.port.label}
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
            <AdminSettingsFormField
              id={f.username.id}
              label={f.username.label}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <AdminSettingsFormField
              id={f.password.id}
              label={f.password.label}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AdminSettingsFormField
              id={f.senderName.id}
              label={f.senderName.label}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            <AdminSettingsFormField
              id={f.senderAddress.id}
              label={f.senderAddress.label}
              type="email"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-100 px-4 py-4">
            <div className="flex gap-3">
              <Lock size={18} className="mt-0.5 shrink-0 text-gray-500" strokeWidth={2} aria-hidden />
              <div>
                <p className="text-sm font-bold text-gray-900">{data.encryption.label}</p>
                <p className="mt-0.5 text-sm text-gray-500">{data.encryption.description}</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enforceTls}
              onClick={() => setEnforceTls((v) => !v)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                enforceTls ? 'bg-rapid-orange' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  enforceTls ? 'left-[1.35rem]' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <footer className="flex flex-wrap justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
          <button
            type="button"
            onClick={handleDiscard}
            className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300"
          >
            {data.discardLabel}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            <Save size={16} strokeWidth={2} aria-hidden />
            {data.commitLabel}
          </button>
        </footer>
      </article>
    </div>
  )
}
