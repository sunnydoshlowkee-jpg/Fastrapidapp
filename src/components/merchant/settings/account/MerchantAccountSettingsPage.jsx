import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandedLoader from '../../../ui/BrandedLoader'
import { MERCHANT_ACCOUNT_SETTINGS } from '../../../../services/data/merchantAccountSettings.mock'
import { merchantGetMe, getStoredMerchantSession } from '../../../../services/merchantAuthService'
import MerchantAccountSettingsDesktop from './MerchantAccountSettingsDesktop'
import MerchantAccountSettingsMobile from './MerchantAccountSettingsMobile'

function buildProfileFromUser(user) {
  const template = MERCHANT_ACCOUNT_SETTINGS
  const fullName = user?.full_name || [user?.first_name, user?.last_name].filter(Boolean).join(' ') || ''
  const email = user?.email || ''
  const phone = user?.phone || ''
  const merchantId = String(user?.merchant?.id ?? template.mobile.merchantId)

  return {
    ...template,
    profile: {
      ...template.profile,
      description: 'Your signed-in merchant contact details. Contact support to change email or phone.',
      fields: {
        fullName: { ...template.profile.fields.fullName, value: fullName },
        email: { ...template.profile.fields.email, value: email },
        phone: { ...template.profile.fields.phone, value: phone },
      },
      saveLabel: 'Read only',
      readOnly: true,
    },
    mobile: {
      ...template.mobile,
      merchantId,
      profile: {
        ...template.mobile.profile,
        fields: {
          fullName: { ...template.mobile.profile.fields.fullName, value: fullName },
          email: { ...template.mobile.profile.fields.email, value: email },
          phone: { ...template.mobile.profile.fields.phone, value: phone },
        },
        readOnly: true,
      },
    },
  }
}

export default function MerchantAccountSettingsPage() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getStoredMerchantSession()) {
      navigate('/merchant/login', { replace: true })
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const user = await merchantGetMe()
        if (!cancelled) {
          setData(buildProfileFromUser(user))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load account settings.')
          setData(buildProfileFromUser(getStoredMerchantSession()?.user))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [navigate])

  const view = useMemo(() => data, [data])

  if (loading) {
    return <BrandedLoader fill className="p-8" />
  }

  if (!view) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-sm text-red-600">
        {error || 'Account settings unavailable.'}
      </div>
    )
  }

  return (
    <>
      <MerchantAccountSettingsMobile data={view} />
      <MerchantAccountSettingsDesktop data={view} />
    </>
  )
}
