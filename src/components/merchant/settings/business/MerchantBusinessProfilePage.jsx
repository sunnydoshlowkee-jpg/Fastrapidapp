import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getMerchantBusinessProfile,
  updateMerchantBusinessCategory,
  updateMerchantStoreStatus,
} from '../../../../services/merchantBusinessProfileService'
import { uploadMerchantDocument } from '../../../../services/merchantVerificationDocumentsService'
import { getStoredMerchantSession } from '../../../../services/merchantAuthService'
import BrandedLoader from '../../../ui/BrandedLoader'
import MerchantBusinessProfileDesktop from './MerchantBusinessProfileDesktop'
import MerchantBusinessProfileMobile from './MerchantBusinessProfileMobile'

export default function MerchantBusinessProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingCategory, setSavingCategory] = useState(false)
  const [savingStoreStatus, setSavingStoreStatus] = useState(false)
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

  const handleSaveCategory = useCallback(async ({ businessType, storeFormat }) => {
    setSavingCategory(true)
    try {
      const next = await updateMerchantBusinessCategory({ businessType, storeFormat })
      setProfile(next)
      return next
    } finally {
      setSavingCategory(false)
    }
  }, [])

  const handleLogoUpdated = useCallback((next) => {
    setProfile(next)
  }, [])

  const handleTogglePaused = useCallback(async (paused) => {
    setSavingStoreStatus(true)
    try {
      const next = await updateMerchantStoreStatus(paused)
      setProfile(next)
      return next
    } finally {
      setSavingStoreStatus(false)
    }
  }, [])

  const handleDocumentUpload = useCallback(async (documentType, file) => {
    await uploadMerchantDocument(documentType, file)
    const next = await getMerchantBusinessProfile()
    setProfile(next)
    return next
  }, [])

  if (loading) {
    return <BrandedLoader fill className="p-8" />
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
      <MerchantBusinessProfileMobile
        profile={profile}
        onSaveCategory={handleSaveCategory}
        savingCategory={savingCategory}
        onLogoUpdated={handleLogoUpdated}
        onTogglePaused={handleTogglePaused}
        savingStoreStatus={savingStoreStatus}
        onDocumentUpload={handleDocumentUpload}
      />
      <MerchantBusinessProfileDesktop
        profile={profile}
        onSaveCategory={handleSaveCategory}
        savingCategory={savingCategory}
        onLogoUpdated={handleLogoUpdated}
        onTogglePaused={handleTogglePaused}
        savingStoreStatus={savingStoreStatus}
        onDocumentUpload={handleDocumentUpload}
      />
    </>
  )
}
