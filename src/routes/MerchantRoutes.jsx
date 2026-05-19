import { Routes, Route } from 'react-router-dom'
import MerchantLayout from '../layouts/MerchantLayout'
import MerchantLogin from '../apps/merchant/pages/auth/Login'
import ForgotPassword from '../apps/merchant/pages/auth/ForgotPassword'
import ResetPassword from '../apps/merchant/pages/auth/ResetPassword'
import Dashboard from '../apps/merchant/pages/Dashboard'
import Menu from '../apps/merchant/pages/Menu'
import MerchantOrders from '../apps/merchant/pages/Orders'
import OrderDetail from '../apps/merchant/pages/OrderDetail'
import Analytics from '../apps/merchant/pages/Analytics'
import Settings from '../apps/merchant/pages/Settings'

export default function MerchantRoutes() {
  return (
    <Routes>
      <Route path="login" element={<MerchantLogin />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="forgot-password/verify" element={<ResetPassword />} />
      <Route element={<MerchantLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="orders" element={<MerchantOrders />} />
        <Route path="orders/:orderId" element={<OrderDetail />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
