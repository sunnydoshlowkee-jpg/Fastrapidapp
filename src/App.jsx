import { Routes, Route } from 'react-router-dom'
import OnboardingRoutes from './routes/OnboardingRoutes'
import AppRoutes from './routes/AppRoutes'
import MerchantRoutes from './routes/MerchantRoutes'
import DispatchRoutes from './routes/DispatchRoutes'
import AdminRoutes from './routes/AdminRoutes'
import BiometricAppLock from './components/auth/BiometricAppLock'
import NativePersonaBootstrap from './components/auth/NativePersonaBootstrap'
import PushNotificationsBootstrap from './components/auth/PushNotificationsBootstrap'
import CookieConsentBanner from './components/compliance/CookieConsentBanner'

export default function App() {
  return (
    <BiometricAppLock>
      <NativePersonaBootstrap />
      <PushNotificationsBootstrap />
      <CookieConsentBanner />
      <Routes>
        <Route path="/app/*" element={<AppRoutes />} />
        <Route path="/merchant/*" element={<MerchantRoutes />} />
        <Route path="/dispatch/*" element={<DispatchRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<OnboardingRoutes />} />
      </Routes>
    </BiometricAppLock>
  )
}
