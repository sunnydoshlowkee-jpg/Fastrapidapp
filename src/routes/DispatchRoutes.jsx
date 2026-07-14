import { Routes, Route } from 'react-router-dom'
import DispatchLayout from '../layouts/DispatchLayout'

// Auth
import RiderLogin from '../apps/dispatch/pages/auth/Login'

// Onboarding screens
import RiderSplash from '../apps/dispatch/pages/onboarding/Splash'
import RiderWelcome from '../apps/dispatch/pages/onboarding/Welcome'
import RiderPhone from '../apps/dispatch/pages/onboarding/PhoneEntry'
import RiderVerify from '../apps/dispatch/pages/onboarding/Verify'
import RiderPersonalInfo from '../apps/dispatch/pages/onboarding/PersonalInfo'
import RiderIdentity from '../apps/dispatch/pages/onboarding/Identity'
import RiderVehicle from '../apps/dispatch/pages/onboarding/VehicleDetails'
import RiderPayment from '../apps/dispatch/pages/onboarding/PaymentDetails'
import RiderSuccess from '../apps/dispatch/pages/onboarding/Success'

// Main app screens
import DispatchHome from '../apps/dispatch/pages/DispatchHome'
import ActiveDelivery from '../apps/dispatch/pages/ActiveDelivery'
import DeliverySuccess from '../apps/dispatch/pages/DeliverySuccess'
import Earnings from '../apps/dispatch/pages/Earnings'
import Withdraw from '../apps/dispatch/pages/Withdraw'
import PayoutHistory from '../apps/dispatch/pages/PayoutHistory'
import Deliveries from '../apps/dispatch/pages/Deliveries'
import CustomerChat from '../apps/dispatch/pages/CustomerChat'
import RiderProfile from '../apps/dispatch/pages/RiderProfile'
import RiderPrivacySecurity from '../apps/dispatch/pages/PrivacySecurity'
import EditProfile from '../apps/dispatch/pages/EditProfile'
import HelpCenter from '../apps/dispatch/pages/HelpCenter'
import MyDocuments from '../apps/dispatch/pages/MyDocuments'
import Notifications from '../apps/dispatch/pages/Notifications'
import PendingApproval from '../apps/dispatch/pages/PendingApproval'
import BiometricUnlock from '../apps/user/pages/auth/BiometricUnlock'
import { APP_ROLES } from '../utils/appRole'

export default function DispatchRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="login" element={<RiderLogin />} />
      <Route path="auth/biometric-unlock" element={<BiometricUnlock role={APP_ROLES.rider} />} />

      {/* Onboarding — no layout wrapper */}
      <Route path="splash" element={<RiderSplash />} />
      <Route path="welcome" element={<RiderWelcome />} />
      <Route path="onboarding/phone" element={<RiderPhone />} />
      <Route path="onboarding/verify" element={<RiderVerify />} />
      <Route path="onboarding/personal" element={<RiderPersonalInfo />} />
      <Route path="onboarding/identity" element={<RiderIdentity />} />
      <Route path="onboarding/vehicle" element={<RiderVehicle />} />
      <Route path="onboarding/payment" element={<RiderPayment />} />
      <Route path="onboarding/success" element={<RiderSuccess />} />

      {/* Active Delivery Flow (Full screen, no bottom nav) */}
      <Route path="delivery/:id" element={<ActiveDelivery />} />
      <Route path="active-delivery/:id" element={<ActiveDelivery />} />
      <Route path="delivery/:id/chat" element={<CustomerChat />} />
      <Route path="delivery/:id/success" element={<DeliverySuccess />} />

      {/* Main rider app — with layout */}
      <Route element={<DispatchLayout />}>
        <Route path="pending" element={<PendingApproval />} />
        <Route index element={<DispatchHome />} />
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="earnings/withdraw" element={<Withdraw />} />
        <Route path="earnings/history" element={<PayoutHistory />} />
        <Route path="profile" element={<RiderProfile />} />
        <Route path="profile/privacy-security" element={<RiderPrivacySecurity />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="profile/help" element={<HelpCenter />} />
        <Route path="profile/documents" element={<MyDocuments />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  )
}
