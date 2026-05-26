import { Navigate, useParams } from 'react-router-dom'
import AdminMerchantDocumentReviewMobilePage from '../../../components/admin/merchants/AdminMerchantDocumentReviewMobilePage'
import { getAdminMerchantDetail } from '../../../services/data/adminMerchantDetail.mock'
import { ADMIN_MERCHANTS_PATH } from '../../../services/data/adminMerchants.mock'

export default function MerchantDocumentReview() {
  const { merchantId } = useParams()
  if (!merchantId) return <Navigate to={ADMIN_MERCHANTS_PATH} replace />

  const merchant = getAdminMerchantDetail(merchantId)
  const review = merchant.documentReview

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminMerchantDocumentReviewMobilePage review={review} />
      </div>
      <div className="hidden h-full min-h-0 flex-1 flex-col items-center justify-center p-12 lg:flex">
        <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Document Review</h2>
          <p className="mt-2 text-sm text-gray-600">
            The document review workflow is currently optimised for phone screens.
            Open this URL on a mobile device or resize your window to use it.
          </p>
        </div>
      </div>
    </>
  )
}
