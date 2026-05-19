export default function MerchantAnalyticsSimpleBarChart({
  data,
  peakKey = 'peak',
  barClassName = 'bg-merchant-nav-active',
  peakBarClassName = 'bg-merchant-primary',
  showLabels = true,
}) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex h-40 items-end justify-between gap-1 sm:gap-2" role="img" aria-hidden>
      {data.map((item) => {
        const isPeak = item[peakKey]
        return (
          <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div
              className={`w-full max-w-[2.5rem] rounded-t-md transition-all ${
                isPeak ? peakBarClassName : barClassName
              }`}
              style={{ height: `${(item.value / max) * 100}%`, minHeight: item.value > 0 ? '4px' : 0 }}
            />
            {showLabels && (
              <span className="text-[10px] font-medium text-merchant-muted sm:text-xs">{item.label}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
