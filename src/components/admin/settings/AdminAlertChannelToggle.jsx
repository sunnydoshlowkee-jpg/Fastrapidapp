import { Check } from 'lucide-react'

export default function AdminAlertChannelToggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onChange}
      className={`relative mx-auto flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
        enabled ? 'bg-sky-500' : 'bg-gray-200'
      }`}
    >
      {enabled ? (
        <Check size={16} className="text-white" strokeWidth={3} aria-hidden />
      ) : (
        <span className="absolute left-1 h-6 w-6 rounded-full bg-white shadow" aria-hidden />
      )}
    </button>
  )
}
