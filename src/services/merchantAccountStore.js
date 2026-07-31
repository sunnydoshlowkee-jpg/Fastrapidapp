/**
 * Client-side multi-merchant account storage.
 * Active session stays in MERCHANT_TOKEN_KEY / MERCHANT_USER_KEY;
 * all signed-in merchants live in MERCHANT_ACCOUNTS_KEY.
 */

export const MERCHANT_TOKEN_KEY = 'rapid_merchant_token'
export const MERCHANT_USER_KEY = 'rapid_merchant_user'
export const MERCHANT_ACCOUNTS_KEY = 'rapid_merchant_accounts'

export function getStoredMerchantSession() {
  const token = localStorage.getItem(MERCHANT_TOKEN_KEY)
  const userJson = localStorage.getItem(MERCHANT_USER_KEY)
  if (!token || !userJson) return null
  try {
    return { token, user: JSON.parse(userJson) }
  } catch {
    return null
  }
}

export function clearActiveMerchantSessionKeys() {
  localStorage.removeItem(MERCHANT_TOKEN_KEY)
  localStorage.removeItem(MERCHANT_USER_KEY)
}

/** Clears active session keys only (does not touch the accounts list). */
export function clearMerchantSession() {
  clearActiveMerchantSessionKeys()
}

function readAccountsRaw() {
  try {
    const raw = localStorage.getItem(MERCHANT_ACCOUNTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((entry) => entry?.token && entry?.user?.id != null)
  } catch {
    return []
  }
}

function writeAccounts(accounts) {
  if (!accounts.length) {
    localStorage.removeItem(MERCHANT_ACCOUNTS_KEY)
    return
  }
  localStorage.setItem(MERCHANT_ACCOUNTS_KEY, JSON.stringify(accounts))
}

function userIdOf(userOrId) {
  if (userOrId == null) return ''
  if (typeof userOrId === 'object') return String(userOrId.id ?? '')
  return String(userOrId)
}

/** Seed accounts list from the active session when upgrading older installs. */
export function ensureMerchantAccountsHydrated() {
  const session = getStoredMerchantSession()
  if (!session?.user?.id) return

  const accounts = readAccountsRaw()
  const id = userIdOf(session.user)
  if (accounts.some((entry) => userIdOf(entry.user) === id)) {
    // Keep stored user payload in sync with the active session.
    writeAccounts(
      accounts.map((entry) =>
        userIdOf(entry.user) === id
          ? { ...entry, token: session.token, user: session.user }
          : entry,
      ),
    )
    return
  }

  writeAccounts([
    ...accounts,
    { token: session.token, user: session.user, addedAt: Date.now() },
  ])
}

export function listMerchantAccounts() {
  ensureMerchantAccountsHydrated()
  return readAccountsRaw()
}

export function getMerchantAccountLabel(user) {
  if (!user) return 'Merchant'
  return (
    user.merchant?.business_name ||
    user.full_name ||
    [user.first_name, user.last_name].filter(Boolean).join(' ') ||
    user.email ||
    'Merchant'
  )
}

export function upsertMerchantAccount({ token, user }) {
  if (!token || !user?.id) return

  const id = userIdOf(user)
  const others = readAccountsRaw().filter((entry) => userIdOf(entry.user) !== id)
  writeAccounts([
    ...others,
    { token, user, addedAt: Date.now() },
  ])
}

export function removeMerchantAccount(userId) {
  const id = userIdOf(userId)
  writeAccounts(readAccountsRaw().filter((entry) => userIdOf(entry.user) !== id))
}

export function clearAllMerchantAccounts() {
  writeAccounts([])
  clearActiveMerchantSessionKeys()
}

/**
 * Persist the active merchant session and upsert into the accounts list.
 */
export function storeMerchantSession({ token, user }) {
  if (token) {
    localStorage.setItem(MERCHANT_TOKEN_KEY, token)
  }
  if (user) {
    localStorage.setItem(MERCHANT_USER_KEY, JSON.stringify(user))
  }
  if (token && user) {
    upsertMerchantAccount({ token, user })
  }
}

/**
 * Activate a previously signed-in merchant account.
 * @returns {{ token: string, user: object } | null}
 */
export function switchMerchantAccount(userId) {
  ensureMerchantAccountsHydrated()
  const id = userIdOf(userId)
  const account = readAccountsRaw().find((entry) => userIdOf(entry.user) === id)
  if (!account) return null

  localStorage.setItem(MERCHANT_TOKEN_KEY, account.token)
  localStorage.setItem(MERCHANT_USER_KEY, JSON.stringify(account.user))
  return { token: account.token, user: account.user }
}

/**
 * After removing the active account, activate another remaining one if any.
 * @returns {{ token: string, user: object } | null}
 */
export function activateNextMerchantAccount() {
  const remaining = readAccountsRaw()
  if (!remaining.length) {
    clearActiveMerchantSessionKeys()
    return null
  }

  const next = remaining[remaining.length - 1]
  localStorage.setItem(MERCHANT_TOKEN_KEY, next.token)
  localStorage.setItem(MERCHANT_USER_KEY, JSON.stringify(next.user))
  return { token: next.token, user: next.user }
}

/**
 * Drop a failed/unauthorized account and optionally activate another.
 * Safe to call from api.js (no axios import).
 */
export function dropUnauthorizedMerchantAccount() {
  const session = getStoredMerchantSession()
  if (session?.user?.id != null) {
    removeMerchantAccount(session.user.id)
  } else {
    clearActiveMerchantSessionKeys()
  }

  return activateNextMerchantAccount()
}

export function merchantAccountRedirectPath(user) {
  const onboarding = user?.onboarding
  if (onboarding?.can_access_dashboard) {
    return onboarding.redirect_path || '/merchant'
  }
  return onboarding?.redirect_path || '/merchant'
}
