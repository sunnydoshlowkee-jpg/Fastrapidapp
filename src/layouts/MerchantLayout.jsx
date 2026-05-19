import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MerchantSidebar from '../components/merchant/layout/MerchantSidebar'
import MerchantBottomNav from '../components/merchant/layout/MerchantBottomNav'

export default function MerchantLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-merchant-canvas">
      <MerchantSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <main className="relative flex min-w-0 flex-1 flex-col pb-[5.75rem] lg:pb-0">
        <Outlet context={{ openMobileNav: () => setMobileNavOpen(true) }} />
        <MerchantBottomNav />
      </main>
    </div>
  )
}
