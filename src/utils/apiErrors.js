export function getApiFieldError(err, field) {
  if (!err.response) {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    if (!apiUrl || apiUrl === '/api') {
      return 'API URL is not configured for this build. Rebuild the app with VITE_API_URL set to your production API.'
    }
    if (apiUrl.includes('laravel.cloud')) {
      return 'Cannot reach the API server. The Laravel Cloud deployment may be down or the URL may be outdated — check your Laravel Cloud dashboard.'
    }
    if (/^http:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(apiUrl)) {
      return 'Cannot reach the API on your Wi-Fi. Start the API with `php artisan serve --host=0.0.0.0 --port=8000` and ensure your phone is on the same network.'
    }
    return 'Cannot reach the API. Check your internet connection and try again.'
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
