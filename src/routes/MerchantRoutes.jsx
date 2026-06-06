import { Routes, Route } from 'react-router-dom'
import MerchantDashboardGuard from '../components/merchant/auth/MerchantDashboardGuard'
import MerchantOnboardingRouteGuard from '../components/merchant/auth/MerchantOnboardingRouteGuard'
import MerchantLayout from '../layouts/MerchantLayout'
import MerchantLogin from '../apps/merchant/pages/auth/Login'
import MerchantRegister from '../apps/merchant/pages/auth/Register'
import VerifyEmail from '../apps/merchant/pages/auth/VerifyEmail'
import VerifyDocuments from '../apps/merchant/pages/auth/VerifyDocuments'
import PendingApproval from '../apps/merchant/pages/auth/PendingApproval'
import LocationHours from '../apps/merchant/pages/auth/LocationHours'
import BankDetails from '../apps/merchant/pages/auth/BankDetails'
import ForgotPassword from '../apps/merchant/pages/auth/ForgotPassword'
import ResetPassword from '../apps/merchant/pages/auth/ResetPassword'
import Dashboard from '../apps/merchant/pages/Dashboard'
import Menu from '../apps/merchant/pages/Menu'
import MenuUpload from '../apps/merchant/pages/MenuUpload'
import MenuItemCreate from '../apps/merchant/pages/MenuItemCreate'
import MenuImportSuccess from '../apps/merchant/pages/MenuImportSuccess'
import MerchantOrders from '../apps/merchant/pages/Orders'
import OrderDetail from '../apps/merchant/pages/OrderDetail'
import Analytics from '../apps/merchant/pages/Analytics'
import Settings from '../apps/merchant/pages/Settings'
import SettingsAccount from '../apps/merchant/pages/SettingsAccount'
import SettingsBusiness from '../apps/merchant/pages/SettingsBusiness'
import SettingsOperatingHours from '../apps/merchant/pages/SettingsOperatingHours'
import HelpSupport from '../apps/merchant/pages/HelpSupport'

export default function MerchantRoutes() {
  return (
    <Routes>
      <Route element={<MerchantOnboardingRouteGuard />}>
        <Route path="login" element={<MerchantLogin />} />
        <Route path="signup" element={<MerchantRegister />} />
        <Route path="signup/verify" element={<VerifyEmail />} />
        <Route path="signup/documents" element={<VerifyDocuments />} />
        <Route path="signup/pending" element={<PendingApproval />} />
        <Route path="signup/location-hours" element={<LocationHours />} />
        <Route path="signup/bank-details" element={<BankDetails />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="forgot-password/verify" element={<ResetPassword />} />

        <Route element={<MerchantDashboardGuard />}>
          <Route element={<MerchantLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/upload" element={<MenuUpload />} />
            <Route path="menu/new" element={<MenuItemCreate />} />
            <Route path="menu/import/success" element={<MenuImportSuccess />} />
            <Route path="orders" element={<MerchantOrders />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/account" element={<SettingsAccount />} />
            <Route path="settings/business" element={<SettingsBusiness />} />
            <Route path="settings/hours" element={<SettingsOperatingHours />} />
            <Route path="support" element={<HelpSupport />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
