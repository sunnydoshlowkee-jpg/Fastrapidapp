/**
 * Rewrites storage URLs to the API host so images load from the Vite dev server.
 * @param {string | null | undefined} fileUrl
 */
export function resolveStorageUrl(fileUrl) {
  if (!fileUrl) return null

  const apiRoot =
    import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://127.0.0.1:8000'

  if (fileUrl.startsWith('http://localhost/storage/')) {
    return `${apiRoot}${fileUrl.replace('http://localhost', '')}`
  }

  if (fileUrl.startsWith('/storage/')) {
    return `${apiRoot}${fileUrl}`
  }

  return fileUrl
}
