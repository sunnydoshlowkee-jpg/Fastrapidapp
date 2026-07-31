import { useRef, useState } from 'react'
import { Download, FileSpreadsheet, Upload, UploadCloud } from 'lucide-react'

export default function MerchantMenuUploadMobileCsvCard({
  csvUpload,
  mobileCsv,
  onUpload,
  onDownloadTemplate,
  uploading = false,
  error = '',
}) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (files) => {
    const next = files?.[0]
    if (next) setFile(next)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <article className="relative overflow-hidden rounded-xl border border-[rgba(198,196,218,0.15)] border-l-4 border-l-[rgba(198,196,218,0.15)] bg-merchant-surface p-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-1 right-0 bg-gradient-to-br from-[rgba(36,25,233,0.05)] to-transparent"
        aria-hidden
      />

      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-tip-purple text-merchant-link">
          <FileSpreadsheet size={16} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold leading-[22px] text-merchant-ink">
            {csvUpload.title}
          </h3>
          <p className="mt-1 text-[13px] leading-[21px] text-merchant-mobile-muted">
            {csvUpload.description}
          </p>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative mt-4 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed px-6 py-6 transition-colors ${
          dragOver
            ? 'border-merchant-link bg-[rgba(36,25,233,0.05)]'
            : 'border-[rgba(198,196,218,0.3)] bg-[rgba(243,244,245,0.5)]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadCloud size={20} className="text-merchant-mobile-muted" strokeWidth={1.5} aria-hidden />
        <p className="text-center text-[13px] font-medium leading-5 text-merchant-ink">
          {csvUpload.dropzoneHint}{' '}
          <span className="text-merchant-link">{csvUpload.browseLabel}</span>
        </p>
        <p className="text-center text-[11px] leading-4 text-merchant-mobile-muted">
          {mobileCsv.dropzoneSubtext}
        </p>
        {file ? (
          <p className="text-xs font-medium text-merchant-ink">Selected: {file.name}</p>
        ) : null}
      </div>
      {error ? <p className="relative mt-2 text-xs text-red-600">{error}</p> : null}

      <div className="relative mt-3 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onUpload?.(file)}
          disabled={!file || uploading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-merchant-link to-merchant-primary py-4 text-sm font-semibold leading-[21px] text-white shadow-merchant-btn transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? 'Importing…' : mobileCsv.uploadLabel}
          <Upload size={12} strokeWidth={2.5} aria-hidden />
        </button>

        <button
          type="button"
          onClick={onDownloadTemplate}
          className="flex items-center justify-center gap-2 text-[13px] font-medium leading-5 text-merchant-link hover:text-merchant-primary-dark"
        >
          <Download size={10} strokeWidth={2.5} aria-hidden />
          {mobileCsv.templateLabel}
        </button>
      </div>
    </article>
  )
}
