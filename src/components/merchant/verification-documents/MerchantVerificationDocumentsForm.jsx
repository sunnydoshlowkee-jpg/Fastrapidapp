import { useRef, useState } from 'react'
import { ArrowLeft, Check, ChevronDown, CloudUpload, FileText, Trash2, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import MerchantButton from '../auth/MerchantButton'
import MerchantRegistrationMobileLogoUpload from '../registration/mobile/MerchantRegistrationMobileLogoUpload'
import MerchantRegistrationSection from '../registration/MerchantRegistrationSection'
import { MERCHANT_REGISTRATION_PATH } from '../../../services/data/merchantRegistration.mock'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function DocumentUploadField({ document, onChange, hideUploadedCheck = false }) {
  const inputRef = useRef(null)
  const isUploaded = document.status === 'uploaded' && document.file

  const handleSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    onChange({
      ...document,
      status: 'uploaded',
      file: {
        name: file.name,
        meta: `Uploaded just now • ${formatFileSize(file.size)}`,
      },
    })
    event.target.value = ''
  }

  const openPicker = () => inputRef.current?.click()

  if (isUploaded) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-merchant-input px-4 py-3.5">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="sr-only"
          onChange={handleSelect}
          aria-label={`Replace ${document.section.title}`}
        />
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
          <FileText size={18} strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-merchant-ink">{document.file.name}</p>
          <p className="mt-0.5 text-sm text-merchant-muted">{document.file.meta}</p>
        </div>
        {hideUploadedCheck ? null : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-merchant-primary text-white">
            <Check size={16} strokeWidth={2.5} aria-hidden />
          </span>
        )}
        <button
          type="button"
          onClick={() => onChange({ ...document, status: 'empty', file: undefined })}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
          aria-label={`Remove ${document.file.name}`}
        >
          <Trash2 size={18} strokeWidth={1.75} />
        </button>
      </div>
    )
  }

  const uploadLogo =
    document.variant === 'dropzone'
      ? {
          description: document.dropzone.prompt,
          actionLabel: document.dropzone.browseLabel,
          hint: document.dropzone.hint,
        }
      : {
          actionLabel: document.compact.label,
        }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="sr-only"
        onChange={handleSelect}
        aria-label={`Upload ${document.section.title}`}
      />
      <MerchantRegistrationMobileLogoUpload
        logo={uploadLogo}
        icon={document.variant === 'compact' ? Upload : CloudUpload}
        onActionClick={openPicker}
        showLabel={false}
        compact={document.variant === 'compact'}
      />
    </>
  )
}

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

export default function MerchantVerificationDocumentsForm({
  page,
  documents: initialDocuments,
  onContinue,
  variant = 'desktop',
}) {
  const [documents, setDocuments] = useState(initialDocuments)

  const [openIds, setOpenIds] = useState(() =>
    Object.fromEntries(initialDocuments.map((d) => [d.id, true]))
  )

  const updateDocument = (id, next) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? next : doc)))
  }

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
                className="overflow-hidden rounded-merchant-stat bg-merchant-surface shadow-merchant-stat"
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
                        badge={
                          document.id === 'tin' && document.status === 'uploaded'
                            ? 'verified'
                            : 'required'
                        }
                      />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-merchant-muted">
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
                  <div className="px-4 pb-4 pt-3">
                    <DocumentUploadField
                      document={document}
                      onChange={(next) => updateDocument(document.id, next)}
                      hideUploadedCheck
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
    <div className={`mx-auto w-full max-w-2xl ${merchantOnboardingShellClass}`}>
      <h1 className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink lg:text-[1.75rem]">
        {page.title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-merchant-body lg:text-base">
        {page.subtitle}
      </p>

      <form
        className="mt-8 space-y-10"
        onSubmit={(e) => {
          e.preventDefault()
          onContinue?.()
        }}
      >
        {documents.map((document) => (
          <MerchantRegistrationSection key={document.id} section={document.section}>
            <DocumentUploadField
              document={document}
              onChange={(next) => updateDocument(document.id, next)}
            />
          </MerchantRegistrationSection>
        ))}

        <div className="flex flex-col-reverse items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to={MERCHANT_REGISTRATION_PATH}
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-merchant-body transition-colors hover:text-merchant-ink sm:justify-start"
          >
            <ArrowLeft size={18} strokeWidth={2} aria-hidden />
            {page.backLabel}
          </Link>
          <MerchantButton type="submit" className="sm:max-w-[220px]">
            {page.continueLabel}
          </MerchantButton>
        </div>
      </form>
    </div>
  )
}
