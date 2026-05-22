import { AlertCircle } from 'lucide-react'

export default function AdminAuthErrorAlert({ title, message }) {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3.5"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-400 bg-red-100 text-red-600">
        <AlertCircle size={18} strokeWidth={2} aria-hidden />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-bold text-red-700">{title}</p>
        <p className="mt-0.5 text-sm text-red-600">{message}</p>
      </div>
    </div>
  )
}
