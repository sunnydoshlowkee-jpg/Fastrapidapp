const STORAGE_KEY = 'rapid_recent_searches'
const MAX_RECENT = 8

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getRecentSearches() {
  return readRaw()
    .filter((item) => typeof item?.term === 'string' && item.term.trim() !== '')
    .slice(0, MAX_RECENT)
}

export function addRecentSearch(term, category = null) {
  const normalized = term.trim()
  if (!normalized) return getRecentSearches()

  const next = [
    { term: normalized, category },
    ...getRecentSearches().filter((item) => item.term.toLowerCase() !== normalized.toLowerCase()),
  ].slice(0, MAX_RECENT)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function clearRecentSearches() {
  localStorage.removeItem(STORAGE_KEY)
  return []
}

export function removeRecentSearch(term) {
  const next = getRecentSearches().filter((item) => item.term !== term)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}
