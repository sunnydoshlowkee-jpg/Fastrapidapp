const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]'])

/**
 * API origin without the /api suffix — used for /storage assets.
 */
export function getApiRoot() {
  const fromEnv = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '').trim()

  if (fromEnv && /^https?:\/\//i.test(fromEnv)) {
    return fromEnv.replace(/\/$/, '')
  }

  if (typeof window !== 'undefined') {
    // In dev, Vite proxies /storage to Laravel — use the same host:port as the UI.
    if (import.meta.env.DEV) {
      return window.location.origin
    }

    return `${window.location.protocol}//${window.location.hostname}:8000`
  }

  return 'http://127.0.0.1:8000'
}

/**
 * Rewrites storage paths and loopback URLs so images load on any device on the network.
 * @param {string | null | undefined} fileUrl
 */
export function resolveStorageUrl(fileUrl) {
  if (!fileUrl) return null

  const apiRoot = getApiRoot()

  if (fileUrl.startsWith('/storage/')) {
    return `${apiRoot}${fileUrl}`
  }

  if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
    const path = fileUrl.replace(/^storage\//, '')
    return `${apiRoot}/storage/${path}`
  }

  try {
    const url = new URL(fileUrl)

    if (LOOPBACK_HOSTS.has(url.hostname) && url.pathname.startsWith('/storage/')) {
      return `${apiRoot}${url.pathname}${url.search}`
    }
  } catch {
    return fileUrl
  }

  return fileUrl
}

/**
 * Deep-walk API JSON and rewrite any storage image URLs.
 * @param {unknown} value
 */
export function rewriteStorageUrlsInData(value) {
  if (typeof value === 'string') {
    if (
      value.startsWith('/storage/')
      || (!value.startsWith('http') && value.includes('/products/'))
      || /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?\/storage\//i.test(value)
    ) {
      return resolveStorageUrl(value)
    }

    return value
  }

  if (Array.isArray(value)) {
    return value.map(rewriteStorageUrlsInData)
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, rewriteStorageUrlsInData(entry)]),
    )
  }

  return value
}
