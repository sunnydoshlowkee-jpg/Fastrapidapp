import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Overview from '../apps/admin/pages/Overview'
import Users from '../apps/admin/pages/Users'
import Merchants from '../apps/admin/pages/Merchants'
import Riders from '../apps/admin/pages/Riders'
import AdminOrders from '../apps/admin/pages/Orders'
import AdminAnalytics from '../apps/admin/pages/Analytics'
import AdminSettings from '../apps/admin/pages/Settings'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="users" element={<Users />} />
        <Route path="merchants" element={<Merchants />} />
        <Route path="riders" element={<Riders />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
