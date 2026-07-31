import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { MERCHANT_MENU_NEW_PATH } from '../../../services/data/merchantMenuItemCreate.mock'
import { MERCHANT_MENU_IMPORT_SUCCESS_PATH } from '../../../services/data/merchantMenuImportSuccess.mock'
import { MERCHANT_MENU_UPLOAD } from '../../../services/data/merchantMenuUpload.mock'
import {
  downloadMerchantProductImportTemplate,
  importMerchantProductsCsv,
} from '../../../services/merchantProductsService'
import MerchantMenuUploadCsvCard from './MerchantMenuUploadCsvCard'
import MerchantMenuUploadHeader from './MerchantMenuUploadHeader'
import MerchantMenuUploadHelp from './MerchantMenuUploadHelp'
import MerchantMenuUploadIntro from './MerchantMenuUploadIntro'
import MerchantMenuUploadManualCard from './MerchantMenuUploadManualCard'

export default function MerchantMenuUploadDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_MENU_UPLOAD
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleStartEntry = () => {
    navigate(MERCHANT_MENU_NEW_PATH)
  }

  const handleUpload = async (file) => {
    if (!file) {
      setError('Choose a CSV file first.')
      return
    }
    setUploading(true)
    setError('')
    try {
      const result = await importMerchantProductsCsv(file)
      navigate(MERCHANT_MENU_IMPORT_SUCCESS_PATH, { state: { importResult: result } })
    } catch (err) {
      setError(err.message || 'Could not import CSV.')
    } finally {
      setUploading(false)
    }
  }

  const handleDownloadTemplate = async () => {
    try {
      await downloadMerchantProductImportTemplate()
    } catch (err) {
      alert(err.message || 'Could not download template.')
    }
  }

  return (
    <div className="hidden flex-1 flex-col bg-merchant-canvas lg:flex">
      <MerchantMenuUploadHeader
        title={data.title}
        variant="bar"
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <div className="flex flex-1 flex-col items-center px-12 pb-20 pt-24">
        <div className="flex w-full max-w-[944px] flex-col items-center gap-16">
          <MerchantMenuUploadIntro
            heading={data.intro.heading}
            subheading={data.intro.subheading}
          />

          <div className="grid w-full grid-cols-2 gap-8">
            <MerchantMenuUploadManualCard
              manualEntry={data.manualEntry}
              onStartEntry={handleStartEntry}
            />
            <MerchantMenuUploadCsvCard
              csvUpload={data.csvUpload}
              onUpload={handleUpload}
              onDownloadTemplate={handleDownloadTemplate}
              uploading={uploading}
              error={error}
            />
          </div>

          <MerchantMenuUploadHelp
            help={data.help}
            documentationUrl={data.csvUpload.documentationUrl}
          />
        </div>
      </div>
    </div>
  )
}
