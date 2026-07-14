const inputClassName =
  'w-full rounded-lg border border-[rgba(198,196,218,0.3)] bg-merchant-input px-4 py-3.5 text-sm text-merchant-ink outline-none transition-colors placeholder:text-merchant-muted/70 focus:border-merchant-primary focus:ring-2 focus:ring-merchant-primary/10'

export default function MerchantAccountSettingsField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  variant = 'desktop',
}) {
  const isMobile = variant === 'mobile'

  return (
    <div className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-2'}`}>
      <label
        htmlFor={id}
        className={
          isMobile
            ? 'text-xs font-medium text-merchant-muted'
            : 'text-[11px] font-semibold uppercase tracking-[0.06em] text-merchant-muted'
        }
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
    </div>
  )
}
