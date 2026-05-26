import AdminMerchantApprovalsMobilePage from '../../../components/admin/merchants/AdminMerchantApprovalsMobilePage'
import { ADMIN_MERCHANT_APPROVALS } from '../../../services/data/adminMerchantApprovals.mock'

export default function MerchantApprovals() {
  const data = ADMIN_MERCHANT_APPROVALS

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminMerchantApprovalsMobilePage data={data} />
      </div>
      <div className="hidden h-full min-h-0 flex-1 flex-col items-center justify-center p-12 lg:flex">
        <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{data.pageTitle}</h2>
          <p className="mt-2 text-sm text-gray-600">
            The mobile approvals workflow is currently optimised for phone screens.
            Resize your window or use the merchants list for desktop review.
          </p>
        </div>
      </div>
    </>
  )
}
