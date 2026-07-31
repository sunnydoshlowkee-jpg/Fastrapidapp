import { useCallback, useEffect, useState } from 'react'
import { App } from '@capacitor/app'
import { MapPin, RefreshCw } from 'lucide-react'
import {
  ensureStrictLocationReady,
  isNativeMerchantApp,
} from '../../../utils/nativeLocation'
import BrandedLoader from '../../ui/BrandedLoader'

/**
 * Blocks the merchant dashboard on native APK until location permission
 * is granted and device GPS can return a position.
 */
export default function MerchantLocationGate({ children }) {
  const requiresLocation = isNativeMerchantApp()
  const [checking, setChecking] = useState(requiresLocation)
  const [ready, setReady] = useState(!requiresLocation)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const verify = useCallback(async ({ requestIfNeeded = true } = {}) => {
    if (!requiresLocation) {
      setReady(true)
      setChecking(false)
      setError('')
      return
    }

    setBusy(true)
    setChecking(true)

    try {
      const result = await ensureStrictLocationReady({
        requestIfNeeded,
        appLabel: 'Rapid Merchant',
      })
      if (result.ok) {
        setReady(true)
        setError('')
      } else {
        setReady(false)
        setError(result.reason || 'Location is required to use Rapid Merchant.')
      }
    } catch (err) {
      setReady(false)
      setError(err?.message || 'Location is required to use Rapid Merchant.')
    } finally {
      setBusy(false)
      setChecking(false)
    }
  }, [requiresLocation])

  useEffect(() => {
    verify({ requestIfNeeded: true })
  }, [verify])

  useEffect(() => {
    if (!requiresLocation) return undefined

    let handle
    const bind = async () => {
      handle = await App.addListener('appStateChange', ({ isActive }) => {
        if (isActive) {
          verify({ requestIfNeeded: false })
        }
      })
    }
    bind()

    return () => {
      handle?.remove?.()
    }
  }, [requiresLocation, verify])

  if (!requiresLocation || ready) {
    return children
  }

  if (checking && !error) {
    return (
      <div className="min-h-screen bg-merchant-canvas">
        <BrandedLoader size="screen" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-merchant-canvas px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4342FF]">
        <MapPin size={28} strokeWidth={2} />
      </div>
      <h1 className="mt-5 text-xl font-bold text-merchant-ink">Location required</h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-merchant-muted">
        {error ||
          'Rapid Merchant needs location turned on to operate. Allow location access and keep GPS enabled.'}
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={() => verify({ requestIfNeeded: true })}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-merchant-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        <RefreshCw size={16} className={busy ? 'animate-spin' : ''} />
        {busy ? 'Checking…' : 'Enable location'}
      </button>
      <p className="mt-4 max-w-xs text-xs leading-relaxed text-merchant-nav-muted">
        Make sure Location is on and set to <strong>High accuracy</strong> (not device-only).
        Allow <strong>Precise location</strong> for Rapid Merchant if Android asks.
        If the prompt does not appear, open Settings → Apps → Rapid Merchant → Permissions → Location.
      </p>
    </div>
  )
}
