import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandedLoader from '../../../ui/BrandedLoader'
import {
  fetchMerchantLocationHours,
  saveMerchantLocationHours,
} from '../../../../services/merchantLocationHoursService'
import {
  getMerchantBusinessProfile,
  updateMerchantStoreStatus,
} from '../../../../services/merchantBusinessProfileService'
import { getStoredMerchantSession } from '../../../../services/merchantAuthService'
import { MERCHANT_OPERATING_HOURS } from '../../../../services/data/merchantOperatingHours.mock'
import MerchantOperatingHoursDesktop from './MerchantOperatingHoursDesktop'
import MerchantOperatingHoursMobile from './MerchantOperatingHoursMobile'

const DEFAULT_DAYS = MERCHANT_OPERATING_HOURS.weeklySchedule.days

function normalizeDays(apiDays) {
  const byId = new Map((apiDays || []).map((day) => [day.id, day]))

  return DEFAULT_DAYS.map((fallback) => {
    const saved = byId.get(fallback.id)
    if (!saved) return { ...fallback }

    const open = Boolean(saved.open)
    return {
      ...fallback,
      open,
      openTime: open ? saved.openTime || fallback.openTime || '09:00 AM' : undefined,
      closeTime: open ? saved.closeTime || fallback.closeTime || '09:00 PM' : undefined,
    }
  })
}

export default function MerchantOperatingHoursPage() {
  const navigate = useNavigate()
  const template = MERCHANT_OPERATING_HOURS
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [closingStore, setClosingStore] = useState(false)
  const [error, setError] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState(template.toast.message)
  const [location, setLocation] = useState({
    street: '',
    city: '',
    postal_code: '',
    latitude: null,
    longitude: null,
  })
  const [days, setDays] = useState(DEFAULT_DAYS)
  const [storePaused, setStorePaused] = useState(false)

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
        const [hours, profile] = await Promise.all([
          fetchMerchantLocationHours(),
          getMerchantBusinessProfile().catch(() => null),
        ])
        if (cancelled) return

        if (hours) {
          setLocation({
            street: hours.street || '',
            city: hours.city || '',
            postal_code: hours.postal_code || '',
            latitude: hours.latitude ?? null,
            longitude: hours.longitude ?? null,
          })
          setDays(normalizeDays(hours.operating_hours))
        }

        if (profile?.storeStatus) {
          setStorePaused(Boolean(profile.storeStatus.paused))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load operating hours.')
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

  const showToast = useCallback((message) => {
    setToastMessage(message || template.toast.message)
    setToastVisible(true)
    window.setTimeout(() => setToastVisible(false), 3200)
  }, [template.toast.message])

  const handleToggle = useCallback((id, open) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === id
          ? {
              ...day,
              open,
              openTime: day.openTime ?? '09:00 AM',
              closeTime: day.closeTime ?? '09:00 PM',
            }
          : day,
      ),
    )
  }, [])

  const handleTimeChange = useCallback((id, field, value) => {
    setDays((prev) => prev.map((day) => (day.id === id ? { ...day, [field]: value } : day)))
  }, [])

  const handleSave = useCallback(async () => {
    if (!location.street?.trim() || !location.city?.trim()) {
      setError('Add your business street and city under Location & Hours onboarding before saving.')
      return
    }

    setSaving(true)
    setError('')
    try {
      const saved = await saveMerchantLocationHours({
        street: location.street,
        city: location.city,
        postal_code: location.postal_code || null,
        latitude: location.latitude,
        longitude: location.longitude,
        operating_hours: days.map((day) => ({
          id: day.id,
          label: day.label,
          open: day.open,
          open_time: day.open ? day.openTime : null,
          close_time: day.open ? day.closeTime : null,
        })),
      })
      if (saved?.operating_hours) {
        setDays(normalizeDays(saved.operating_hours))
      }
      showToast('Operating hours saved.')
    } catch (err) {
      setError(err.message || 'Unable to save operating hours.')
    } finally {
      setSaving(false)
    }
  }, [days, location, showToast])

  const handleDiscard = useCallback(async () => {
    setError('')
    try {
      const hours = await fetchMerchantLocationHours()
      if (hours) {
        setLocation({
          street: hours.street || '',
          city: hours.city || '',
          postal_code: hours.postal_code || '',
          latitude: hours.latitude ?? null,
          longitude: hours.longitude ?? null,
        })
        setDays(normalizeDays(hours.operating_hours))
      }
      setToastVisible(false)
    } catch (err) {
      setError(err.message || 'Unable to reload hours.')
    }
  }, [])

  const handleInstantClose = useCallback(async () => {
    setClosingStore(true)
    setError('')
    try {
      const next = await updateMerchantStoreStatus(true)
      setStorePaused(Boolean(next?.storeStatus?.paused))
      showToast('Store closed. New orders are paused.')
    } catch (err) {
      setError(err.message || 'Unable to close store.')
    } finally {
      setClosingStore(false)
    }
  }, [showToast])

  const schedule = useMemo(
    () => ({
      ...template.weeklySchedule,
      days,
    }),
    [days, template.weeklySchedule],
  )

  const mobileSchedule = useMemo(
    () => ({
      ...template.mobile.weeklySchedule,
      days: days.map((day) => ({
        ...day,
        label: day.label.slice(0, 3),
        openTime: day.openTime?.replace(/\s/g, '') || day.openTime,
        closeTime: day.closeTime?.replace(/\s/g, '') || day.closeTime,
      })),
    }),
    [days, template.mobile.weeklySchedule],
  )

  if (loading) {
    return <BrandedLoader fill className="p-8" />
  }

  return (
    <>
      <MerchantOperatingHoursMobile
        data={template}
        schedule={mobileSchedule}
        error={error}
        saving={saving}
        closingStore={closingStore}
        storePaused={storePaused}
        toastVisible={toastVisible}
        toastMessage={toastMessage}
        onToggle={handleToggle}
        onTimeChange={handleTimeChange}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onInstantClose={handleInstantClose}
      />
      <MerchantOperatingHoursDesktop
        data={template}
        schedule={schedule}
        error={error}
        saving={saving}
        closingStore={closingStore}
        storePaused={storePaused}
        toastVisible={toastVisible}
        toastMessage={toastMessage}
        onToggle={handleToggle}
        onTimeChange={handleTimeChange}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onInstantClose={handleInstantClose}
      />
    </>
  )
}
