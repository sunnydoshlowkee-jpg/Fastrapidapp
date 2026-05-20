import { BookOpen, MessageCircle } from 'lucide-react'
import { merchantHelpSupportCardClass } from '../merchantHelpSupportStyles'

const iconMap = {
  book: BookOpen,
  message: MessageCircle,
}

const toneClass = {
  book: 'bg-merchant-nav-active text-merchant-primary',
  message: 'bg-amber-50 text-amber-600',
}

export default function MerchantHelpSupportMobileQuickLinks({ quickLinks }) {
  return (
    <div className="space-y-3">
      {quickLinks.map((link) => {
        const Icon = iconMap[link.icon] ?? BookOpen
        const isChat = link.id === 'chat'

        return (
          <button
            key={link.id}
            type="button"
            className={`${merchantHelpSupportCardClass} w-full p-4 text-left`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  toneClass[link.icon] ?? toneClass.book
                }`}
              >
                <Icon size={18} strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-merchant-ink">{link.title}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-merchant-muted">
                  {link.description}
                </span>
              </span>
            </div>

            {isChat && link.agents && (
              <div className="mt-3 flex items-center gap-2 pl-[3.25rem]">
                <div className="flex -space-x-2">
                  {link.agents.map((agent) => (
                    <span
                      key={agent.id}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-merchant-surface text-[9px] font-bold text-white"
                      style={{ backgroundColor: agent.color }}
                      aria-hidden
                    >
                      {agent.initials}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-merchant-muted">{link.agentsOnlineLabel}</p>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
