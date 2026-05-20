import { UserPlus } from 'lucide-react'
import MerchantAccountSettingsSection from './MerchantAccountSettingsSection'

function StatusDot({ status }) {
  const isActive = status === 'active'
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-merchant-body">
      <span
        className={`h-2 w-2 rounded-full ${isActive ? 'bg-[#16A34A]' : 'bg-merchant-muted'}`}
        aria-hidden
      />
      {isActive ? 'Active' : 'Pending'}
    </span>
  )
}

export default function MerchantAccountSettingsTeam({ team }) {
  const aside = (
    <>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-merchant-ink">{team.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-merchant-muted">{team.description}</p>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-merchant-primary hover:text-[#3837e6]"
      >
        <UserPlus size={18} strokeWidth={2} aria-hidden />
        {team.inviteLabel}
      </button>
    </>
  )

  return (
    <MerchantAccountSettingsSection aside={aside}>
      <div className="overflow-hidden rounded-merchant-stat border border-merchant-divider bg-merchant-surface shadow-merchant-stat">
        <div className="hidden border-b border-merchant-divider bg-merchant-canvas/60 px-5 py-3 sm:grid sm:grid-cols-[1fr_100px_100px] sm:gap-4 lg:px-6">
          {team.columns.map((col) => (
            <span
              key={col}
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-merchant-muted"
            >
              {col}
            </span>
          ))}
        </div>

        <ul>
          {team.members.map((member, index) => (
            <li
              key={member.id}
              className={`px-5 py-4 lg:px-6 ${
                index < team.members.length - 1 ? 'border-b border-merchant-divider' : ''
              }`}
            >
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_100px_100px] sm:items-center sm:gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: member.avatarColor }}
                    aria-hidden
                  >
                    {member.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-merchant-ink">{member.name}</p>
                    <p className="truncate text-xs text-merchant-muted">{member.email}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-merchant-body sm:text-left">{member.role}</p>
                <StatusDot status={member.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MerchantAccountSettingsSection>
  )
}
