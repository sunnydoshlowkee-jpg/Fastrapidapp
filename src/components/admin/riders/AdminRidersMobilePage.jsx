import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bike, MoreVertical, Search, Star, Truck } from 'lucide-react'
import { ADMIN_RIDERS_PATH } from '../../../services/data/adminRiders.mock'

const statusDotStyles = {
  available: 'bg-[#E1E0FF]',
  on_trip: 'bg-[#FFDDB8]',
  offline: 'bg-[#767588]',
}

const vehicleIcons = {
  scooter: Bike,
  bicycle: Bike,
  van: Truck,
}

function AvatarTile({ rider }) {
  const dotClass = statusDotStyles[rider.status] ?? statusDotStyles.offline

  let body
  if (rider.avatarTone === 'photoDark') {
    body = (
      <div
        className="flex h-full w-full items-center justify-center rounded-[10px] text-base font-bold text-white"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #1F2937 0%, #0F172A 100%)',
        }}
      >
        <Bike size={20} strokeWidth={1.75} className="text-[#7C9BFF]" aria-hidden />
        <span className="sr-only">{rider.initials}</span>
      </div>
    )
  } else if (rider.avatarTone === 'photoLight') {
    body = (
      <div
        className="flex h-full w-full items-center justify-center rounded-[10px] text-base font-bold text-[#191C1D]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #F3F4F5 0%, #E7E8E9 100%)',
        }}
      >
        <Bike size={20} strokeWidth={1.75} className="text-[#191C1D]" aria-hidden />
        <span className="sr-only">{rider.initials}</span>
      </div>
    )
  } else {
    body = (
      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#E7E8E9] text-lg font-bold text-[#454557]">
        {rider.initials}
      </div>
    )
  }

  return (
    <div className="relative h-12 w-12 shrink-0">
      <div className="h-12 w-12 overflow-hidden rounded-xl border-2 border-[#F8F9FA]">
        {body}
      </div>
      <span
        className={`absolute -bottom-0.5 -right-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white ${dotClass}`}
        aria-hidden
      />
    </div>
  )
}

function StatBox({
  label,
  icon,
  value,
  iconClass = 'text-[#2419E9]',
  valueClass = 'text-[#191C1D]',
}) {
  return (
    <div className="flex-1 rounded-md bg-[#F8F9FA] px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#767588]">
        {label}
      </p>
      <div className="mt-0.5 flex items-center gap-1.5">
        <span className={iconClass} aria-hidden>
          {icon}
        </span>
        <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
      </div>
    </div>
  )
}

function RiderCard({ rider }) {
  const isOffline = rider.status === 'offline'
  const isOnTrip = rider.status === 'on_trip'
  const VehicleIcon = vehicleIcons[rider.vehicleIcon] ?? Bike

  return (
    <Link
      to={`${ADMIN_RIDERS_PATH}/${rider.id}`}
      className={`relative block overflow-hidden rounded-lg bg-white p-4 transition-shadow hover:shadow-sm ${
        isOffline ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <AvatarTile rider={rider} />
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-[#191C1D]">
              {rider.name}
            </p>
            <p className="text-xs font-medium text-[#454557]">ID: {rider.id}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          aria-label={`Actions for ${rider.name}`}
          className="-mt-1 -mr-1 flex h-7 w-5 shrink-0 items-center justify-center text-[#454557] hover:text-[#191C1D]"
        >
          <MoreVertical size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="mt-4 flex items-stretch gap-3">
        <StatBox
          label="Vehicle"
          icon={<VehicleIcon size={14} strokeWidth={1.75} />}
          value={rider.vehicle}
          iconClass={isOffline ? 'text-[#454557]' : 'text-[#2419E9]'}
          valueClass={isOffline ? 'text-[#454557]' : 'text-[#191C1D]'}
        />
        <StatBox
          label="Rating"
          icon={
            <Star
              size={14}
              strokeWidth={1.75}
              className={
                isOffline
                  ? 'text-[#767588]'
                  : 'fill-[#8B5700] text-[#8B5700]'
              }
            />
          }
          value={rider.rating}
          iconClass={isOffline ? 'text-[#767588]' : 'text-[#8B5700]'}
          valueClass={
            isOffline
              ? 'font-bold text-[#767588]'
              : 'font-bold text-[#191C1D]'
          }
        />
      </div>

      {isOnTrip ? (
        <span
          className="absolute inset-x-0 bottom-0 h-1 opacity-80"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #6A4200 0%, #8B5700 100%)',
          }}
          aria-hidden
        />
      ) : null}
    </Link>
  )
}

export default function AdminRidersMobilePage({ data, loading = false, error = '' }) {
  const mobile = data.mobile
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!mobile) return []
    let list = mobile.riders
    if (activeFilter !== 'all') {
      list = list.filter((r) => r.status === activeFilter)
    }
    const q = search.trim().toLowerCase()
    if (!q) return list
    return list.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        (r.vehicle ?? '').toLowerCase().includes(q),
    )
  }, [activeFilter, mobile, search])

  if (!mobile) return null

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[#F8F9FA]">
      <div className="sticky top-0 z-10 border-b border-[#E7E8E9]/50 bg-[#F8F9FA] px-4 py-4">
        <div className="flex items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobile.filters.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-xl px-5 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-[#2419E9] font-semibold text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                    : 'bg-white font-medium text-[#191C1D] hover:bg-gray-50'
                }`}
                style={{ letterSpacing: '-0.025em' }}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-[#F8F9FA] px-4 pb-4 pt-2">
        <label className="relative block">
          <span className="sr-only">{mobile.searchPlaceholder}</span>
          <Search
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#454557]"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={mobile.searchPlaceholder}
            className="w-full rounded-md bg-white py-3 pl-10 pr-4 text-sm text-[#191C1D] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline-none placeholder:text-[#454557] focus:ring-2 focus:ring-rapid-orange/15"
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F3F4F5] px-4 pb-40 pt-4">
        {loading ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557]">
            Loading riders...
          </p>
        ) : error ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557]">
            No riders match this filter.
          </p>
        ) : (
          <div className="space-y-4">
            {filtered.map((rider) => (
              <RiderCard key={rider.id} rider={rider} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
