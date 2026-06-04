import { ChevronDown, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import {
  merchantRegistrationFieldBareClass,
  merchantRegistrationFieldClass,
  merchantRegistrationLabelClass,
  merchantRegistrationPasswordFieldClass,
  merchantRegistrationPasswordLabelClass,
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
  variant = 'default',
  labelClassName,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const isSecurity = variant === 'security'

  const labelClass = labelClassName ?? (isSecurity ? merchantRegistrationPasswordLabelClass : merchantRegistrationLabelClass)

  const fieldClass = isSecurity
    ? merchantRegistrationPasswordFieldClass
    : merchantRegistrationFieldClass

  return (
    <div className={`flex flex-col ${isSecurity ? 'gap-2' : 'gap-2'}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        {as === 'select' ? (
          <>
            <select
              id={id}
              value={value}
              onChange={onChange}
              className={`${fieldClass} ${bare ? merchantRegistrationFieldBareClass : ''} ${error ? 'border-merchant-error' : ''} appearance-none pr-10`}
            >
              {placeholderOption ? (
                <option value="" disabled>
                  {placeholderOption}
                </option>
              ) : null}
              {options.map((option) => {
                const { value, label } =
                  typeof option === 'string'
                    ? { value: option, label: option }
                    : { value: option.value, label: option.label ?? option.value }

                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              })}
            </select>
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
              aria-hidden
            >
              <ChevronDown size={24} strokeWidth={1.8} />
            </span>
          </>
        ) : as === 'textarea' ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`${fieldClass} ${bare ? merchantRegistrationFieldBareClass : ''} ${error ? 'border-merchant-error' : ''} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${fieldClass} ${bare ? merchantRegistrationFieldBareClass : ''} ${error ? 'border-merchant-error' : ''} ${isPassword ? 'pr-12' : ''}`}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(69,69,87,0.5)]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error ? <p className="text-sm text-merchant-error">{error}</p> : null}
    </div>
  )
}
