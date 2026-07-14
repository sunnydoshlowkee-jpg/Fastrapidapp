import { Menu } from 'lucide-react'

export default function AdminMobileMenuButton({ onOpen, label = 'Open menu' }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className="fixed left-3 top-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#9D4300] shadow-md ring-1 ring-gray-200 transition-colors hover:bg-white lg:hidden"
    >
      <Menu size={18} strokeWidth={2.25} />
    </button>
  )
}
