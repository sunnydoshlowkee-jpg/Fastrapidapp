import { Navigate, Route, Routes } from 'react-router-dom'
import AdminSettingsPage from '../../../components/admin/settings/AdminSettingsPage'
import SettingsFinance from './SettingsFinance'
import SettingsGeneral from './SettingsGeneral'
import SettingsEmail from './SettingsEmail'
import SettingsPayment from './SettingsPayment'
import SettingsFeatureFlags from './SettingsFeatureFlags'
import SettingsDeliveryZones from './SettingsDeliveryZones'
import SettingsAdminTeam from './SettingsAdminTeam'
import SettingsAlertSettings from './SettingsAlertSettings'
import AdminSettingsSectionPlaceholder from '../../../components/admin/settings/AdminSettingsSectionPlaceholder'

function SettingsRoles() {
  return (
    <AdminSettingsSectionPlaceholder
      title="Roles & Permissions"
      description="Configure role-based access for the admin portal."
    />
  )
}

export default function Settings() {
  return (
    <Routes>
      <Route index element={<AdminSettingsPage />} />
      <Route path="general" element={<SettingsGeneral />} />
      <Route path="email" element={<SettingsEmail />} />
      <Route path="payment" element={<SettingsPayment />} />
      <Route path="feature-flags" element={<SettingsFeatureFlags />} />
      <Route path="delivery-zones" element={<SettingsDeliveryZones />} />
      <Route path="operations-control" element={<SettingsFinance />} />
      <Route path="admin-team" element={<SettingsAdminTeam />} />
      <Route path="roles" element={<SettingsRoles />} />
      <Route path="alert-settings" element={<SettingsAlertSettings />} />
      <Route path="*" element={<Navigate to="/admin/settings" replace />} />
    </Routes>
  )
}
