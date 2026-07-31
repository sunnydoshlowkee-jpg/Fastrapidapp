export default function MerchantPendingApprovalFooter({ footer }) {
  return (
    <footer className="mt-auto border-t border-merchant-divider bg-merchant-surface px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-1 text-xs text-merchant-body" aria-label="Legal">
          {footer.links.map((link, index) => (
            <span key={link.label} className="inline-flex items-center">
              {index > 0 ? <span className="px-1.5 text-merchant-muted" aria-hidden>·</span> : null}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-merchant-ink"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
        <p className="text-[11px] text-merchant-muted">{footer.copyright}</p>
      </div>
    </footer>
  )
}
