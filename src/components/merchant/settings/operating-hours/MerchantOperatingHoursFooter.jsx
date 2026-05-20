export default function MerchantOperatingHoursFooter({ footer, onDiscard, onSave }) {
  return (
    <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
      <button
        type="button"
        onClick={onDiscard}
        className="text-sm font-semibold text-merchant-muted transition-colors hover:text-merchant-ink"
      >
        {footer.discardLabel}
      </button>
      <button
        type="button"
        onClick={onSave}
        className="rounded-lg bg-merchant-primary px-6 py-3 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
      >
        {footer.saveLabel}
      </button>
    </footer>
  )
}


