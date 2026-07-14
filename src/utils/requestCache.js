const store = new Map()

const DEFAULT_TTL_MS = 5 * 60 * 1000
const SESSION_PREFIX = 'rapid_cache:'

function now() {
  return Date.now()
}

function readSessionEntry(key) {
  try {
    const raw = sessionStorage.getItem(`${SESSION_PREFIX}${key}`)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeSessionEntry(key, entry) {
  try {
    sessionStorage.setItem(`${SESSION_PREFIX}${key}`, JSON.stringify(entry))
  } catch {
    // Ignore quota errors — in-memory cache still works.
  }
}

function removeSessionEntry(key) {
  try {
    sessionStorage.removeItem(`${SESSION_PREFIX}${key}`)
  } catch {
    // Ignore.
  }
}

export function cacheKey(parts) {
  return parts
    .map((part) => {
      if (part == null) return ''
      if (typeof part === 'object') return JSON.stringify(part)
      return String(part)
    })
    .join('|')
}

export function getCached(key, { allowStale = true, ttlMs = DEFAULT_TTL_MS } = {}) {
  let entry = store.get(key)

  if (!entry) {
    const sessionEntry = readSessionEntry(key)
    if (sessionEntry) {
      store.set(key, sessionEntry)
      entry = sessionEntry
    }
  }

  if (!entry) return null

  const age = now() - entry.updatedAt
  const fresh = age <= ttlMs

  if (!fresh && !allowStale) return null

  return {
    data: entry.data,
    fresh,
    updatedAt: entry.updatedAt,
  }
}

export function setCached(key, data) {
  const entry = { data, updatedAt: now() }
  store.set(key, entry)
  writeSessionEntry(key, entry)
  return data
}

export function clearCached(prefix = null) {
  if (!prefix) {
    store.clear()
    try {
      for (let i = sessionStorage.length - 1; i >= 0; i -= 1) {
        const storageKey = sessionStorage.key(i)
        if (storageKey?.startsWith(SESSION_PREFIX)) {
          sessionStorage.removeItem(storageKey)
        }
      }
    } catch {
      // Ignore.
    }
    return
  }

  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key)
  }

  try {
    for (let i = sessionStorage.length - 1; i >= 0; i -= 1) {
      const storageKey = sessionStorage.key(i)
      if (storageKey?.startsWith(`${SESSION_PREFIX}${prefix}`)) {
        sessionStorage.removeItem(storageKey)
      }
    }
  } catch {
    // Ignore.
  }
}
