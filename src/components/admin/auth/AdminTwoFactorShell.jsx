import { Lock, Shield } from 'lucide-react'

export default function AdminTwoFactorShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F6F8] px-6 py-12 font-sans">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0px_4px_24px_0px_rgba(25,28,29,0.08)]">
          <span className="relative flex h-9 w-9 items-center justify-center text-[#A84A18]">
            <Shield size={32} strokeWidth={1.75} aria-hidden />
            <Lock
              size={14}
              strokeWidth={2}
              className="absolute bottom-0.5 left-1/2 -translate-x-1/2"
              aria-hidden
            />
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}
