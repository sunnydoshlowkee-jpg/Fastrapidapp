const footerLinkClass =
  'text-[10px] font-normal leading-[15px] text-merchant-body opacity-80 transition-colors hover:text-merchant-ink'

const minimalLinkClass =
  'text-[10px] font-normal leading-[15px] text-[rgba(88,96,100,0.6)] transition-colors hover:text-merchant-body'

export default function MerchantAuthFooter({ variant = 'login' }) {
  if (variant === 'minimal') {
    return (
      <footer className="flex justify-center py-6 md:justify-end md:py-8">
        <nav className="flex items-center gap-6 md:gap-8" aria-label="Legal and support">
          <a href="#privacy" className={minimalLinkClass}>
            Privacy
          </a>
          <a href="#terms" className={minimalLinkClass}>
            Terms
          </a>
          <a href="#help" className={minimalLinkClass}>
            Help
          </a>
        </nav>
      </footer>
    )
  }

  return (
    <>
      <footer className="flex flex-col items-center gap-1.5 py-8 md:hidden">
        <nav className="flex items-center gap-6" aria-label="Legal and support">
          <a href="#support" className={footerLinkClass}>
            Support
          </a>
          <a href="#privacy" className={footerLinkClass}>
            Privacy Policy
          </a>
          <a href="#terms" className={footerLinkClass}>
            Terms of Service
          </a>
        </nav>
        <p className="text-[10px] font-normal leading-[15px] text-merchant-body opacity-60">
          © 2024 Rapid Logistics. All rights reserved.
        </p>
      </footer>

      <footer className="hidden w-full items-center justify-between px-2 pt-2 md:flex">
        <span className="text-[10px] font-normal uppercase leading-[15px] tracking-[0.1em] text-[rgba(88,96,100,0.6)]">
          © 2024 RAPID LOGISTICS
        </span>
        <nav className="flex items-center gap-4" aria-label="Legal and support">
          <a
            href="#support"
            className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.1em] text-[rgba(88,96,100,0.6)] transition-colors hover:text-merchant-body"
          >
            SUPPORT
          </a>
          <a
            href="#privacy"
            className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.1em] text-[rgba(88,96,100,0.6)] transition-colors hover:text-merchant-body"
          >
            PRIVACY
          </a>
        </nav>
      </footer>
    </>
  )
}
