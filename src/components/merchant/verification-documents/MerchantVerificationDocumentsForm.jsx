import { useState } from 'react'
import { ArrowLeft, Check, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import MerchantButton from '../auth/MerchantButton'
import { MERCHANT_REGISTRATION_PATH } from '../../../services/data/merchantRegistration.mock'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantVerificationDocumentCard from './MerchantVerificationDocumentUpload'

function DocumentBadge({ badge }) {
  if (badge === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
        <Check size={12} strokeWidth={3} aria-hidden />
        Verified
      </span>
    )
  }
  return (
    <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">
      Required
    </span>
  )
}

function WhyWeNeedThisSection({ content }) {
  if (!content) return null

  return (
    <section className="border-t border-merchant-divider pt-10">
      <div className="grid gap-8 md:grid-cols-[320px_1fr] md:items-center">
        <div className="relative min-h-[160px] overflow-hidden rounded-2xl bg-merchant-onboarding-sidebar">
          {content.imageUrl ? (
            <img
              src={content.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-luminosity"
            />
          ) : null}
          <div
            className="absolute inset-0 bg-gradient-to-t from-merchant-onboarding-sidebar to-transparent"
            aria-hidden
          />
        </div>
        <div>
          <h2 className="text-xs font-normal uppercase tracking-[-0.06em] text-merchant-ink">
            {content.title}
          </h2>
          <p className="mt-2 text-xs leading-5 text-merchant-body">{content.body}</p>
        </div>
      </div>
    </section>
  )
}

export default function MerchantVerificationDocumentsForm({
  page,
  documents,
  whyWeNeedThis,
  onUpload,
  onRemove,
  onContinue,
  variant = 'desktop',
  submitting = false,
}) {
  const [openIds, setOpenIds] = useState(() =>
    Object.fromEntries(documents.map((d) => [d.id, true]))
  )

  const toggleOpen = (id) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (variant === 'mobile') {
    return (
      <div className={`w-full ${merchantOnboardingShellClass}`}>
        <p className="text-sm leading-relaxed text-merchant-body">
          <span className="font-semibold text-merchant-muted">{page.mobileStepPrefix}</span>{' '}
          {page.subtitle}
        </p>

        <form
          id="merchant-verification-docs-mobile-form"
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            onContinue?.()
          }}
        >
          {documents.map((document) => {
            const isOpen = openIds[document.id]
            return (
              <section
                key={document.id}
                className="overflow-hidden rounded-lg bg-white shadow-[0px_1px_2px_rgba(226,232,240,0.5)]"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(document.id)}
                  className="flex w-full items-start gap-2 px-4 py-3.5 text-left transition-colors hover:bg-merchant-input/50"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-bold text-merchant-ink">
                        {document.section.title}
                      </span>
                      <DocumentBadge
                        badge={document.file ? 'verified' : 'required'}
                      />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-merchant-body">
                      {document.section.subtitle}
                    </p>
                  </div>
                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-merchant-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-merchant-divider px-4 pb-4 pt-3">
                    <MerchantVerificationDocumentCard
                      embedded
                      document={document}
                      onUpload={(file) => onUpload?.(document.id, file)}
                      onRemove={() => onRemove?.(document.id)}
                    />
                  </div>
                ) : null}
              </section>
            )
          })}
        </form>
      </div>
    )
  }

  return (
    <div className={`w-full max-w-[672px] ${merchantOnboardingShellClass}`}>
      <header className="space-y-2">
        <h1 className="pt-2 text-[36px] font-normal leading-10 tracking-[-0.025em] text-merchant-ink">
          {page.title}
        </h1>
        <p className="max-w-md text-base leading-6 text-merchant-body">{page.subtitle}</p>
      </header>

      <form
        className="mt-12 flex flex-col gap-12"
        onSubmit={(e) => {
          e.preventDefault()
          onContinue?.()
        }}
      >
        <div className="flex flex-col gap-6">
          {documents.map((document) => (
            <MerchantVerificationDocumentCard
              key={document.id}
              document={document}
              onUpload={(file) => onUpload?.(document.id, file)}
              onRemove={() => onRemove?.(document.id)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link
            to={MERCHANT_REGISTRATION_PATH}
            className="inline-flex items-center gap-2 text-sm font-bold leading-5 text-merchant-body transition-colors hover:text-merchant-ink"
          >
            <ArrowLeft size={10} strokeWidth={2.5} aria-hidden />
            {page.backLabel}
          </Link>
          <MerchantButton
            type="submit"
            disabled={submitting}
            className="w-auto shrink-0 rounded-lg px-10 py-4 text-base font-bold leading-6 tracking-[-0.025em] shadow-merchant-cta"
          >
            {submitting ? 'Saving…' : page.continueLabel}
          </MerchantButton>
        </div>

        <WhyWeNeedThisSection content={whyWeNeedThis} />
      </form>
    </div>
  )
}
