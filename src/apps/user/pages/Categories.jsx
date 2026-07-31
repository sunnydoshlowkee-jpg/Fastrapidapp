import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { getDiscoveryCategories } from '../../../services/discoveryService'
import { useLocation } from '../../../context/LocationContext'
import { cacheKey, getCached, setCached } from '../../../utils/requestCache'
import BrandedLoader from '../../../components/ui/BrandedLoader'

const CATEGORIES_TTL_MS = 5 * 60 * 1000

export default function Categories() {
  const navigate = useNavigate()
  const { location, loading: locationLoading } = useLocation()

  const key = useMemo(() => {
    if (location?.latitude == null || location?.longitude == null) return null
    return cacheKey(['categories', location.latitude, location.longitude, location.city])
  }, [location])

  const initialCached = key ? getCached(key, { ttlMs: CATEGORIES_TTL_MS }) : null
  const [categories, setCategories] = useState(initialCached?.data ?? [])
  const [loading, setLoading] = useState(!initialCached)
  const [error, setError] = useState('')

  useEffect(() => {
    if (locationLoading || location?.latitude == null || location?.longitude == null || !key) {
      return
    }

    let active = true
    const cached = getCached(key, { ttlMs: CATEGORIES_TTL_MS })

    if (cached?.data) {
      setCategories(cached.data)
      setLoading(false)
      if (cached.fresh) {
        return () => {
          active = false
        }
      }
    } else {
      setLoading(true)
    }

    async function loadCategories() {
      try {
        setError('')
        const { data } = await getDiscoveryCategories({
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
          location_label: location.location_label,
        })
        if (!active) return
        const next = data?.data?.categories || []
        setCached(key, next)
        setCategories(next)
      } catch (err) {
        if (!active) return
        setError(err?.response?.data?.message || err?.message || 'Could not load categories.')
        if (!cached?.data) setCategories([])
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCategories()

    return () => {
      active = false
    }
  }, [location, locationLoading, key])

  const areaLabel = location?.location_label || location?.city || 'your area'

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8">
      <div className="px-5 md:px-10 pt-app md:pt-8 pb-4 flex items-center gap-3 border-b border-gray-100 bg-[#FAFAFA]/95 backdrop-blur-md sticky top-0 z-30">
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:w-10 md:h-10 md:flex md:items-center md:justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-[18px] md:text-[24px] font-bold text-gray-900">Browse Categories</h1>
          <p className="text-[12px] md:text-[14px] text-gray-500">Near {areaLabel}</p>
        </div>
      </div>

      <div className="px-5 md:px-10 py-6 w-full max-w-3xl mx-auto flex-1">
        {loading || locationLoading ? (
          <BrandedLoader size="md" />
        ) : error ? (
          <p className="text-sm text-red-600 py-10 text-center">{error}</p>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 px-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[15px] font-semibold text-gray-900 mb-2">No extra categories nearby yet</p>
            <p className="text-sm text-gray-500">
              Food and groceries are on the home screen. More vendor types will appear here as they join RAPID near you.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => navigate(`/app/vendors/${category.id}`)}
                className="w-full bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm border border-gray-100 hover:border-[#4F46E5]/30 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#F4F5F7] flex items-center justify-center text-[28px] shrink-0">
                    {category.emoji}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-gray-900 text-[15px] md:text-[17px] mb-1">{category.name}</h2>
                    <p className="text-[12px] md:text-[13px] text-gray-500 line-clamp-2">{category.description}</p>
                    <p className="text-[11px] font-semibold text-[#4F46E5] mt-2">
                      {category.count} {category.count === 1 ? 'vendor' : 'vendors'} nearby
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
