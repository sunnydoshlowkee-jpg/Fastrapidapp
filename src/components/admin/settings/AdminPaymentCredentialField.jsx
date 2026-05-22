import { useState } from 'react'
import { Copy, Eye, EyeOff, KeyRound, Lock } from 'lucide-react'

const fieldClass =
  'w-full border-0 border-b-2 border-gray-700 bg-gray-100 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900 focus:ring-0'

export default function AdminPaymentCredentialField({
  id,
  label,
  value,
  onChange,
  variant = 'public',
}) {
  const [visible, setVisible] = useState(false)
  const isSecret = variant === 'secret'
  const LeadingIcon = isSecret ? Lock : KeyRound
  const displayValue = isSecret && !visible ? value : value

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <div className="relative mt-2 flex items-center gap-2">
        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
          <LeadingIcon size={18} strokeWidth={1.75} aria-hidden />
        </span>
        <input
          id={id}
          type={isSecret && !visible ? 'password' : 'text'}
          value={displayValue}
          onChange={onChange}
          className={`${fieldClass} flex-1 pl-8 ${isSecret ? 'pr-20' : 'pr-10'}`}
        />
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {isSecret ? (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="p-1 text-gray-400 transition-colors hover:text-gray-600"
              aria-label={visible ? 'Hide key' : 'Show key'}
            >
              {visible ? (
                <EyeOff size={18} strokeWidth={1.75} />
              ) : (
                <Eye size={18} strokeWidth={1.75} />
              )}
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Copy to clipboard"
          >
            <Copy size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  )
}
