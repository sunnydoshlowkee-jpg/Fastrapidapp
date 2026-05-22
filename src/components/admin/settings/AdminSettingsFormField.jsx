import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const fieldClass =
  'w-full border-0 border-b-2 border-gray-700 bg-gray-100 px-0 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-0'

export function AdminSettingsFormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={3}
          className={`${fieldClass} mt-2 resize-none`}
        />
      ) : (
        <div className="relative mt-2">
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            className={`${fieldClass} ${isPassword ? 'pr-10' : ''}`}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.75} />
              ) : (
                <Eye size={18} strokeWidth={1.75} />
              )}
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export function AdminSettingsSelectField({ id, label, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`${fieldClass} appearance-none pr-8`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
          aria-hidden
        >
          ▾
        </span>
      </div>
    </div>
  )
}
