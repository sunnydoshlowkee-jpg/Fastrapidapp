import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MerchantSidebar from '../components/merchant/layout/MerchantSidebar'
import MerchantBottomNav from '../components/merchant/layout/MerchantBottomNav'
import useMerchantOrdersBadge from '../components/merchant/layout/useMerchantOrdersBadge'

export default function MerchantLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { newOrdersCount } = useMerchantOrdersBadge()

  return (
    <div className="flex min-h-screen bg-merchant-canvas">
      <MerchantSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        newOrdersCount={newOrdersCount}
      />

      <main className="relative flex min-w-0 flex-1 flex-col pb-[5.75rem] lg:pb-0">
        <Outlet context={{ openMobileNav: () => setMobileNavOpen(true) }} />
        <MerchantBottomNav newOrdersCount={newOrdersCount} />
      </main>
    </div>
  )
}
