import MerchantBusinessCategoryCard from './MerchantBusinessCategoryCard'
import MerchantBusinessProfileMobileDocuments from './mobile/MerchantBusinessProfileMobileDocuments'
import MerchantBusinessProfileMobileHeader from './mobile/MerchantBusinessProfileMobileHeader'
import MerchantBusinessProfileMobileInfoCard from './mobile/MerchantBusinessProfileMobileInfoCard'
import MerchantBusinessProfileMobileLocation from './mobile/MerchantBusinessProfileMobileLocation'
import MerchantBusinessProfileMobileStoreStatus from './mobile/MerchantBusinessProfileMobileStoreStatus'
import { merchantBusinessProfileMobileCardClass } from './mobile/merchantBusinessProfileMobileCardStyles'

export default function MerchantBusinessProfileMobile({
  profile,
  onSaveCategory,
  savingCategory = false,
  onLogoUpdated,
}) {
  const mobile = profile.mobile

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantBusinessProfileMobileHeader
        title={profile.pageTitle}
        merchantId={mobile.merchantId}
      />

      <p className="-mt-2 text-sm text-merchant-muted">{mobile.subtitle}</p>

      <MerchantBusinessProfileMobileInfoCard
        businessInfo={mobile.businessInfo}
        onLogoUpdated={onLogoUpdated}
      />
      <MerchantBusinessCategoryCard
        businessInfo={mobile.businessInfo}
        onSave={onSaveCategory}
        saving={savingCategory}
        className={merchantBusinessProfileMobileCardClass}
      />
      <MerchantBusinessProfileMobileStoreStatus storeStatus={mobile.storeStatus} />
      <MerchantBusinessProfileMobileDocuments documents={mobile.documents} />
      <MerchantBusinessProfileMobileLocation location={mobile.location} />
    </div>
  )
}
