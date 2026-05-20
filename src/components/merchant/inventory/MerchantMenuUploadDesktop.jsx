import { useNavigate, useOutletContext } from 'react-router-dom'
import { MERCHANT_MENU_NEW_PATH } from '../../../services/data/merchantMenuItemCreate.mock'
import { MERCHANT_MENU_IMPORT_SUCCESS_PATH } from '../../../services/data/merchantMenuImportSuccess.mock'
import { MERCHANT_MENU_UPLOAD } from '../../../services/data/merchantMenuUpload.mock'
import MerchantMenuUploadCsvCard from './MerchantMenuUploadCsvCard'
import MerchantMenuUploadHeader from './MerchantMenuUploadHeader'
import MerchantMenuUploadHelp from './MerchantMenuUploadHelp'
import MerchantMenuUploadIntro from './MerchantMenuUploadIntro'
import MerchantMenuUploadManualCard from './MerchantMenuUploadManualCard'

export default function MerchantMenuUploadDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_MENU_UPLOAD

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
    <div className="hidden flex-1 flex-col gap-8 p-6 lg:flex lg:gap-10 lg:p-8">
      <MerchantMenuUploadHeader
        title={data.title}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <MerchantMenuUploadIntro
        heading={data.intro.heading}
        subheading={data.intro.subheading}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <MerchantMenuUploadManualCard
          manualEntry={data.manualEntry}
          onStartEntry={handleStartEntry}
        />
        <MerchantMenuUploadCsvCard
          csvUpload={data.csvUpload}
          onUpload={handleUpload}
          onDownloadTemplate={handleDownloadTemplate}
        />
      </div>

      <MerchantMenuUploadHelp
        help={data.help}
        documentationUrl={data.csvUpload.documentationUrl}
      />
    </div>
  )
}
