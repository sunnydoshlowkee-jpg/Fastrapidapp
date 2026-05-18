import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MerchantSidebar from '../components/merchant/layout/MerchantSidebar'

export default function MerchantLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-merchant-canvas">
      <MerchantSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <Outlet context={{ openMobileNav: () => setMobileNavOpen(true) }} />
      </main>
    </div>
  )
}
