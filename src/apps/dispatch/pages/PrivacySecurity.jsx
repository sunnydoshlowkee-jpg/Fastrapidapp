import { useEffect, useState } from 'react'
import PrivacySecurityPage from '../../../components/security/PrivacySecurityPage'
import { APP_ROLES } from '../../../utils/appRole'
import { getProfile } from '../../../services/riderAuthService'

export default function RiderPrivacySecurity() {
  const [accountUser, setAccountUser] = useState(null)

  useEffect(() => {
    let active = true

    getProfile()
      .then((response) => {
        if (!active) return
        const profile = response?.data?.data ?? response?.data ?? response
        setAccountUser(profile?.user || null)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  return (
    <PrivacySecurityPage
      role={APP_ROLES.rider}
      accountUser={accountUser}
      surfaceClassName="bg-gray-50"
    />
  )
}
