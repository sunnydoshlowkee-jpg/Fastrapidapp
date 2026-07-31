/** Default map pin — never save this unless the address is actually Lagos CBD. */
export const DEFAULT_MERCHANT_MAP_COORDS = {
  latitude: 6.5244,
  longitude: 3.3792,
}

export function isDefaultMerchantPin(latitude, longitude) {
  const lat = Number(latitude)
  const lng = Number(longitude)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false
  return (
    Math.abs(lat - DEFAULT_MERCHANT_MAP_COORDS.latitude) < 0.00015 &&
    Math.abs(lng - DEFAULT_MERCHANT_MAP_COORDS.longitude) < 0.00015
  )
}

export function mergeLocationHoursDraft(templateHours, savedDays = []) {
  if (!savedDays.length) {
    return templateHours.days.map((day) => ({ ...day }))
  }

  const byId = Object.fromEntries(savedDays.map((day) => [day.id, day]))

  return templateHours.days.map((day) => {
    const saved = byId[day.id]
    if (!saved) {
      return { ...day }
    }

    return {
      ...day,
      open: Boolean(saved.open),
      openTime: saved.openTime ?? day.openTime,
      closeTime: saved.closeTime ?? day.closeTime,
    }
  })
}

export function buildLocationHoursPayload({ street, city, postalCode, latitude, longitude, hourDays }) {
  return {
    street: street?.trim() ?? '',
    city: city?.trim() ?? '',
    postal_code: postalCode?.trim() || null,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    operating_hours: hourDays.map((day) => ({
      id: day.id,
      label: day.label,
      open: Boolean(day.open),
      open_time: day.open ? day.openTime : null,
      close_time: day.open ? day.closeTime : null,
    })),
  }
}

export function validateLocationHoursForm({ street, city, hourDays, mapConfirmed, latitude, longitude }) {
  const errors = {}

  if (!street?.trim()) {
    errors.street = 'Street address is required.'
  }

  if (!city?.trim()) {
    errors.city = 'City is required.'
  }

  if (!mapConfirmed) {
    errors.map = 'Please confirm your location on the map.'
  } else if (
    !Number.isFinite(Number(latitude)) ||
    !Number.isFinite(Number(longitude))
  ) {
    errors.map = 'Please confirm a valid pin on the map.'
  } else if (isDefaultMerchantPin(latitude, longitude)) {
    errors.map = 'Move the pin to your real store location, or confirm after the address is found on the map.'
  }

  const openDays = hourDays.filter((day) => day.open)

  if (openDays.length === 0) {
    errors.hours = 'Please mark at least one day as open.'
  } else {
    const incomplete = openDays.find((day) => !day.openTime?.trim() || !day.closeTime?.trim())
    if (incomplete) {
      errors.hours = 'Please set opening and closing times for all open days.'
    }
  }

  return errors
}
