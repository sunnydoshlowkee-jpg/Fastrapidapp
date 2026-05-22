import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import AdminLogin from '../apps/admin/pages/auth/Login'
import AdminVerify2fa from '../apps/admin/pages/auth/Verify2fa'
import AdminForgotPassword from '../apps/admin/pages/auth/ForgotPassword'
import AdminResetPassword from '../apps/admin/pages/auth/ResetPassword'
import AdminResetSuccess from '../apps/admin/pages/auth/ResetSuccess'
import Overview from '../apps/admin/pages/Overview'
import Users from '../apps/admin/pages/Users'
import Merchants from '../apps/admin/pages/Merchants'
import Riders from '../apps/admin/pages/Riders'
import RiderDetail from '../apps/admin/pages/RiderDetail'
import RiderTracking from '../apps/admin/pages/RiderTracking'
import AdminOrders from '../apps/admin/pages/Orders'
import OrderDetail from '../apps/admin/pages/OrderDetail'
import AdminAnalytics from '../apps/admin/pages/Analytics'
import AdminSettings from '../apps/admin/pages/Settings'
import Support from '../apps/admin/pages/Support'
import Transactions from '../apps/admin/pages/Transactions'
import TransactionDetail from '../apps/admin/pages/TransactionDetail'
import Payouts from '../apps/admin/pages/Payouts'
import Notifications from '../apps/admin/pages/Notifications'
import Disputes from '../apps/admin/pages/Disputes'
import AuditLog from '../apps/admin/pages/AuditLog'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="verify-2fa" element={<AdminVerify2fa />} />
      <Route path="forgot-password" element={<AdminForgotPassword />} />
      <Route path="forgot-password/reset" element={<AdminResetPassword />} />
      <Route path="forgot-password/success" element={<AdminResetSuccess />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="users" element={<Users />} />
        <Route path="merchants" element={<Merchants />} />
        <Route path="riders" element={<Riders />} />
        <Route path="riders/:riderId/tracking" element={<RiderTracking />} />
        <Route path="riders/:riderId" element={<RiderDetail />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:orderId" element={<OrderDetail />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings/*" element={<AdminSettings />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="transactions/:transactionId" element={<TransactionDetail />} />
        <Route path="payouts" element={<Payouts />} />
        <Route path="disputes" element={<Disputes />} />
        <Route path="audit-log" element={<AuditLog />} />
        <Route path="support" element={<Support />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}
