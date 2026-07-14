import PrivacySecurityPage from '../../../components/security/PrivacySecurityPage'
import { APP_ROLES } from '../../../utils/appRole'
import { getStoredMerchantSession } from '../../../services/merchantAuthService'

export default function MerchantPrivacySecurity() {
  const session = getStoredMerchantSession()

  return (
    <PrivacySecurityPage
      role={APP_ROLES.merchant}
      accountUser={session?.user || null}
      surfaceClassName="bg-merchant-canvas"
    />
  )
}
