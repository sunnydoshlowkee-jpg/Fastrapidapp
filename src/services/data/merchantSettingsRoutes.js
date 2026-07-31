import { MERCHANT_SETTINGS_ACCOUNT_PATH } from './merchantAccountSettings.mock'
import { MERCHANT_SETTINGS_BUSINESS_PATH } from './merchantBusinessProfile.mock'
import { MERCHANT_SETTINGS_OPERATING_HOURS_PATH } from './merchantOperatingHours.mock'
import { MERCHANT_SETTINGS_ACCOUNTS_PATH } from './merchantSettings.mock'
import { MERCHANT_SETTINGS_PAYOUT_PATH } from './merchantSettingsPayout.mock'

export const MERCHANT_SETTINGS_CARD_ROUTES = {
  'business-profile': MERCHANT_SETTINGS_BUSINESS_PATH,
  'operating-hours': MERCHANT_SETTINGS_OPERATING_HOURS_PATH,
  'payment-methods': MERCHANT_SETTINGS_PAYOUT_PATH,
  'account-settings': MERCHANT_SETTINGS_ACCOUNT_PATH,
  'merchant-accounts': MERCHANT_SETTINGS_ACCOUNTS_PATH,
}
