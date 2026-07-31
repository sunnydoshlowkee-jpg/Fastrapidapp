import { useCallback, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import MerchantSidebar from '../components/merchant/layout/MerchantSidebar'
import MerchantBottomNav from '../components/merchant/layout/MerchantBottomNav'
import useMerchantOrdersBadge from '../components/merchant/layout/useMerchantOrdersBadge'
import MerchantLocationGate from '../components/merchant/auth/MerchantLocationGate'
import PullToRefresh from '../components/ui/PullToRefresh'
import { createPullRefreshHandler } from '../utils/pullRefresh'

export default function MerchantLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const mainRef = useRef(null)
  const handlePullRefresh = useCallback(createPullRefreshHandler(setRefreshKey), [])
  const { newOrdersCount } = useMerchantOrdersBadge()

  return (
    <MerchantLocationGate>
      <div className="flex min-h-screen bg-merchant-canvas">
        <MerchantSidebar
          mobileOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          newOrdersCount={newOrdersCount}
        />

        <main
          ref={mainRef}
          className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto pb-merchant-nav lg:pb-0"
        >
          <PullToRefresh scrollRef={mainRef} onRefresh={handlePullRefresh}>
            <Outlet
              key={refreshKey}
              context={{ openMobileNav: () => setMobileNavOpen(true) }}
            />
          </PullToRefresh>
          <MerchantBottomNav newOrdersCount={newOrdersCount} />
        </main>
      </div>
    </MerchantLocationGate>
  )
}
