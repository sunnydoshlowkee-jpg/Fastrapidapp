import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'

const leadingIconMap = {
  mail: Mail,
  lock: Lock,
}

const labelStyles = {
  default: 'text-sm font-medium text-gray-600',
  recovery: 'text-[11px] font-bold uppercase tracking-[0.08em] text-[#C4590E]',
  recoveryMuted: 'text-[11px] font-bold uppercase tracking-[0.08em] text-gray-600',
}

export default function AdminAuthField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  leadingIcon,
  error,
  labelVariant = 'default',
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const LeadingIcon = leadingIcon ? leadingIconMap[leadingIcon] : null

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className={labelStyles[labelVariant] ?? labelStyles.default}>
        {label}
      </label>

      <div className="relative">
        {LeadingIcon ? (
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          >
            <LeadingIcon size={18} strokeWidth={1.75} />
          </span>
        ) : null}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-lg bg-gray-100 py-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-rapid-orange/25 ${
            LeadingIcon ? 'pl-11 pr-4' : 'px-4'
          } ${isPassword ? 'pr-12' : ''} ${error ? 'ring-2 ring-red-500/40' : ''}`}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
          </button>
        ) : null}
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
