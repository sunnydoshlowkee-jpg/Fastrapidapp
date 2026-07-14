import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function searchCatalog({ q, latitude, longitude, page = 1, perPage = 24 }) {
  try {
    return await api.get('/search', {
      params: {
        q,
        latitude,
        longitude,
        page,
        per_page: perPage,
      },
    })
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function getSearchSuggestions() {
  try {
    const { data } = await api.get('/search/suggestions')
    return data?.data?.popular || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}
