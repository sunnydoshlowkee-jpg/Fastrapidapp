import { useCallback, useEffect, useRef, useState } from 'react'

const PULL_THRESHOLD = 72
const MAX_PULL = 110

/**
 * Pull-to-refresh for native-feeling mobile scrolls.
 * Attach to an existing overflow scroll parent via `scrollRef`.
 */
export default function PullToRefresh({
  onRefresh,
  scrollRef = null,
  disabled = false,
  children,
  className = '',
}) {
  const internalRef = useRef(null)
  const startYRef = useRef(0)
  const pullingRef = useRef(false)
  const pullRef = useRef(0)
  const refreshingRef = useRef(false)
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const setPullBoth = useCallback((value) => {
    pullRef.current = value
    setPull(value)
  }, [])

  const getScrollEl = useCallback(() => {
    return scrollRef?.current || internalRef.current
  }, [scrollRef])

  useEffect(() => {
    const el = getScrollEl()
    if (!el || disabled) return undefined

    const onTouchStart = (event) => {
      if (refreshingRef.current) return
      if (el.scrollTop > 1) {
        pullingRef.current = false
        return
      }
      startYRef.current = event.touches[0].clientY
      pullingRef.current = true
    }

    const onTouchMove = (event) => {
      if (!pullingRef.current || refreshingRef.current) return
      if (el.scrollTop > 1) {
        pullingRef.current = false
        setPullBoth(0)
        return
      }

      const delta = event.touches[0].clientY - startYRef.current
      if (delta <= 0) {
        setPullBoth(0)
        return
      }

      const resisted = Math.min(MAX_PULL, delta * 0.45)
      setPullBoth(resisted)

      if (resisted > 8 && event.cancelable) {
        event.preventDefault()
      }
    }

    const onTouchEnd = async () => {
      if (!pullingRef.current) return
      pullingRef.current = false

      if (refreshingRef.current || disabled) {
        setPullBoth(0)
        return
      }

      const shouldRefresh = pullRef.current >= PULL_THRESHOLD
      if (!shouldRefresh) {
        setPullBoth(0)
        return
      }

      refreshingRef.current = true
      setRefreshing(true)
      setPullBoth(PULL_THRESHOLD)
      try {
        await onRefresh?.()
      } finally {
        refreshingRef.current = false
        setRefreshing(false)
        setPullBoth(0)
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [disabled, getScrollEl, onRefresh, setPullBoth])

  const indicatorVisible = pull > 6 || refreshing
  const progress = Math.min(1, pull / PULL_THRESHOLD)

  return (
    <div
      ref={scrollRef ? undefined : internalRef}
      className={className}
      style={scrollRef ? undefined : { WebkitOverflowScrolling: 'touch' }}
    >
      <div
        className="pointer-events-none sticky top-0 z-[60] flex justify-center overflow-visible"
        aria-hidden={!indicatorVisible}
      >
        <div
          className="absolute top-0 flex h-10 w-10 -translate-y-full items-center justify-center rounded-full bg-white shadow-md transition-opacity"
          style={{
            opacity: indicatorVisible ? 1 : 0,
            transform: `translateY(${Math.max(8, pull - 36)}px)`,
          }}
        >
          <span
            className={`block h-5 w-5 rounded-full border-2 border-[#4F46E5]/25 border-t-[#4F46E5] ${
              refreshing ? 'animate-spin' : ''
            }`}
            style={
              refreshing
                ? undefined
                : { transform: `rotate(${progress * 270}deg)` }
            }
          />
        </div>
      </div>
      {children}
    </div>
  )
}
