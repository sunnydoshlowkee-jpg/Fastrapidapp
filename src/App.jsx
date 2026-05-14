import { Routes, Route } from 'react-router-dom'
import OnboardingRoutes from './routes/OnboardingRoutes'
import AppRoutes from './routes/AppRoutes'
import MerchantRoutes from './routes/MerchantRoutes'
import DispatchRoutes from './routes/DispatchRoutes'
import AdminRoutes from './routes/AdminRoutes'

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<OnboardingRoutes />} />
      <Route path="/app/*" element={<AppRoutes />} />
      <Route path="/merchant/*" element={<MerchantRoutes />} />
      <Route path="/dispatch/*" element={<DispatchRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  )
}
