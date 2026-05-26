import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useOutletContext } from 'react-router-dom'
import {
  Bell,
  Check,
  Eye,
  Home,
  MapPin,
  Menu,
  Store,
  Truck,
  Users,
  X,
} from 'lucide-react'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'

const navIcons = {
  home: Home,
  users: Users,
  store: Store,
  truck: Truck,
}

const logoToneStyles = {
  restaurant: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
  grocery: 'linear-gradient(135deg, #BBF7D0 0%, #16A34A 100%)',
  pharmacy: 'linear-gradient(135deg, #BFDBFE 0%, #2563EB 100%)',
}

const logoGlyphs = {
  restaurant: '🍲',
  grocery: '🥬',
  pharmacy: '⚕',
}

function MerchantLogo({ merchant }) {
  if (merchant.logoKind === 'initial') {
    return (
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E0C0B1]/30 text-xl font-bold"
        style={{
          backgroundColor: merchant.logoBg,
          color: merchant.logoTextColor,
        }}
      >
        {merchant.logoText}
      </div>
    )
  }

  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E0C0B1]/30 text-xl"
      style={{ backgroundImage: logoToneStyles[merchant.logoTone] }}
      aria-hidden
    >
      <span className="opacity-90">
        {logoGlyphs[merchant.logoTone] ?? '🏪'}
      </span>
    </div>
  )
}

function MerchantCard({ merchant, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(merchant)}
      className={`flex w-full items-center gap-4 rounded-lg bg-white p-4 text-left transition-shadow ${
        isSelected
          ? 'shadow-[0_0_0_2px_rgba(249,115,22,0.2)]'
          : 'hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <MerchantLogo merchant={merchant} />
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold leading-6 text-[#191C1D]">
          {merchant.name}
        </h3>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-[#584237]">
          <MapPin size={12} strokeWidth={1.75} aria-hidden />
          <span className="truncate">{merchant.location}</span>
        </div>
        <div className="mt-1">
          <span className="inline-flex items-center rounded-md border border-[#FEF3C7] bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#D97706]">
            {merchant.statusLabel}
          </span>
        </div>
      </div>
    </button>
  )
}

function DocumentPreview({ kind }) {
  const isGovId = kind === 'gov-id'

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-[#E0C0B1]/20"
      style={{ backgroundColor: '#E7E8E9' }}
    >
      <div
        className="flex h-48 items-center justify-center"
        style={{
          backgroundImage: isGovId
            ? 'linear-gradient(135deg, #3F4956 0%, #1F2935 100%)'
            : 'linear-gradient(135deg, #475569 0%, #2F3F4F 100%)',
          opacity: 0.85,
        }}
        aria-hidden
      >
        {isGovId ? (
          <div className="flex flex-col items-center gap-2 text-white/80">
            <div className="h-10 w-16 rounded-md border-2 border-white/60 bg-white/10" />
            <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
              ID Card
            </div>
            <div className="h-2 w-20 rounded bg-white/40" />
            <div className="h-2 w-16 rounded bg-white/30" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/85">
            <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
              AAC
            </div>
            <div className="text-2xl font-bold tracking-[0.15em] text-white">
              DOCUM/NG WO
            </div>
            <div className="text-xs font-semibold tracking-[0.15em] text-white/80">
              SAFE PLACEM Dd
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="absolute right-3 top-3 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#191C1D] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-50"
      >
        <Eye size={13} strokeWidth={2} aria-hidden />
        View Doc
      </button>
    </div>
  )
}

function ApplicationSheet({ approvals, merchant, onClose }) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const original = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.document.body.style.overflow = original
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  if (typeof window === 'undefined' || !merchant) return null

  const application = approvals.applications[merchant.id]
  if (!application) return null

  const sheetCopy = approvals.sheet

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${merchant.name} application details`}
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{
        backgroundColor: 'rgba(25, 28, 29, 0.4)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={onClose}
    >
      <div
        role="document"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] flex-col bg-white"
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          boxShadow: '0px -20px 40px rgba(0,0,0,0.1)',
        }}
      >
        <div className="flex justify-center pb-6 pt-2">
          <span
            className="h-1.5 w-12 rounded-full"
            style={{ backgroundColor: '#E1E3E4' }}
            aria-hidden
          />
        </div>

        <div className="flex items-start justify-between gap-3 px-6 pb-6">
          <div>
            <h2 className="text-xl font-bold leading-7 text-[#191C1D]">
              {merchant.name}
            </h2>
            <p className="text-sm text-[#584237]">{sheetCopy.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={sheetCopy.closeLabel}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-xl bg-[#E7E8E9] text-[#584237] transition-colors hover:bg-gray-300"
          >
            <X size={14} strokeWidth={2.25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="rounded-lg bg-[#F3F4F5] p-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <p className="text-xs text-[#584237]">{sheetCopy.ownerLabel}</p>
                <p className="text-sm font-semibold text-[#191C1D]">
                  {application.owner}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#584237]">{sheetCopy.phoneLabel}</p>
                <p className="text-sm font-semibold text-[#191C1D]">
                  {application.phone}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-[#584237]">
                  {sheetCopy.addressLabel}
                </p>
                <p className="text-sm font-semibold text-[#191C1D]">
                  {application.address}
                </p>
              </div>
            </div>
          </div>

          <section className="mt-6 space-y-3">
            <h3 className="text-sm font-bold text-[#191C1D]">
              {sheetCopy.documentsTitle}
            </h3>
            <div className="space-y-4">
              {application.documents.map((doc) => (
                <div key={doc.id} className="space-y-2">
                  <p className="text-xs text-[#584237]">{doc.label}</p>
                  <DocumentPreview kind={doc.previewKind} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t border-[#EDEEEF] px-6 py-4">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-14 items-center justify-center gap-2 rounded-lg bg-[#22C55E] text-base font-bold text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#1FB256]"
            >
              <Check size={18} strokeWidth={2.5} aria-hidden />
              {sheetCopy.approveLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-14 items-center justify-center gap-2 rounded-lg bg-[#E7E8E9] text-base font-bold text-[#EF4444] transition-colors hover:bg-gray-300"
            >
              <X size={18} strokeWidth={2.5} aria-hidden className="text-[#EF4444]" />
              {sheetCopy.rejectLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    window.document.body,
  )
}

function BottomNav({ items }) {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-30 mt-auto flex items-center justify-around bg-[#F8FAFC]/80 px-2 py-3 backdrop-blur-md"
      style={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        boxShadow: '0px -8px 30px rgba(0,0,0,0.04)',
      }}
    >
      {items.map((item) => {
        const Icon = navIcons[item.icon] ?? Home
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center gap-1 rounded-2xl px-5 py-2 ${
              item.active
                ? 'bg-[#FFEDD5]/50 text-[#EA580C]'
                : 'text-[#94A3B8] hover:text-[#475569]'
            }`}
          >
            <Icon size={20} strokeWidth={2} aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.025em]">
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export default function AdminMerchantApprovalsMobilePage({ data }) {
  const outletCtx = useOutletContext() ?? {}
  const [activeFilter, setActiveFilter] = useState(data.defaultFilterId)
  const [openMerchantId, setOpenMerchantId] = useState(
    data.defaultSheetMerchantId ?? null,
  )

  const filteredMerchants = useMemo(() => {
    if (activeFilter === 'all') return data.merchants
    return data.merchants.filter((m) => m.status === activeFilter)
  }, [data.merchants, activeFilter])

  const openMerchant = useMemo(
    () => data.merchants.find((m) => m.id === openMerchantId) ?? null,
    [data.merchants, openMerchantId],
  )

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-[#F8F9FA]">
      <header
        className="sticky top-0 z-20 flex items-center justify-between gap-3 px-6 py-3 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
      >
        <button
          type="button"
          onClick={outletCtx.openDrawer}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#191C1D] transition-colors hover:bg-white"
        >
          <Menu size={18} strokeWidth={2} />
        </button>
        <h1 className="text-xl font-black tracking-[-0.05em] text-[#EA580C]">
          {data.brand}
        </h1>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#191C1D] transition-colors hover:bg-white"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#F8FAFC]" />
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6">
        <div className="space-y-6">
          <header className="space-y-1 px-2">
            <h2 className="text-2xl font-extrabold tracking-[-0.025em] text-[#191C1D]">
              {data.pageTitle}
            </h2>
            <p className="text-sm leading-5 text-[#584237]">{data.subtitle}</p>
          </header>

          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex gap-3">
              {data.filters.map((filter) => {
                const isActive = filter.id === activeFilter
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`shrink-0 rounded-xl px-5 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-[#F97316] font-bold text-[#582200] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                        : 'bg-[#E7E8E9] font-medium text-[#584237] hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 px-2">
            {filteredMerchants.length === 0 ? (
              <div className="rounded-lg bg-white p-8 text-center text-sm text-[#584237]">
                No merchants in this category.
              </div>
            ) : (
              filteredMerchants.map((merchant) => (
                <MerchantCard
                  key={merchant.id}
                  merchant={merchant}
                  isSelected={merchant.id === openMerchantId}
                  onClick={(m) => setOpenMerchantId(m.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <BottomNav items={data.bottomNav} />

      {openMerchant ? (
        <ApplicationSheet
          approvals={data}
          merchant={openMerchant}
          onClose={() => setOpenMerchantId(null)}
        />
      ) : null}
    </div>
  )
}
