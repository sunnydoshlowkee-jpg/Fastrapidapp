import { useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import AdminApproveMerchantModal from './AdminApproveMerchantModal'
import AdminRejectMerchantModal from './AdminRejectMerchantModal'
import AdminMerchantDocumentsPanel from './AdminMerchantDocumentsPanel'
import AdminMerchantInfoPanel from './AdminMerchantInfoPanel'
import AdminMerchantKpiCard from './AdminMerchantKpiCard'
import AdminMerchantLogoTile from './AdminMerchantLogoTile'
import {
  approveAdminMerchant,
  mapAdminMerchantDetailFromApi,
  rejectAdminMerchant,
} from '../../../services/adminMerchantsService'

function EmptyTab({ label }) {
  return (
    <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
      <p className="text-sm font-semibold text-gray-600">
        {label} view coming soon.
      </p>
    </div>
  )
}

export default function AdminMerchantDetailPage({
  merchant: merchantProp,
  onMerchantUpdated,
}) {
  const [merchant, setMerchant] = useState(merchantProp)
  const [activeTab, setActiveTab] = useState('info')
  const [approveTarget, setApproveTarget] = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)

  useEffect(() => {
    setMerchant(merchantProp)
  }, [merchantProp])

  const handleApproveMerchant = async ({ merchantId, notify }) => {
    const payload = await approveAdminMerchant(merchantId, { notify })
    const updated = mapAdminMerchantDetailFromApi(payload)
    setMerchant(updated)
    onMerchantUpdated?.(updated)
    setApproveTarget(null)
  }

  const handleRejectMerchant = async (rejectPayload) => {
    const payload = await rejectAdminMerchant(rejectPayload.merchantId, rejectPayload)
    const updated = mapAdminMerchantDetailFromApi(payload)
    setMerchant(updated)
    onMerchantUpdated?.(updated)
    setRejectTarget(null)
  }

  const handleDocumentUpdated = (updatedDoc) => {
    setMerchant((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        items: prev.documents.items.map((item) =>
          item.id === updatedDoc.id ? updatedDoc : item,
        ),
      },
    }))
  }

  return (
    <div className="p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <AdminMerchantLogoTile merchant={merchant} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-gray-900">
                {merchant.name}
              </h1>
              {merchant.verified ? (
                <BadgeCheck
                  size={18}
                  className="fill-violet-500 text-white"
                  strokeWidth={2}
                  aria-label="Verified"
                />
              ) : null}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${merchant.typeTone}`}
              >
                {merchant.typeLabel}
              </span>
              <span
                className={`inline-flex rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  merchant.status === 'active'
                    ? 'bg-emerald-400 text-white'
                    : merchant.status === 'review'
                      ? 'bg-amber-400 text-white'
                      : 'bg-gray-300 text-gray-800'
                }`}
              >
                {merchant.statusLabel}
              </span>
              <span className="text-xs font-semibold text-gray-400">
                ID:{merchant.id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {merchant.reviewable ? (
            <>
              <button
                type="button"
                onClick={() => setRejectTarget(merchant.rejectContext)}
                className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-red-600 transition-colors hover:bg-red-50"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => setApproveTarget(merchant.approveContext)}
                className="rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-emerald-600"
              >
                Review
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
          >
            {merchant.suspendLabel}
          </button>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {merchant.kpis.map((kpi) => (
          <AdminMerchantKpiCard key={kpi.id} kpi={kpi} divider={kpi.divider} />
        ))}
      </div>

      <nav
        className="mt-7 flex flex-wrap gap-8 border-b border-gray-200"
        aria-label="Merchant detail sections"
      >
        {merchant.tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? 'border-rapid-orange text-rapid-orange'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-6">
        {activeTab === 'info' ? (
          <AdminMerchantInfoPanel merchant={merchant} />
        ) : activeTab === 'documents' ? (
          <AdminMerchantDocumentsPanel
            documents={merchant.documents}
            merchantId={merchant.numericId}
            onDocumentUpdated={handleDocumentUpdated}
          />
        ) : (
          <EmptyTab label={merchant.tabs.find((t) => t.id === activeTab)?.label ?? ''} />
        )}
      </div>

      <AdminApproveMerchantModal
        isOpen={approveTarget !== null}
        onClose={() => setApproveTarget(null)}
        merchant={approveTarget}
        onConfirm={handleApproveMerchant}
      />
      <AdminRejectMerchantModal
        isOpen={rejectTarget !== null}
        onClose={() => setRejectTarget(null)}
        merchant={rejectTarget}
        onConfirm={handleRejectMerchant}
      />
    </div>
  )
}
