import { useState } from 'react'
import { LocateFixed, MapPin, X } from 'lucide-react'
import { LOCATION_AREAS } from '../../utils/geo'
import { useLocation } from '../../context/LocationContext'

export default function LocationPicker({ open, onClose }) {
  const { setUserLocation, detectCurrentLocation, detecting, error } = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const ALL_LOCATIONS = [
    ...LOCATION_AREAS,
    { location_label: '12 Admiralty Way, Lekki Phase 1', city: 'Lagos', latitude: 6.4474, longitude: 3.4723 },
    { location_label: 'Ikoyi Club 1938, Ikoyi', city: 'Lagos', latitude: 6.4494, longitude: 3.4350 },
    { location_label: 'Maryland Mall, Maryland', city: 'Lagos', latitude: 6.5775, longitude: 3.3667 },
    { location_label: 'Gbagada Expressway, Gbagada', city: 'Lagos', latitude: 6.5500, longitude: 3.3833 },
    { location_label: 'Allen Avenue, Ikeja', city: 'Lagos', latitude: 6.5965, longitude: 3.3421 },
    { location_label: 'Ozumba Mbadiwe Road, Victoria Island', city: 'Lagos', latitude: 6.4354, longitude: 3.4219 },
    { location_label: 'Bode Thomas Street, Surulere', city: 'Lagos', latitude: 6.4969, longitude: 3.3550 },
  ]

  if (!open) return null

  const selectArea = async (area) => {
    await setUserLocation({
      ...area,
      state: 'Lagos',
      country_code: 'NG',
    })
    onClose()
  }

  const saveCustom = async () => {
    const label = searchQuery.trim()
    if (!label) return

    const fallback = LOCATION_AREAS[0]
    await setUserLocation({
      ...fallback,
      location_label: label,
      state: 'Lagos',
      country_code: 'NG',
    })
    onClose()
  }

  const handleSearch = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    if (!q.trim()) {
      setSuggestions([])
      return
    }
    const results = ALL_LOCATIONS.filter(l => 
      l.location_label.toLowerCase().includes(q.toLowerCase()) || 
      l.city.toLowerCase().includes(q.toLowerCase())
    )
    setSuggestions(results)
  }

  const useGps = async () => {
    const result = await detectCurrentLocation()
    if (result) onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl md:rounded-3xl p-6 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Delivery location</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <button
          type="button"
          onClick={useGps}
          disabled={detecting}
          className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-[#4F46E5] font-bold py-3 rounded-xl mb-4 hover:bg-indigo-100 disabled:opacity-60"
        >
          <LocateFixed size={18} />
          {detecting ? 'Detecting location…' : 'Use my current location'}
        </button>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Popular areas in Lagos</p>
        <div className="space-y-2 mb-6">
          {LOCATION_AREAS.map((area) => (
            <button
              key={area.location_label}
              type="button"
              onClick={() => selectArea(area)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-left"
            >
              <MapPin size={18} className="text-[#4F46E5] shrink-0" />
              <span className="font-semibold text-gray-900">{area.location_label}, {area.city}</span>
            </button>
          ))}
        </div>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Search Address</p>
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="e.g. 12 Admiralty Way"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            <button
              type="button"
              onClick={saveCustom}
              className="px-4 py-3 bg-[#4F46E5] text-white font-bold rounded-xl text-sm"
            >
              Save
            </button>
          </div>
          {searchQuery.trim().length > 0 && suggestions.length === 0 && (
             <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-50 p-4 text-center text-sm text-gray-500">
               No matching addresses found. Click Save to use this address anyway.
             </div>
          )}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden max-h-[200px] overflow-y-auto">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectArea(s)}
                  className="w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 text-sm font-medium text-gray-900 last:border-0 flex items-center gap-3 transition-colors"
                >
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{s.location_label}, {s.city}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
