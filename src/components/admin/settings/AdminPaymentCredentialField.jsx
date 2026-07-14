import { useState } from 'react'
import { Copy, Eye, EyeOff } from 'lucide-react'

export default function AdminPaymentCredentialField({
  id,
  label,
  value,
  onChange,
  variant = 'public',
  multiline = false,
}) {
  const [visible, setVisible] = useState(false)
  const isSecret = variant === 'secret'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-[0.05em] text-[#584237]"
      >
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            value={isSecret && !visible ? '•'.repeat(value.length) : value}
            onChange={onChange}
            readOnly
            rows={2}
            className="w-full resize-none rounded-sm bg-[#F3F3F4] px-4 py-3 pr-16 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-rapid-orange/20"
          />
        ) : (
          <input
            id={id}
            type={isSecret && !visible ? 'password' : 'text'}
            value={value}
            onChange={onChange}
            readOnly
            className="w-full rounded-sm bg-[#F3F3F4] px-4 py-3 pr-16 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-rapid-orange/20"
          />
        )}
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {isSecret ? (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="text-[#584237] transition-colors hover:text-gray-900"
              aria-label={visible ? 'Hide key' : 'Show key'}
            >
              {visible ? (
                <EyeOff size={16} strokeWidth={1.75} />
              ) : (
                <Eye size={16} strokeWidth={1.75} />
              )}
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleCopy}
            className="text-[#584237] transition-colors hover:text-gray-900"
            aria-label="Copy to clipboard"
          >
            <Copy size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  )
}
