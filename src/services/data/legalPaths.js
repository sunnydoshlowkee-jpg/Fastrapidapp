/** Canonical public legal document URLs (served from /public/legal). */
export const LEGAL_PRIVACY_URL = '/legal/privacy.html'
export const LEGAL_TERMS_URL = '/legal/terms.html'
export const LEGAL_SUPPORT_EMAIL = 'support@fastrapid.com'

export function legalMailto({ subject, body }) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  return `mailto:${LEGAL_SUPPORT_EMAIL}?${params.toString()}`
}
