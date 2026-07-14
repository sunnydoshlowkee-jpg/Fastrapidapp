import { useEffect, useRef, useState } from 'react'
import { watchPosition } from '../utils/geolocation'

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

    const stop = watchPosition(
      (next) => {
        setPosition(next)
        setError(null)
        onUpdateRef.current?.(next)
      },
      (err) => setError(err),
    )

    return stop
  }, [enabled])

  return { position, error }
}
