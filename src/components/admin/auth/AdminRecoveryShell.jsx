export default function AdminRecoveryShell({ icon: Icon, children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F6F8] px-6 py-12 font-sans">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0px_4px_24px_0px_rgba(25,28,29,0.08)]">
          <Icon size={28} strokeWidth={1.75} className="text-[#C4590E]" aria-hidden />
        </div>
        {children}
      </div>
    </div>
  )
}
