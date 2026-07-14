export default function MerchantInventoryAvailabilityToggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label ?? 'Toggle availability'}
      onClick={() => onChange(!enabled)}
      className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        enabled ? 'bg-merchant-primary' : 'bg-merchant-divider'
      }`}
    >
      <span
        className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
        aria-hidden
      />
    </button>
  )
}
