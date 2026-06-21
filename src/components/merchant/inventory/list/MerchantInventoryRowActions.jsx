import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, Copy, EyeOff, MoreHorizontal, MoreVertical, Pencil, Trash2 } from 'lucide-react'

function MenuButton({ children, onClick, danger = false, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
        danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-merchant-ink hover:bg-merchant-canvas'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default function MerchantInventoryRowActions({
  product,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleAvailability,
  icon = 'vertical',
}) {
  const [open, setOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const containerRef = useRef(null)
  const Icon = icon === 'horizontal' ? MoreHorizontal : MoreVertical

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false)
        setShowMore(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setShowMore(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const closeMenu = () => {
    setOpen(false)
    setShowMore(false)
  }

  const handleToggle = () => {
    setOpen((prev) => {
      if (prev) setShowMore(false)
      return !prev
    })
  }

  return (
    <div className="relative inline-flex" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-icon-tile hover:text-merchant-ink"
        aria-label={`Actions for ${product.name}`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Icon size={icon === 'horizontal' ? 16 : 18} strokeWidth={1.75} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-1 min-w-[168px] overflow-hidden rounded-xl border border-merchant-divider bg-merchant-surface py-1 shadow-lg"
        >
          {!showMore ? (
            <>
              <MenuButton
                onClick={() => {
                  onEdit?.(product)
                  closeMenu()
                }}
              >
                <Pencil size={15} strokeWidth={1.75} />
                Edit
              </MenuButton>
              <MenuButton
                danger
                onClick={() => {
                  onDelete?.(product)
                  closeMenu()
                }}
              >
                <Trash2 size={15} strokeWidth={1.75} />
                Delete
              </MenuButton>
              <MenuButton onClick={() => setShowMore(true)}>
                <MoreHorizontal size={15} strokeWidth={1.75} />
                More
              </MenuButton>
            </>
          ) : (
            <>
              <MenuButton onClick={() => setShowMore(false)} className="text-merchant-muted">
                <ChevronLeft size={15} strokeWidth={1.75} />
                Back
              </MenuButton>
              <MenuButton
                onClick={() => {
                  onDuplicate?.(product)
                  closeMenu()
                }}
              >
                <Copy size={15} strokeWidth={1.75} />
                Duplicate
              </MenuButton>
              <MenuButton
                onClick={() => {
                  onToggleAvailability?.(product)
                  closeMenu()
                }}
              >
                <EyeOff size={15} strokeWidth={1.75} />
                {product.available ? 'Mark unavailable' : 'Mark available'}
              </MenuButton>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}
