import { useOutletContext } from 'react-router-dom'
import MerchantBusinessCategoryCard from './MerchantBusinessCategoryCard'
import MerchantBusinessProfileDocuments from './MerchantBusinessProfileDocuments'
import MerchantBusinessProfileHeader from './MerchantBusinessProfileHeader'
import MerchantBusinessProfileInfoCard from './MerchantBusinessProfileInfoCard'
import MerchantBusinessProfileStoreStatus from './MerchantBusinessProfileStoreStatus'

export default function MerchantBusinessProfileDesktop({
  profile,
  onSaveCategory,
  savingCategory = false,
  onLogoUpdated,
  onTogglePaused,
  savingStoreStatus = false,
  onDocumentUpload,
}) {
  const { openMobileNav } = useOutletContext()

  return (
    <div className="hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantBusinessProfileHeader
        title={profile.pageTitle}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <div className="flex w-full flex-col gap-5 lg:gap-6">
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-6">
          <MerchantBusinessProfileInfoCard
            businessInfo={profile.businessInfo}
            onLogoUpdated={onLogoUpdated}
          />
          <MerchantBusinessProfileStoreStatus
            storeStatus={profile.storeStatus}
            onTogglePaused={onTogglePaused}
            saving={savingStoreStatus}
          />
        </div>
        <MerchantBusinessCategoryCard
          businessInfo={profile.businessInfo}
          onSave={onSaveCategory}
          saving={savingCategory}
        />
        <MerchantBusinessProfileDocuments
          documents={profile.documents}
          onUpload={onDocumentUpload}
          onReupload={onDocumentUpload}
        />
      </div>
    </div>
  )
}
