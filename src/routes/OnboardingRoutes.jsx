import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from '../apps/user/pages/onboarding/Splash'
import Slider from '../apps/user/pages/onboarding/Slider'
import Welcome from '../apps/user/pages/onboarding/Welcome'
import AccountType from '../apps/user/pages/onboarding/AccountType'
import Location from '../apps/user/pages/onboarding/Location'
import PhoneEntry from '../apps/user/pages/onboarding/PhoneEntry'
import EmailSignup from '../apps/user/pages/onboarding/EmailSignup'
import OtpVerify from '../apps/user/pages/onboarding/OtpVerify'
import ProfileSetup from '../apps/user/pages/onboarding/ProfileSetup'
import ServicePreference from '../apps/user/pages/onboarding/ServicePreference'
import Login from '../apps/user/pages/auth/Login'
import EmailLogin from '../apps/user/pages/auth/EmailLogin'
import EmailVerify from '../apps/user/pages/auth/EmailVerify'
import VerifyIdentity from '../apps/user/pages/auth/VerifyIdentity'
import BiometricUnlock from '../apps/user/pages/auth/BiometricUnlock'

export default function OnboardingRoutes() {
  return (
    <Routes>
      <Route index element={<Splash />} />
      <Route path="onboarding/slider" element={<Slider />} />
      <Route path="onboarding/welcome" element={<Welcome />} />
      <Route path="onboarding/account-type" element={<AccountType />} />
      <Route path="onboarding/location" element={<Location />} />
      <Route path="onboarding/phone" element={<PhoneEntry />} />
      <Route path="onboarding/email" element={<EmailSignup />} />
      <Route path="onboarding/otp" element={<OtpVerify />} />
      <Route path="onboarding/profile" element={<ProfileSetup />} />
      <Route path="onboarding/preferences" element={<ServicePreference />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/login/phone" element={<EmailLogin />} />
      <Route path="auth/verify-email" element={<EmailVerify />} />
      <Route path="auth/verify" element={<VerifyIdentity />} />
      <Route path="auth/biometric-unlock" element={<BiometricUnlock />} />
    </Routes>
  )
}
