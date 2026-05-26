import { Lock, RotateCcw } from 'lucide-react'

export function AdminResetPasswordIcon() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center text-[#C4590E]">
      <RotateCcw size={28} strokeWidth={1.75} aria-hidden />
      <Lock
        size={13}
        strokeWidth={2}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        aria-hidden
      />
    </span>
  )
}

export default function AdminRecoveryCard({ children, icon, hideIcon = false }) {
  const renderedIcon =
    icon !== undefined ? icon : hideIcon ? null : <AdminResetPasswordIcon />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F6F8] px-6 py-12 font-sans">
      <article className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-[0px_8px_40px_0px_rgba(25,28,29,0.08)] sm:px-8 sm:py-10">
        <span
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#FF7A3D] via-[#E84A15] to-[#C4590E]"
          aria-hidden
        />
        {renderedIcon ? (
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF4ED]">
              {renderedIcon}
            </div>
          </div>
        ) : null}
        {children}
      </article>
    </div>
  )
}
