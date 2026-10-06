import { Routes, Route, Navigate } from 'react-router-dom'
import AdminAuthGuard from '../components/admin/auth/AdminAuthGuard'
import AdminLayout from '../layouts/AdminLayout'
import AdminLogin from '../apps/admin/pages/auth/Login'
import AdminVerify2fa from '../apps/admin/pages/auth/Verify2fa'
import AdminForgotPassword from '../apps/admin/pages/auth/ForgotPassword'
import AdminResetPassword from '../apps/admin/pages/auth/ResetPassword'
import AdminResetSuccess from '../apps/admin/pages/auth/ResetSuccess'
import AdminSessionExpired from '../apps/admin/pages/auth/SessionExpired'
import AdminChangePassword from '../apps/admin/pages/auth/ChangePassword'
import Overview from '../apps/admin/pages/Overview'
import PipelineOverview from '../apps/admin/pages/PipelineOverview'
import PipelineBoard from '../apps/admin/pages/PipelineBoard'
import PipelineMyItems from '../apps/admin/pages/PipelineMyItems'
import PipelineDocuments from '../apps/admin/pages/PipelineDocuments'
import PipelineActivity from '../apps/admin/pages/PipelineActivity'
import PipelineCreate from '../apps/admin/pages/PipelineCreate'
import PipelineDetail from '../apps/admin/pages/PipelineDetail'
import PipelineEdit from '../apps/admin/pages/PipelineEdit'
import Users from '../apps/admin/pages/Users'
import UserDetail from '../apps/admin/pages/UserDetail'
import Merchants from '../apps/admin/pages/Merchants'
import MerchantDetail from '../apps/admin/pages/MerchantDetail'
import MerchantApprovals from '../apps/admin/pages/MerchantApprovals'
import MerchantDocumentReview from '../apps/admin/pages/MerchantDocumentReview'
import Riders from '../apps/admin/pages/Riders'
import RiderDetail from '../apps/admin/pages/RiderDetail'
import RiderTracking from '../apps/admin/pages/RiderTracking'
import RiderMap from '../apps/admin/pages/RiderMap'
import AdminOrders from '../apps/admin/pages/Orders'
import OrderDetail from '../apps/admin/pages/OrderDetail'
import AdminAnalytics from '../apps/admin/pages/Analytics'
import AdminSettings from '../apps/admin/pages/Settings'
import Support from '../apps/admin/pages/Support'
import SupportTicketDetail from '../apps/admin/pages/SupportTicketDetail'
import Transactions from '../apps/admin/pages/Transactions'
import TransactionDetail from '../apps/admin/pages/TransactionDetail'
import Payouts from '../apps/admin/pages/Payouts'
import Notifications from '../apps/admin/pages/Notifications'
import Disputes from '../apps/admin/pages/Disputes'
import DisputeDetail from '../apps/admin/pages/DisputeDetail'
import AuditLog from '../apps/admin/pages/AuditLog'
import AdminStaff from '../apps/admin/pages/AdminStaff'
import AdminStaffDetail from '../apps/admin/pages/AdminStaffDetail'
import Roles from '../apps/admin/pages/Roles'
import Permissions from '../apps/admin/pages/Permissions'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="verify-2fa" element={<AdminVerify2fa />} />
      <Route path="forgot-password" element={<AdminForgotPassword />} />
      <Route path="forgot-password/reset" element={<AdminResetPassword />} />
      <Route path="forgot-password/success" element={<AdminResetSuccess />} />
      <Route path="session-expired" element={<AdminSessionExpired />} />
      <Route path="change-password" element={<AdminChangePassword />} />
      <Route element={<AdminAuthGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Overview />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserDetail />} />
        <Route path="merchant-approvals" element={<MerchantApprovals />} />
        <Route path="merchants" element={<Merchants />} />
        <Route
          path="merchants/:merchantId/documents/review"
          element={<MerchantDocumentReview />}
        />
        <Route path="merchants/:merchantId" element={<MerchantDetail />} />
        <Route path="riders" element={<Riders />} />
        <Route path="rider-map" element={<RiderMap />} />
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
        <Route path="disputes/:disputeId" element={<DisputeDetail />} />
        <Route path="audit-log" element={<AuditLog />} />
        <Route path="admins" element={<AdminStaff />} />
        <Route path="admins/:adminId" element={<AdminStaffDetail />} />
        <Route path="roles" element={<Roles />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="pipeline" element={<PipelineOverview />} />
        <Route path="pipeline/board" element={<PipelineBoard />} />
        <Route path="pipeline/my-items" element={<PipelineMyItems />} />
        <Route path="pipeline/documents" element={<PipelineDocuments />} />
        <Route path="pipeline/activity" element={<PipelineActivity />} />
        <Route path="pipeline/create" element={<PipelineCreate />} />
        <Route path="pipeline/:itemId" element={<PipelineDetail />} />
        <Route path="pipeline/:itemId/edit" element={<PipelineEdit />} />
        <Route path="support" element={<Support />} />
          <Route path="support/:ticketId" element={<SupportTicketDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}
