import { Bell } from 'lucide-react'

function formatCount(count) {
  if (!count || count < 1) return null
  return count > 99 ? '99+' : String(count)
}

export default function NotificationBellButton({
  onClick,
  count = 0,
  className = '',
  iconSize = 22,
  iconClassName = 'text-gray-500',
  tone = 'red',
  ariaLabel = 'Notifications',
}) {
  const label = formatCount(count)
  const badgeClass =
    tone === 'indigo'
      ? 'bg-[#4F46E5] text-white'
      : 'bg-red-500 text-white'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`relative flex items-center justify-center ${className}`}
    >
      <Bell size={iconSize} className={iconClassName} />
      {label ? (
        <span
          className={`absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-black leading-4 text-center border border-white ${badgeClass}`}
        >
          {label}
        </span>
      ) : null}
    </button>
  )
}

export function NavBadge({ count = 0, className = '' }) {
  const label = formatCount(count)
  if (!label) return null

  return (
    <span
      className={`absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-black leading-4 text-center border border-white ${className}`}
    >
      {label}
    </span>
  )
}
