export function getApiFieldError(err, field) {
  if (!err.response) {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      return 'API URL is not configured. Set VITE_API_URL on Vercel and redeploy.'
    }
    return 'Cannot reach the API. Add this site URL to CORS_ALLOWED_ORIGINS on Laravel Cloud, then redeploy the API.'
  }

  const status = err.response?.status
  const errors = err.response?.data?.errors
  if (errors?.[field]?.[0]) return errors[field][0]

  const message = err.response?.data?.message
  if (message) return message

  if (status === 500 || status === 502 || status === 503) {
    return 'The API is unavailable. Start the Laravel API with `php artisan serve` (port 8000) and try again.'
  }

  return 'Unable to continue. Please try again.'
}
