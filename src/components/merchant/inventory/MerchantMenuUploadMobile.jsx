import { useNavigate } from 'react-router-dom'
import { MERCHANT_MENU_NEW_PATH } from '../../../services/data/merchantMenuItemCreate.mock'
import { MERCHANT_MENU_IMPORT_SUCCESS_PATH } from '../../../services/data/merchantMenuImportSuccess.mock'
import { MERCHANT_MENU_UPLOAD } from '../../../services/data/merchantMenuUpload.mock'
import MerchantMenuUploadMobileCsvCard from './mobile/MerchantMenuUploadMobileCsvCard'
import MerchantMenuUploadMobileHeader from './mobile/MerchantMenuUploadMobileHeader'
import MerchantMenuUploadMobileHelp from './mobile/MerchantMenuUploadMobileHelp'
import MerchantMenuUploadMobileManualCard from './mobile/MerchantMenuUploadMobileManualCard'

export default function MerchantMenuUploadMobile() {
  const navigate = useNavigate()
  const data = MERCHANT_MENU_UPLOAD
  const mobile = data.mobile

  const handleStartEntry = () => {
    navigate(MERCHANT_MENU_NEW_PATH)
  }

  const handleUpload = () => {
    navigate(MERCHANT_MENU_IMPORT_SUCCESS_PATH)
  }

  const handleDownloadTemplate = () => {
    window.open(data.csvUpload.templateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-merchant-canvas shadow-[0px_1px_2px_rgba(198,196,218,0.15)] lg:hidden">
      <MerchantMenuUploadMobileHeader title={data.title} />

      <div className="flex flex-col gap-6 px-4 py-6">
        <p className="max-w-[349px] text-[13px] leading-5 text-merchant-mobile-muted">
          {mobile.intro.subheading}
        </p>

        <div className="flex flex-col gap-4">
          <MerchantMenuUploadMobileManualCard
            manualEntry={data.manualEntry}
            onStartEntry={handleStartEntry}
          />

          <MerchantMenuUploadMobileCsvCard
            csvUpload={data.csvUpload}
            mobileCsv={mobile.csvUpload}
            onUpload={handleUpload}
            onDownloadTemplate={handleDownloadTemplate}
          />
        </div>

        <MerchantMenuUploadMobileHelp help={mobile.help} />
      </div>
    </div>
  )
}
