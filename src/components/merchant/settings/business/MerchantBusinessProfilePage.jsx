import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMerchantBusinessProfile } from '../../../../services/merchantBusinessProfileService'
import { getStoredMerchantSession } from '../../../../services/merchantAuthService'
import MerchantBusinessProfileDesktop from './MerchantBusinessProfileDesktop'
import MerchantBusinessProfileMobile from './MerchantBusinessProfileMobile'

export default function MerchantBusinessProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getStoredMerchantSession()) {
      navigate('/merchant/login', { replace: true })
      return
    }

    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getMerchantBusinessProfile()
        if (!cancelled) {
          setProfile(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load business profile.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [navigate])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-sm text-merchant-muted">
        Loading business profile…
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-sm text-merchant-error">{error || 'Business profile unavailable.'}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-sm font-semibold text-merchant-primary hover:text-merchant-link"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <>
      <MerchantBusinessProfileMobile profile={profile} />
      <MerchantBusinessProfileDesktop profile={profile} />
    </>
  )
}
