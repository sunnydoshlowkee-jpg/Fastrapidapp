/** Shared admin route paths (avoids circular imports between settings mocks). */
export const ADMIN_SETTINGS_PATH = '/admin/settings'
export const ADMIN_SETTINGS_GENERAL_PATH = `${ADMIN_SETTINGS_PATH}/general`
export const ADMIN_SETTINGS_EMAIL_PATH = `${ADMIN_SETTINGS_PATH}/email`
export const ADMIN_SETTINGS_EMAIL_TEMPLATES_PATH = `${ADMIN_SETTINGS_PATH}/email-templates`
export const ADMIN_SETTINGS_PAYMENT_PATH = `${ADMIN_SETTINGS_PATH}/payment`
export const ADMIN_SETTINGS_ALERTS_PATH = `${ADMIN_SETTINGS_PATH}/alert-settings`
export const ADMIN_SETTINGS_FEATURE_FLAGS_PATH = `${ADMIN_SETTINGS_PATH}/feature-flags`
export const ADMIN_SETTINGS_DELIVERY_ZONES_PATH = `${ADMIN_SETTINGS_PATH}/delivery-zones`
export const ADMIN_SETTINGS_FINANCE_PATH = `${ADMIN_SETTINGS_PATH}/operations-control`
export const ADMIN_SETTINGS_ADMIN_TEAM_PATH = `${ADMIN_SETTINGS_PATH}/admin-team`
export const ADMIN_SETTINGS_ROLES_PATH = `${ADMIN_SETTINGS_PATH}/roles`

/** Finance routes — live data via adminFinanceService (no mock money figures). */
export const ADMIN_TRANSACTIONS_PATH = '/admin/transactions'
export const ADMIN_PAYOUTS_PATH = '/admin/payouts'
export const ADMIN_FINANCE_OVERVIEW_TITLE = 'Operations Control'
export const ADMIN_FINANCE_SEARCH_PLACEHOLDER = 'Query ledger...'
