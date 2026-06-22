import { Route, Routes } from 'react-router-dom'
import AdminEmailTemplateEditPage from '../../../components/admin/settings/AdminEmailTemplateEditPage'
import AdminEmailTemplatesPage from '../../../components/admin/settings/AdminEmailTemplatesPage'

export default function SettingsEmailTemplates() {
  return (
    <Routes>
      <Route index element={<AdminEmailTemplatesPage />} />
      <Route path=":templateKey" element={<AdminEmailTemplateEditPage />} />
    </Routes>
  )
}
