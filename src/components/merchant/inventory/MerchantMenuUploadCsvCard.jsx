import { useRef, useState } from 'react'
import { Download, FileSpreadsheet, UploadCloud } from 'lucide-react'

export default function MerchantMenuUploadCsvCard({ csvUpload, onUpload, onDownloadTemplate }) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (files) => {
    const file = files?.[0]
    if (file) setFileName(file.name)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <article className="flex min-h-[509px] flex-col items-center justify-between rounded-xl bg-merchant-surface px-10 py-10 shadow-merchant-choice-card">
      <div className="flex w-full max-w-[376px] flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(36,25,233,0.05)] text-merchant-link">
          <FileSpreadsheet size={20} strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="mt-6 text-xl font-semibold leading-7 text-merchant-ink">{csvUpload.title}</h3>
        <p className="mt-3 text-sm leading-[23px] text-merchant-body">{csvUpload.description}</p>

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
          className={`mt-6 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-8 py-8 transition-colors ${
            dragOver
              ? 'border-merchant-link bg-[rgba(36,25,233,0.05)]'
              : 'border-[rgba(198,196,218,0.3)] hover:border-merchant-link/40'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <UploadCloud size={22} className="text-merchant-muted" strokeWidth={1.5} aria-hidden />
          <p className="text-center text-xs font-medium leading-4 text-merchant-muted">
            {csvUpload.dropzoneHint}{' '}
            <span className="font-semibold text-merchant-link">{csvUpload.browseLabel}</span>
          </p>
          {fileName ? (
            <p className="text-xs font-medium text-merchant-ink">Selected: {fileName}</p>
          ) : null}
        </div>
      </div>

      <div className="flex w-full max-w-[376px] flex-col gap-4">
        <button
          type="button"
          onClick={onUpload}
          className="w-full rounded-xl bg-merchant-link py-4 text-base font-semibold text-white shadow-merchant-btn transition-colors hover:bg-merchant-primary-dark"
        >
          {csvUpload.uploadLabel}
        </button>

        <button
          type="button"
          onClick={onDownloadTemplate}
          className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.6px] text-merchant-link hover:text-merchant-primary-dark"
        >
          <Download size={10} strokeWidth={2.5} aria-hidden />
          {csvUpload.templateLabel}
        </button>
      </div>
    </article>
  )
}
