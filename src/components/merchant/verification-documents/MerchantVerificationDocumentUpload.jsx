import { useRef, useState } from 'react'
import { CloudUpload, FileText, MapPin, Shield, Trash2, Upload } from 'lucide-react'
import { formatDocumentFileSize } from '../../../utils/merchantVerificationDocuments'

const SECTION_ICONS = {
  shield: Shield,
  file: FileText,
  location: MapPin,
}

function DocumentCardHeader({ section, uploaded }) {
  const Icon = SECTION_ICONS[section.icon] ?? FileText

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-5 text-merchant-ink">{section.title}</h3>
        <p className="mt-0.5 text-xs leading-4 text-merchant-body">{section.subtitle}</p>
      </div>
      <Icon
        size={uploaded && section.icon === 'file' ? 17 : 16}
        className={uploaded && section.icon === 'file' ? 'shrink-0 text-merchant-primary' : 'shrink-0 text-merchant-body'}
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  )
}

function DropzoneArea({ document, onSelect }) {
  const inputRef = useRef(null)

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[rgba(171,179,183,0.4)] px-8 py-8 text-center">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onSelect(file)
          e.target.value = ''
        }}
        aria-label={`Upload ${document.section.title}`}
      />
      <CloudUpload size={28} className="text-[#ABB3B7]" strokeWidth={1.5} aria-hidden />
      <p className="mt-3 text-sm font-medium leading-5 text-merchant-ink">
        {document.dropzone.prompt}{' '}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="font-medium text-merchant-link hover:text-merchant-primary"
        >
          {document.dropzone.browseLabel}
        </button>
      </p>
      <p className="mt-2 text-[10px] leading-[15px] text-merchant-body">{document.dropzone.hint}</p>
    </div>
  )
}

function CompactUploadArea({ document, onSelect }) {
  const inputRef = useRef(null)

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[rgba(171,179,183,0.4)] px-8 py-8 text-center">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onSelect(file)
          e.target.value = ''
        }}
        aria-label={`Upload ${document.section.title}`}
      />
      <Upload size={25} className="text-[#ABB3B7]" strokeWidth={1.5} aria-hidden />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-3 text-sm font-medium leading-5 text-merchant-ink hover:text-merchant-primary"
      >
        {document.compact.label}
      </button>
    </div>
  )
}

function UploadedFileRow({ document, onReplace, onRemove }) {
  const inputRef = useRef(null)

  return (
    <div className="flex items-center gap-4 rounded-lg bg-merchant-primary/5 px-5 py-5">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onReplace(file)
          e.target.value = ''
        }}
        aria-label={`Replace ${document.section.title}`}
      />
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
        <FileText size={16} className="text-merchant-primary" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs leading-4 text-merchant-ink">{document.file.name}</p>
        <p className="mt-0.5 text-[10px] leading-[15px] text-merchant-body">{document.file.meta}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-[#9E3F4E] transition-colors hover:bg-red-50"
        aria-label={`Remove ${document.file.name}`}
      >
        <Trash2 size={14} strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  )
}

function DocumentUploadBody({ document, onUpload, onRemove }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const uploaded = Boolean(document.file)

  const applyFile = async (file) => {
    if (!onUpload) return
    setBusy(true)
    setError('')
    try {
      await onUpload(file)
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const clearFile = async () => {
    if (!onRemove) return
    setBusy(true)
    setError('')
    try {
      await onRemove()
    } catch (err) {
      setError(err.message || 'Unable to remove file.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={busy ? 'pointer-events-none opacity-60' : ''}>
      {uploaded ? (
        <UploadedFileRow document={document} onReplace={applyFile} onRemove={clearFile} />
      ) : document.variant === 'compact' ? (
        <CompactUploadArea document={document} onSelect={applyFile} />
      ) : (
        <DropzoneArea document={document} onSelect={applyFile} />
      )}
      {error ? <p className="mt-2 text-sm text-merchant-error">{error}</p> : null}
    </div>
  )
}

export default function MerchantVerificationDocumentCard({
  document,
  onUpload,
  onRemove,
  embedded = false,
}) {
  const uploaded = Boolean(document.file)

  if (embedded) {
    return (
      <DocumentUploadBody document={document} onUpload={onUpload} onRemove={onRemove} />
    )
  }

  return (
    <article
      className={`flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0px_1px_2px_rgba(226,232,240,0.5)] ${
        uploaded ? 'border border-merchant-primary/10' : ''
      }`}
    >
      <DocumentCardHeader section={document.section} uploaded={uploaded} />
      <DocumentUploadBody document={document} onUpload={onUpload} onRemove={onRemove} />
    </article>
  )
}

