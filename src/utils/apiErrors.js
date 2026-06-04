export function getApiFieldError(err, field) {
  if (!err.response) {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      return 'API URL is not configured. Set VITE_API_URL on Vercel and redeploy.'
    }
    return 'Cannot reach the API. Add this site URL to CORS_ALLOWED_ORIGINS on Laravel Cloud, then redeploy the API.'
  }

  const errors = err.response?.data?.errors
  if (errors?.[field]?.[0]) return errors[field][0]
  return err.response?.data?.message || 'Unable to continue. Please try again.'
}
