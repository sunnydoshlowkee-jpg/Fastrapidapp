import { MERCHANT_PENDING_APPROVAL } from '../../../services/data/merchantPendingApproval.mock'
import MerchantPendingApprovalFooter from './MerchantPendingApprovalFooter'
import MerchantPendingApprovalHeader from './MerchantPendingApprovalHeader'
import MerchantPendingApprovalInfoCard from './MerchantPendingApprovalInfoCard'
import MerchantPendingApprovalStatus from './MerchantPendingApprovalStatus'

export default function MerchantPendingApprovalPage() {
  const data = MERCHANT_PENDING_APPROVAL

  return (
    <div className="flex min-h-screen flex-col bg-merchant-canvas">
      <MerchantPendingApprovalHeader supportLabel={data.supportLabel} />

      <main className="flex flex-1 flex-col px-5 py-8 md:px-8 md:py-14">
        <MerchantPendingApprovalStatus status={data.status} />

        <div className="mx-auto mt-10 grid w-full max-w-md grid-cols-1 gap-4 md:mt-12 md:max-w-3xl md:grid-cols-2 md:gap-6">
          {data.cards.map((card) => (
            <MerchantPendingApprovalInfoCard key={card.id} card={card} />
          ))}
        </div>
      </main>

      <MerchantPendingApprovalFooter footer={data.footer} />
    </div>
  )
}
