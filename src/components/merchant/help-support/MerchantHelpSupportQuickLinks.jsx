import { BookOpen, MessageCircle } from 'lucide-react'
import { merchantHelpSupportCardClass } from './merchantHelpSupportStyles'

const iconMap = {
  book: BookOpen,
  message: MessageCircle,
}

const toneClass = {
  book: 'bg-merchant-nav-active text-merchant-primary',
  message: 'bg-amber-50 text-amber-600',
}

export default function MerchantHelpSupportQuickLinks({ quickLinks }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {quickLinks.map((link) => {
        const Icon = iconMap[link.icon] ?? BookOpen

        return (
          <button
            key={link.id}
            type="button"
            className={`${merchantHelpSupportCardClass} flex items-start gap-3 p-4 text-left transition-colors hover:bg-merchant-canvas/40`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                toneClass[link.icon] ?? toneClass.book
              }`}
            >
              <Icon size={18} strokeWidth={1.75} aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-bold text-merchant-ink">{link.title}</span>
              <span className="mt-0.5 block text-xs text-merchant-muted">{link.description}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
