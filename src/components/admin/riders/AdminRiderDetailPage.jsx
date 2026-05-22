import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Ban, Bike, MapPin, Pencil, Star, TrendingUp } from 'lucide-react'
import { getRiderTrackingPath } from '../../../services/data/adminRiderTracking.mock'
import AdminRiderDocumentsList from './AdminRiderDocumentsList'
import AdminRidersBreadcrumbs from './AdminRidersBreadcrumbs'

function MetricCard({ metric }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{metric.label}</p>
      <div className="mt-2 flex flex-wrap items-end gap-2">
        <p className="text-3xl font-bold tracking-tight text-gray-900">{metric.value}</p>
        {metric.showTrend ? (
          <span className="mb-1 inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
            <TrendingUp size={14} strokeWidth={2.5} aria-hidden />
            {metric.trend}
          </span>
        ) : null}
        {metric.stars ? (
          <span className="mb-1 flex gap-0.5" aria-label={`${metric.value} out of 5 stars`}>
            {Array.from({ length: metric.stars }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-violet-500 text-violet-500"
                strokeWidth={0}
                aria-hidden
              />
            ))}
          </span>
        ) : null}
      </div>
    </article>
  )
}

function TripHistoryItem({ trip }) {
  const statusClass =
    trip.status === 'canceled' ? 'text-gray-500' : 'text-gray-900'

  return (
    <li className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4 last:border-0">
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <Bike size={18} strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">{trip.route}</p>
          <p className="text-xs text-gray-500">{trip.meta}</p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-gray-900">{trip.amount}</p>
        <p className={`text-[10px] font-bold uppercase tracking-wide ${statusClass}`}>
          {trip.statusLabel}
        </p>
      </div>
    </li>
  )
}

export default function AdminRiderDetailPage({ rider }) {
  const [activeTab, setActiveTab] = useState(rider.defaultTab ?? 'trips')
  const isOnline = rider.onlineLabel === 'Online'

  return (
    <div className="p-6">
      <AdminRidersBreadcrumbs items={rider.breadcrumbs} />

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative">
          <div
            className="h-36 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(55,65,81,0.85), rgba(55,65,81,0.85)), url("https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80&auto=format&fit=crop")',
            }}
            aria-hidden
          />

          <div className="absolute right-6 top-6 flex flex-wrap gap-2">
            {rider.status === 'on_trip' ? (
              <Link
                to={getRiderTrackingPath(rider.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-violet-700 transition-colors hover:bg-violet-100"
              >
                <MapPin size={16} strokeWidth={2} aria-hidden />
                Track Live
              </Link>
            ) : null}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-red-600 transition-colors hover:bg-red-50"
            >
              <Ban size={16} strokeWidth={2} aria-hidden />
              {rider.suspendLabel}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#E84A15]"
            >
              <Pencil size={16} strokeWidth={2} aria-hidden />
              {rider.editProfileLabel}
            </button>
          </div>
        </div>

        <div className="relative px-6 pb-6">
          <div className="-mt-14 flex flex-wrap items-end gap-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="relative">
                <span
                  className={`flex h-28 w-28 items-center justify-center rounded-xl border-4 border-white bg-white text-2xl font-bold shadow-md ${rider.avatarTone}`}
                >
                  {rider.initials}
                </span>
                <span
                  className={`absolute bottom-1 right-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    isOnline
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {rider.onlineLabel}
                </span>
              </div>
              <div className="pb-1">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{rider.name}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  ID: #{rider.displayId} • {rider.joined}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {rider.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <nav
          className="flex gap-8 border-b border-gray-100 px-6"
          aria-label="Rider detail sections"
        >
          {rider.tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 py-4 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-rapid-orange text-rapid-orange'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>

        {activeTab === 'trips' ? (
          rider.tripHistory.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-gray-500">No trip history yet.</p>
          ) : (
            <ul>
              {rider.tripHistory.map((trip) => (
                <TripHistoryItem key={trip.id} trip={trip} />
              ))}
            </ul>
          )
        ) : (
          <AdminRiderDocumentsList documents={rider.documents} />
        )}
      </section>
    </div>
  )
}
