export default function MerchantAnalyticsSimpleBarChart({
  data,
  peakKey = 'peak',
  barClassName = 'bg-merchant-nav-active',
  peakBarClassName = 'bg-merchant-primary',
  showLabels = true,
  height = 140,
}) {
  const points = Array.isArray(data) ? data : []
  const max = Math.max(...points.map((d) => Number(d.value) || 0), 1)
  const barArea = showLabels ? Math.max(height - 24, 80) : height

  return (
    <div className="w-full" role="img" aria-hidden>
      <div className="flex items-end justify-between gap-1 sm:gap-2" style={{ height: `${barArea}px` }}>
        {points.map((item) => {
          const value = Number(item.value) || 0
          const isPeak = Boolean(item[peakKey])
          const barHeight = value > 0 ? Math.max((value / max) * barArea, 6) : 0

          return (
            <div key={item.label} className="flex h-full min-w-0 flex-1 items-end justify-center">
              <div
                className={`w-full max-w-[2.5rem] rounded-t-md transition-all ${
                  isPeak ? peakBarClassName : barClassName
                }`}
                style={{ height: `${barHeight}px` }}
                title={`${item.label}: ${value}`}
              />
            </div>
          )
        })}
      </div>
      {showLabels ? (
        <div className="mt-2 flex justify-between gap-1 sm:gap-2">
          {points.map((item) => (
            <span
              key={`label-${item.label}`}
              className="min-w-0 flex-1 truncate text-center text-[10px] font-medium text-merchant-muted sm:text-xs"
            >
              {item.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
