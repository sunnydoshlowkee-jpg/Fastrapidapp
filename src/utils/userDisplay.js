export function formatPhoneDisplay(phoneE164) {
  if (!phoneE164) return ''

  const digits = phoneE164.replace(/\D/g, '')
  if (digits.length >= 13 && digits.startsWith('234')) {
    const local = digits.slice(3)
    return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
  }

  return phoneE164
}

export function getDisplayName(user) {
  if (!user) return ''
  if (user.full_name?.trim()) return user.full_name.trim()
  return [user.first_name, user.last_name].filter(Boolean).join(' ').trim()
}
