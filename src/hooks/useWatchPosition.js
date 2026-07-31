import { useEffect, useRef, useState } from 'react'
import { watchDevicePosition } from '../utils/nativeLocation'

export function useWatchPosition({ enabled = true, onUpdate } = {}) {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)
  const onUpdateRef = useRef(onUpdate)

  useEffect(() => {
    onUpdateRef.current = onUpdate
  }, [onUpdate])

  useEffect(() => {
    if (!enabled) {
      setPosition(null)
      setError(null)
      return undefined
    }

    let cancelled = false
    let stop = () => {}

    ;(async () => {
      stop = await watchDevicePosition(
        (next) => {
          if (cancelled) return
          setPosition(next)
          setError(null)
          onUpdateRef.current?.(next)
        },
        (err) => {
          if (!cancelled) setError(err)
        },
      )
    })()

    return () => {
      cancelled = true
      stop?.()
    }
  }, [enabled])

  return { position, error }
}
