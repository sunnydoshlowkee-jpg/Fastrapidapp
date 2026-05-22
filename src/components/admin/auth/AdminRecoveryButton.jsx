import { ArrowRight } from 'lucide-react'

export default function AdminRecoveryButton({ children, disabled, type = 'submit' }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C4590E] px-4 py-4 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0px_4px_14px_0px_rgba(196,89,14,0.35)] transition-opacity hover:bg-[#A84A18] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
      <ArrowRight size={18} strokeWidth={2} aria-hidden />
    </button>
  )
}
