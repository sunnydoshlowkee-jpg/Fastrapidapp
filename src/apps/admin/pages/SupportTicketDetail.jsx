import { Navigate, useParams } from 'react-router-dom'
import AdminSupportTicketDetailMobile from '../../../components/admin/support/AdminSupportTicketDetailMobile'
import AdminSupportTicketsPage from '../../../components/admin/support/AdminSupportTicketsPage'
import {
  ADMIN_SUPPORT_PATH,
  getSupportTicketById,
} from '../../../services/data/adminSupportTickets.mock'

export default function SupportTicketDetail() {
  const { ticketId } = useParams()
  if (!ticketId) return <Navigate to={ADMIN_SUPPORT_PATH} replace />

  const ticket = getSupportTicketById(ticketId)

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminSupportTicketDetailMobile ticket={ticket} />
      </div>
      <div className="hidden h-full min-h-0 flex-1 lg:flex">
        <AdminSupportTicketsPage initialTicketId={ticketId} />
      </div>
    </>
  )
}
