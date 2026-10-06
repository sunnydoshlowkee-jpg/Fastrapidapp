import { Routes, Route, Navigate } from 'react-router-dom'
import PipelineAdminAuthGuard from '../components/pipeline-admin/auth/PipelineAdminAuthGuard'
import PipelineAdminLayout from '../layouts/PipelineAdminLayout'
import PipelineAdminLogin from '../apps/pipeline-admin/pages/auth/Login'
import PipelineAdminVerify2fa from '../apps/pipeline-admin/pages/auth/Verify2fa'
import PipelineAdminForgotPassword from '../apps/pipeline-admin/pages/auth/ForgotPassword'
import {
  PIPELINE_ADMIN_LOGIN_PATH,
  PIPELINE_ADMIN_VERIFY_2FA_PATH,
} from '../services/data/pipelineAdminAuth.mock'
import PipelineOverview from '../apps/admin/pages/PipelineOverview'
import PipelineBoard from '../apps/admin/pages/PipelineBoard'
import PipelineMyItems from '../apps/admin/pages/PipelineMyItems'
import PipelineDocuments from '../apps/admin/pages/PipelineDocuments'
import PipelineActivity from '../apps/admin/pages/PipelineActivity'
import PipelineCreate from '../apps/admin/pages/PipelineCreate'
import PipelineDetail from '../apps/admin/pages/PipelineDetail'
import PipelineEdit from '../apps/admin/pages/PipelineEdit'

export default function PipelineAdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<PipelineAdminLogin />} />
      <Route path="verify-2fa" element={<PipelineAdminVerify2fa />} />
      <Route path="forgot-password" element={<PipelineAdminForgotPassword />} />
      <Route element={<PipelineAdminAuthGuard />}>
        <Route element={<PipelineAdminLayout />}>
          <Route index element={<PipelineOverview />} />
          <Route path="board" element={<PipelineBoard />} />
          <Route path="my-items" element={<PipelineMyItems />} />
          <Route path="documents" element={<PipelineDocuments />} />
          <Route path="activity" element={<PipelineActivity />} />
          <Route path="create" element={<PipelineCreate />} />
          <Route path=":itemId" element={<PipelineDetail />} />
          <Route path=":itemId/edit" element={<PipelineEdit />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={PIPELINE_ADMIN_LOGIN_PATH} replace />} />
    </Routes>
  )
}