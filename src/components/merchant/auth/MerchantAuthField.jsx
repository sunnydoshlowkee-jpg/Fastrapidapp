import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'

export default function MerchantAuthField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  labelAction,
  uppercaseLabel = true,
  trailingIcon,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const showEyeToggle = isPassword && trailingIcon !== 'lock'
  const inputType = showEyeToggle && showPassword ? 'text' : type
  const displayLabel = uppercaseLabel && label ? label.toUpperCase() : label

  return (
    <div className="flex w-full flex-col gap-2">
      {(label || labelAction) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={id}
              className="text-[11px] font-medium uppercase leading-[16.5px] tracking-[0.025em] text-merchant-ink md:text-xs md:normal-case md:leading-[18px] md:tracking-normal md:text-merchant-body"
            >
              {displayLabel}
            </label>
          )}
          {labelAction}
        </div>
      )}

      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-lg bg-merchant-input px-4 py-[18px] text-[13px] font-normal text-merchant-ink outline-none transition-colors placeholder:text-[rgba(69,69,87,0.5)] focus:ring-2 md:border md:border-[rgba(198,196,218,0.3)] md:py-[15px] md:pb-4 md:text-base md:placeholder:text-[rgba(118,117,136,0.5)] md:focus:border-merchant-primary md:focus:ring-merchant-primary/10 ${
            isPassword || trailingIcon === 'mail' || trailingIcon === 'lock' ? 'pr-12 md:pr-12' : ''
          } ${
            error
              ? 'border-2 border-merchant-error bg-[rgba(255,218,214,0.2)] focus:border-merchant-error focus:ring-merchant-error/10 md:border-2 md:shadow-[0px_0px_0px_1px_rgba(186,26,26,0.4)]'
              : 'border-0 md:focus:border-merchant-primary'
          }`}
        />
        {showEyeToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-0 flex h-[52px] items-center px-4 text-[rgba(69,69,87,0.5)] transition-colors hover:text-merchant-body md:right-4 md:top-1/2 md:h-auto md:-translate-y-1/2 md:px-0"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
          </button>
        )}
        {trailingIcon === 'lock' && (
          <span
            className="pointer-events-none absolute right-0 top-0 flex h-[52px] items-center px-4 text-[rgba(69,69,87,0.5)] md:right-4 md:top-1/2 md:h-auto md:-translate-y-1/2 md:px-0"
            aria-hidden
          >
            <Lock size={18} strokeWidth={1.75} />
          </span>
        )}
        {trailingIcon === 'mail' && !isPassword && (
          <span
            className="pointer-events-none absolute right-0 top-0 flex h-[52px] items-center px-4 text-[rgba(69,69,87,0.5)] md:right-4 md:top-1/2 md:h-auto md:-translate-y-1/2 md:px-0"
            aria-hidden
          >
            <Mail size={18} strokeWidth={1.75} />
          </span>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-2 px-0 text-xs leading-[18px] text-merchant-error md:px-1 md:text-[13px] md:leading-[16.25px]">
          <AlertCircle size={12} className="shrink-0 md:hidden" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}
