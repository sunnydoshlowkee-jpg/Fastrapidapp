import { useOutletContext } from 'react-router-dom'
import { MERCHANT_BUSINESS_PROFILE } from '../../../../services/data/merchantBusinessProfile.mock'
import MerchantBusinessProfileDocuments from './MerchantBusinessProfileDocuments'
import MerchantBusinessProfileHeader from './MerchantBusinessProfileHeader'
import MerchantBusinessProfileInfoCard from './MerchantBusinessProfileInfoCard'
import MerchantBusinessProfileStoreStatus from './MerchantBusinessProfileStoreStatus'

export default function MerchantBusinessProfileDesktop() {
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_BUSINESS_PROFILE

  return (
    <div className="hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantBusinessProfileHeader
        title={data.pageTitle}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <div className="flex w-full flex-col gap-5 lg:gap-6">
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-6">
          <MerchantBusinessProfileInfoCard businessInfo={data.businessInfo} />
          <MerchantBusinessProfileStoreStatus storeStatus={data.storeStatus} />
        </div>
        <MerchantBusinessProfileDocuments documents={data.documents} />
      </div>
    </div>
  )
}

