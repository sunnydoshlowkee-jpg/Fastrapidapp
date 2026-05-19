import { useOutletContext } from 'react-router-dom'
import { MERCHANT_MENU_UPLOAD } from '../../../services/data/merchantMenuUpload.mock'
import MerchantMenuUploadCsvCard from './MerchantMenuUploadCsvCard'
import MerchantMenuUploadHeader from './MerchantMenuUploadHeader'
import MerchantMenuUploadHelp from './MerchantMenuUploadHelp'
import MerchantMenuUploadIntro from './MerchantMenuUploadIntro'
import MerchantMenuUploadManualCard from './MerchantMenuUploadManualCard'

export default function MerchantMenuUploadPage() {
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_MENU_UPLOAD

  const handleStartEntry = () => {
    // Placeholder for manual entry flow
  }

  const handleUpload = () => {
    // Placeholder for CSV upload
  }

  const handleDownloadTemplate = () => {
    window.open(data.csvUpload.templateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:gap-10 lg:p-8">
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
