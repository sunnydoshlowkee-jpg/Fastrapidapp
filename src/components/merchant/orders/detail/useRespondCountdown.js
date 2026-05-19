import { useEffect, useState } from 'react'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function useRespondCountdown(initialSeconds) {
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    setRemaining(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (remaining <= 0) return
    const id = window.setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(id)
  }, [remaining])

  const percent =
    initialSeconds > 0 ? Math.max(0, Math.min(100, (remaining / initialSeconds) * 100)) : 0

  return {
    label: remaining > 0 ? `Respond within ${formatTime(remaining)}` : 'Response time expired',
    percent,
    expired: remaining <= 0,
  }
}
