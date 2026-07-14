import { Link } from 'react-router-dom'
import { Bell, Mail, Plus, ShieldCheck, ShieldX, SlidersHorizontal } from 'lucide-react'
import { ADMIN_TEAM } from '../../../services/data/adminTeam.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'
import AdminTeamClearanceBadge from './AdminTeamClearanceBadge'

export default function AdminAdminTeamPage() {
  const data = ADMIN_TEAM

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

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{data.subtitle}</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
        >
          <Plus size={16} strokeWidth={2.5} aria-hidden />
          {data.inviteLabel}
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.stats.map((stat) => (
          <article
            key={stat.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</p>
              {stat.hint ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  {stat.hint}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <article className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-bold text-gray-900">{data.roster.title}</h2>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Filter roster"
          >
            <SlidersHorizontal size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                {Object.values(data.roster.columns).map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.roster.members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${member.avatarTone}`}
                      >
                        {member.initials}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{member.email}</td>
                  <td className="px-5 py-4">
                    <AdminTeamClearanceBadge
                      clearance={member.clearance}
                      label={member.clearanceLabel}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        member.online ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                      aria-label={member.online ? 'Online' : 'Offline'}
                    />
                  </td>
                  <td className="px-5 py-4">
                    {member.mfaEnabled ? (
                      <ShieldCheck
                        size={20}
                        className="text-emerald-600"
                        strokeWidth={2}
                        aria-label="MFA enabled"
                      />
                    ) : (
                      <ShieldX
                        size={20}
                        className="text-red-500"
                        strokeWidth={2}
                        aria-label="MFA disabled"
                      />
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{member.lastTelemetry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-bold text-gray-900">{data.pending.title}</h2>
          <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rapid-orange">
            {data.pending.badge}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                {Object.values(data.pending.columns).map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.pending.invites.map((invite) => (
                <tr
                  key={invite.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
                >
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                      <Mail size={16} className="text-gray-400" strokeWidth={2} aria-hidden />
                      {invite.email}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <AdminTeamClearanceBadge
                      clearance={invite.clearance}
                      label={invite.clearanceLabel}
                    />
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{invite.dispatchTime}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className="text-xs font-bold uppercase tracking-wide text-rapid-orange transition-colors hover:text-[#E84A15]"
                      >
                        {data.pending.resendLabel}
                      </button>
                      <button
                        type="button"
                        className="text-xs font-bold uppercase tracking-wide text-red-600 transition-colors hover:text-red-700"
                      >
                        {data.pending.revokeLabel}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}
