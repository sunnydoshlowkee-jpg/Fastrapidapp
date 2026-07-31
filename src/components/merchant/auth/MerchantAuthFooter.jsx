import { LEGAL_PRIVACY_URL, LEGAL_TERMS_URL } from '../../../services/data/legalPaths'

const footerLinkClass =
  'text-[10px] font-normal leading-[15px] text-merchant-body opacity-80 transition-colors hover:text-merchant-ink'

const minimalLinkClass =
  'text-[10px] font-normal leading-[15px] text-[rgba(88,96,100,0.6)] transition-colors hover:text-merchant-body'

export default function MerchantAuthFooter({ variant = 'login' }) {
  if (variant === 'minimal') {
    return (
      <footer className="flex justify-center py-6 md:justify-end md:py-8">
        <nav className="flex items-center gap-6 md:gap-8" aria-label="Legal and support">
          <a href={LEGAL_PRIVACY_URL} className={minimalLinkClass} target="_blank" rel="noopener noreferrer">
            Privacy
          </a>
          <a href={LEGAL_TERMS_URL} className={minimalLinkClass} target="_blank" rel="noopener noreferrer">
            Terms
          </a>
          <a href="mailto:support@fastrapid.com" className={minimalLinkClass}>
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
          <a href="mailto:support@fastrapid.com" className={footerLinkClass}>
            Support
          </a>
          <a href={LEGAL_PRIVACY_URL} className={footerLinkClass} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href={LEGAL_TERMS_URL} className={footerLinkClass} target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        </nav>
        <p className="text-[10px] font-normal leading-[15px] text-merchant-body opacity-60">
          © 2026 FastRapid. All rights reserved.
        </p>
      </footer>

      <footer className="hidden w-full items-center justify-between px-2 pt-2 md:flex">
        <span className="text-[10px] font-normal uppercase leading-[15px] tracking-[0.1em] text-[rgba(88,96,100,0.6)]">
          © 2026 FASTRAPID
        </span>
        <nav className="flex items-center gap-4" aria-label="Legal and support">
          <a
            href="mailto:support@fastrapid.com"
            className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.1em] text-[rgba(88,96,100,0.6)] transition-colors hover:text-merchant-body"
          >
            SUPPORT
          </a>
          <a
            href={LEGAL_PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.1em] text-[rgba(88,96,100,0.6)] transition-colors hover:text-merchant-body"
          >
            PRIVACY
          </a>
        </nav>
      </footer>
    </>
  )
}
