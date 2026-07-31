import { useCallback, useEffect, useState } from 'react'
import { MERCHANT_ONBOARDING_LOCATION_HOURS } from '../../../services/data/merchantOnboardingLocationHours.mock'
import { fetchMerchantLocationHours } from '../../../services/merchantLocationHoursService'
import { completeLocationOnboardingStep } from '../../../services/merchantOnboardingService'
import {
  buildLocationHoursPayload,
  mergeLocationHoursDraft,
  validateLocationHoursForm,
} from '../../../utils/merchantLocationHours'
import MerchantOnboardingLocationHoursDesktop from './MerchantOnboardingLocationHoursDesktop'
import MerchantOnboardingLocationHoursMobile from './MerchantOnboardingLocationHoursMobile'

const template = MERCHANT_ONBOARDING_LOCATION_HOURS

export default function MerchantOnboardingLocationHoursPage() {
  const [locationValues, setLocationValues] = useState({
    street: template.location.fields.street.defaultValue,
    city: template.location.fields.city.defaultValue,
    postalCode: template.location.fields.postalCode.defaultValue,
  })
  const [hourDays, setHourDays] = useState(() =>
    template.hours.days.map((day) => ({ ...day })),
  )
  const [mapConfirmed, setMapConfirmed] = useState(false)
  const [coords, setCoords] = useState({ latitude: null, longitude: null })
  const [loadError, setLoadError] = useState('')
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const saved = await fetchMerchantLocationHours()
        if (cancelled || !saved) {
          return
        }

        setLocationValues({
          street: saved.street ?? '',
          city: saved.city ?? '',
          postalCode: saved.postal_code ?? '',
        })
        setHourDays(mergeLocationHoursDraft(template.hours, saved.operating_hours))
        setMapConfirmed(Boolean(saved.map_confirmed))
        setCoords({
          latitude: saved.latitude ?? null,
          longitude: saved.longitude ?? null,
        })
      } catch (err) {
        if (!cancelled) {
          setLoadError(err.message || 'Unable to load saved location.')
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const handleSaveNext = useCallback(async () => {
    setFormError('')
    setFieldErrors({})

    const validationErrors = validateLocationHoursForm({
      street: locationValues.street,
      city: locationValues.city,
      hourDays,
      mapConfirmed,
      latitude: coords.latitude,
      longitude: coords.longitude,
    })

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      setFormError('Please complete all required fields before continuing.')
      const error = new Error('Validation failed')
      error.code = 'VALIDATION'
      throw error
    }

    const payload = buildLocationHoursPayload({
      ...locationValues,
      ...coords,
      hourDays,
    })

    return completeLocationOnboardingStep(payload)
  }, [locationValues, hourDays, mapConfirmed, coords])

  const sharedProps = {
    data: template,
    locationValues,
    onLocationChange: setLocationValues,
    hourDays,
    onHourDaysChange: setHourDays,
    mapConfirmed,
    onMapConfirm: (nextCoords) => {
      setCoords(nextCoords)
      setMapConfirmed(true)
      if (fieldErrors.map) {
        setFieldErrors((prev) => {
          const next = { ...prev }
          delete next.map
          return next
        })
      }
    },
    loadError,
    formError,
    fieldErrors,
    onSaveNext: handleSaveNext,
    coords,
  }

  return (
    <>
      <MerchantOnboardingLocationHoursMobile {...sharedProps} />
      <MerchantOnboardingLocationHoursDesktop {...sharedProps} />
    </>
  )
}
