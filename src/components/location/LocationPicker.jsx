import { useState } from 'react'
import { LocateFixed, MapPin, X } from 'lucide-react'
import { LOCATION_AREAS } from '../../utils/geo'
import { useLocation } from '../../context/LocationContext'

export default function LocationPicker({ open, onClose }) {
  const { setUserLocation, detectCurrentLocation, detecting, error } = useLocation()
  const [customLabel, setCustomLabel] = useState('')

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
    const label = customLabel.trim()
    if (!label) return

    const yaba = LOCATION_AREAS[0]
    await setUserLocation({
      ...yaba,
      location_label: label,
      state: 'Lagos',
      country_code: 'NG',
    })
    onClose()
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

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Custom label</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="e.g. 12 Admiralty Way"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
          />
          <button
            type="button"
            onClick={saveCustom}
            className="px-4 py-3 bg-[#4F46E5] text-white font-bold rounded-xl text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
