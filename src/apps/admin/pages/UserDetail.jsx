import { useParams } from 'react-router-dom'
import AdminUserDetailPage from '../../../components/admin/users/AdminUserDetailPage'
import {
  ADMIN_USER_DETAIL_DEFAULT_ID,
  getAdminUserDetail,
} from '../../../services/data/adminUserDetail.mock'

export default function UserDetail() {
  const { userId } = useParams()
  const user = getAdminUserDetail(userId ?? ADMIN_USER_DETAIL_DEFAULT_ID)
  return <AdminUserDetailPage user={user} />
}
