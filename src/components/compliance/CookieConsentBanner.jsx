import { useEffect, useState } from 'react'
import { LEGAL_PRIVACY_URL } from '../../services/data/legalPaths'
import { hasAnalyticsConsent, setAnalyticsConsent } from '../../services/analyticsService'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(hasAnalyticsConsent() === null)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-gray-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          We use essential cookies to run FastRapid and optional analytics to improve ordering.
          See our{' '}
          <a href={LEGAL_PRIVACY_URL} className="font-semibold text-rapid-orange hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent(false)
              setVisible(false)
            }}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent(true)
              setVisible(false)
            }}
            className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  )
}
