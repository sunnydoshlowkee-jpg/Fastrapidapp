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
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantMenuUploadMobileHeader title={data.title} />

      <p className="text-sm leading-relaxed text-merchant-muted">{mobile.intro.subheading}</p>

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

      <MerchantMenuUploadMobileHelp help={mobile.help} />
    </div>
  )
}
