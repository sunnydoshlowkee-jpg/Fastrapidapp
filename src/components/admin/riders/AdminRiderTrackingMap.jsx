import { Bike, Home, ShoppingBag } from 'lucide-react'

function MapMarker({ x, y, type, label, sublabel }) {
  const styles = {
    merchant: {
      ring: 'bg-amber-700',
      icon: ShoppingBag,
      iconClass: 'text-white',
      labelClass: 'text-amber-800',
    },
    rider: {
      ring: 'bg-violet-600 ring-4 ring-violet-400/40',
      icon: Bike,
      iconClass: 'text-white',
      labelClass: 'text-violet-700',
      pulse: true,
    },
    destination: {
      ring: 'bg-gray-600',
      icon: Home,
      iconClass: 'text-white',
      labelClass: 'text-gray-600',
    },
  }

  const config = styles[type] ?? styles.merchant
  const Icon = config.icon

  return (
    <div
      className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {config.pulse ? (
        <span
          className="absolute h-16 w-16 animate-ping rounded-full bg-violet-400/30"
          aria-hidden
        />
      ) : null}
      <span
        className={`relative flex h-11 w-11 items-center justify-center rounded-full shadow-lg ${config.ring}`}
      >
        <Icon size={20} strokeWidth={2} className={config.iconClass} aria-hidden />
      </span>
      {sublabel ? (
        <span className="mt-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700 shadow-sm">
          ● {sublabel}
        </span>
      ) : null}
      {label ? (
        <span
          className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${config.labelClass}`}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}

export default function AdminRiderTrackingMap({ map, telemetryLabel, enRouteLabel, merchantLabel, destinationLabel }) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-[#2d2d35]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={`M ${map.merchant.x} ${map.merchant.y} Q ${(map.merchant.x + map.rider.x) / 2} ${map.merchant.y - 15} ${map.rider.x} ${map.rider.y}`}
          fill="none"
          stroke="rgb(139, 92, 246)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          opacity="0.9"
        />
        <path
          d={`M ${map.rider.x} ${map.rider.y} Q ${(map.rider.x + map.destination.x) / 2} ${map.rider.y - 20} ${map.destination.x} ${map.destination.y}`}
          fill="none"
          stroke="rgb(139, 92, 246)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          opacity="0.5"
        />
      </svg>

      <div className="absolute left-4 top-4 z-20">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden />
          {telemetryLabel}
        </span>
      </div>

      <MapMarker
        x={map.merchant.x}
        y={map.merchant.y}
        type="merchant"
        label={merchantLabel}
      />
      <MapMarker
        x={map.rider.x}
        y={map.rider.y}
        type="rider"
        sublabel={enRouteLabel}
      />
      <MapMarker
        x={map.destination.x}
        y={map.destination.y}
        type="destination"
        label={destinationLabel}
      />
    </div>
  )
}
