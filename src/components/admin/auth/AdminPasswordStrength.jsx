export function getAdminPasswordStrength(password) {
  if (!password) {
    return { label: '', percent: 0, barClass: 'bg-gray-200' }
  }

  let score = 0
  if (password.length >= 8) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  if (password.length >= 12) score += 1

  if (score >= 3) {
    return { label: 'Strong', percent: 100, barClass: 'bg-emerald-500' }
  }
  if (score >= 2) {
    return { label: 'Medium', percent: 55, barClass: 'bg-amber-400' }
  }
  return { label: 'Weak', percent: 28, barClass: 'bg-red-400' }
}

export default function AdminPasswordStrength({ password, hint }) {
  const strength = getAdminPasswordStrength(password)

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${strength.barClass}`}
          style={{ width: `${strength.percent}%` }}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2 text-xs">
        <span className="font-bold text-gray-800">{strength.label}</span>
        <span className="text-gray-400">{hint}</span>
      </div>
    </div>
  )
}
