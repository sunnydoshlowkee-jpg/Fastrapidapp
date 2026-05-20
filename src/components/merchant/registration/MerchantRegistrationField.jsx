import { ChevronDown, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import {
  merchantRegistrationFieldBareClass,
  merchantRegistrationFieldClass,
  merchantRegistrationLabelClass,
} from './merchantRegistrationStyles'

export default function MerchantRegistrationField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  as = 'input',
  rows = 4,
  options,
  placeholderOption,
  bare = false,
  labelClassName,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClassName ?? merchantRegistrationLabelClass}>
        {label}
      </label>

      <div className="relative">
        {as === 'select' ? (
          <>
            <select
              id={id}
              value={value}
              onChange={onChange}
              className={`${merchantRegistrationFieldClass} ${bare ? merchantRegistrationFieldBareClass : ''} appearance-none pr-10`}
            >
              {placeholderOption ? (
                <option value="" disabled>
                  {placeholderOption}
                </option>
              ) : null}
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-merchant-muted"
              aria-hidden
            >
              <ChevronDown size={18} strokeWidth={2} />
            </span>
          </>
        ) : as === 'textarea' ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`${merchantRegistrationFieldClass} ${bare ? merchantRegistrationFieldBareClass : ''} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${merchantRegistrationFieldClass} ${bare ? merchantRegistrationFieldBareClass : ''} ${isPassword ? 'pr-12' : ''}`}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-merchant-muted"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}
