import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MERCHANT_MENU_IMPORT_SUCCESS } from '../../../../services/data/merchantMenuImportSuccess.mock'
import MerchantMenuImportSuccessDesktop from './MerchantMenuImportSuccessDesktop'
import MerchantMenuImportSuccessMobile from './MerchantMenuImportSuccessMobile'

function buildImportView(result) {
  const imported = Number(result?.imported ?? result?.created ?? 0)
  const errors = Array.isArray(result?.errors) ? result.errors.length : 0
  const data = MERCHANT_MENU_IMPORT_SUCCESS

  return {
    ...data,
    importedCount: imported,
    stats: [
      {
        ...data.stats[0],
        value: Number(result?.created ?? imported),
      },
      {
        ...data.stats[1],
        value: Number(result?.updated ?? 0),
      },
      {
        ...data.stats[2],
        value: errors,
        badge: errors === 0 ? 'Clean Import' : 'Review rows',
        badgeTone: errors === 0 ? 'success' : 'primary',
      },
    ],
    mobile: {
      ...data.mobile,
      stats: [
        {
          ...data.mobile.stats[0],
          value: Number(result?.created ?? imported),
        },
        {
          ...data.mobile.stats[1],
          value: Number(result?.updated ?? 0),
        },
        {
          ...data.mobile.stats[2],
          value: errors,
        },
      ],
    },
  }
}

export default function MerchantMenuImportSuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.importResult

  useEffect(() => {
    if (!result) {
      navigate('/merchant/menu/upload', { replace: true })
    }
  }, [navigate, result])

  if (!result) {
    return null
  }

  const data = buildImportView(result)

  return (
    <>
      <MerchantMenuImportSuccessMobile data={data} />
      <MerchantMenuImportSuccessDesktop data={data} />
    </>
  )
}
