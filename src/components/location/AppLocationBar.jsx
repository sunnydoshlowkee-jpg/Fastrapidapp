import { useState } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import { useLocation } from '../../context/LocationContext'
import LocationPicker from './LocationPicker'

export default function AppLocationBar({
  variant = 'mobile',
  className = '',
}) {
  const { display, detecting } = useLocation()
  const [pickerOpen, setPickerOpen] = useState(false)

  const label = detecting ? 'Detecting…' : display

  if (variant === 'desktop') {
    return (
      <>
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className={`flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors ${className}`}
        >
          <MapPin size={20} className="text-[#4F46E5]" strokeWidth={2} />
          <span className="font-semibold text-[#4F46E5] text-[15px] max-w-[200px] truncate">{label}</span>
        </button>
        <LocationPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
      </>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setPickerOpen(true)}
        className={`flex items-center gap-1.5 cursor-pointer hover:bg-gray-100/50 p-2 rounded-xl transition-colors -ml-2 ${className}`}
      >
        <MapPin size={18} className="text-[#4F46E5]" strokeWidth={2} />
        <span className="font-semibold text-gray-900 text-[14px] max-w-[160px] truncate">{label}</span>
        <ChevronDown size={14} className="text-gray-400 shrink-0" />
      </button>
      <LocationPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  )
}
