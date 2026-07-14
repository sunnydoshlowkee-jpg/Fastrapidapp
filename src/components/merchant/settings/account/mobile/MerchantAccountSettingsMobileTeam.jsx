import { UserPlus } from 'lucide-react'

function Badge({ children, tone }) {
  const styles =
    tone === 'active'
      ? 'bg-merchant-nav-active text-merchant-primary'
      : tone === 'pending'
        ? 'bg-merchant-icon-tile text-merchant-muted'
        : 'bg-merchant-icon-tile text-merchant-body'

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${styles}`}>
      {children}
    </span>
  )
}

export default function MerchantAccountSettingsMobileTeam({ team }) {
  return (
    <section className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">{team.title}</h2>
      <p className="mt-1 text-sm text-merchant-muted">{team.description}</p>

      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-merchant-primary"
      >
        <UserPlus size={16} strokeWidth={2} aria-hidden />
        {team.inviteLabel}
      </button>

      <ul className="mt-4 space-y-3">
        {team.members.map((member) => (
          <li
            key={member.id}
            className="rounded-lg bg-merchant-input p-3"
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: member.avatarColor }}
                aria-hidden
              >
                {member.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-merchant-ink">{member.name}</p>
                <p className="truncate text-xs text-merchant-muted">{member.email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge>{member.role}</Badge>
                  <Badge tone={member.status}>{member.status === 'active' ? 'Active' : 'Pending'}</Badge>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
