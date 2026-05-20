export default function MerchantMenuItemCreateField({ id, label, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-merchant-ink">
        {label}
      </label>
      {children}
    </div>
  )
}
