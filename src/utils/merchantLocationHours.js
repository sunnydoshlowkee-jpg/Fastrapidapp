/** Default map pin when merchant confirms location without geocoding API. */
export const DEFAULT_MERCHANT_MAP_COORDS = {
  latitude: 6.5244,
  longitude: 3.3792,
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

export function validateLocationHoursForm({ street, city, hourDays, mapConfirmed }) {
  const errors = {}

  if (!street?.trim()) {
    errors.street = 'Street address is required.'
  }

  if (!city?.trim()) {
    errors.city = 'City is required.'
  }

  if (!mapConfirmed) {
    errors.map = 'Please confirm your location on the map.'
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
