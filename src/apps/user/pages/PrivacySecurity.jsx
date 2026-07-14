import { useAuth } from '../../../context/AuthContext'
import PrivacySecurityPage from '../../../components/security/PrivacySecurityPage'
import { APP_ROLES } from '../../../utils/appRole'

export default function PrivacySecurity() {
  const { user, setUser } = useAuth()

  return (
    <PrivacySecurityPage
      role={APP_ROLES.user}
      accountUser={user}
      onUserSecurityUpdate={(data) => {
        if (user) setUser({ ...user, security: data })
      }}
      showTransactionSection
      showOrderSection
    />
  )
}
