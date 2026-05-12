import { Routes, Route } from 'react-router-dom'
import MerchantLayout from '../layouts/MerchantLayout'
import Dashboard from '../apps/merchant/pages/Dashboard'
import Menu from '../apps/merchant/pages/Menu'
import MerchantOrders from '../apps/merchant/pages/Orders'
import Analytics from '../apps/merchant/pages/Analytics'
import Settings from '../apps/merchant/pages/Settings'

export default function MerchantRoutes() {
  return (
    <Routes>
      <Route element={<MerchantLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="orders" element={<MerchantOrders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
