import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from '../apps/user/pages/onboarding/Splash'
import Welcome from '../apps/user/pages/onboarding/Welcome'
import AccountType from '../apps/user/pages/onboarding/AccountType'
import Location from '../apps/user/pages/onboarding/Location'
import PhoneEntry from '../apps/user/pages/onboarding/PhoneEntry'
import OtpVerify from '../apps/user/pages/onboarding/OtpVerify'
import ProfileSetup from '../apps/user/pages/onboarding/ProfileSetup'
import ServicePreference from '../apps/user/pages/onboarding/ServicePreference'
import Login from '../apps/user/pages/auth/Login'
import VerifyIdentity from '../apps/user/pages/auth/VerifyIdentity'

export default function OnboardingRoutes() {
  return (
    <Routes>
      <Route index element={<Splash />} />
      <Route path="onboarding/welcome" element={<Welcome />} />
      <Route path="onboarding/account-type" element={<AccountType />} />
      <Route path="onboarding/location" element={<Location />} />
      <Route path="onboarding/phone" element={<PhoneEntry />} />
      <Route path="onboarding/otp" element={<OtpVerify />} />
      <Route path="onboarding/profile" element={<ProfileSetup />} />
      <Route path="onboarding/preferences" element={<ServicePreference />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/verify" element={<VerifyIdentity />} />
    </Routes>
  )
}
