import { useNavigate } from 'react-router-dom'
import { MERCHANT_MENU_ITEM_CREATE } from '../../../../services/data/merchantMenuItemCreate.mock'
import MerchantMenuItemCreateForm from './MerchantMenuItemCreateForm'
import MerchantMenuItemCreateMobileHeader from './mobile/MerchantMenuItemCreateMobileHeader'

export default function MerchantMenuItemCreateMobile() {
  const navigate = useNavigate()
  const copy = MERCHANT_MENU_ITEM_CREATE

  const handleCancel = () => {
    navigate('/merchant/menu')
  }

  const handleSubmit = () => {
    navigate('/merchant/menu')
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantMenuItemCreateMobileHeader title={copy.headerTitle} />

      <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
        <MerchantMenuItemCreateForm
          copy={copy}
          categories={copy.categories}
          variant="mobile"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </article>
    </div>
  )
}
