import { useNavigate, useOutletContext } from 'react-router-dom'
import { MERCHANT_MENU_ITEM_CREATE } from '../../../../services/data/merchantMenuItemCreate.mock'
import MerchantMenuItemCreateForm from './MerchantMenuItemCreateForm'
import MerchantMenuItemCreateHeader from './MerchantMenuItemCreateHeader'
import MerchantMenuItemCreateIntro from './MerchantMenuItemCreateIntro'

export default function MerchantMenuItemCreateDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const copy = MERCHANT_MENU_ITEM_CREATE

  const handleCancel = () => {
    navigate('/merchant/menu')
  }

  const handleSubmit = () => {
    navigate('/merchant/menu')
  }

  return (
    <div className="hidden flex-1 flex-col gap-8 p-6 lg:flex lg:p-8">
      <MerchantMenuItemCreateHeader
        title={copy.headerTitle}
        showMenuButton
        showBack={false}
        onMenuClick={openMobileNav}
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <MerchantMenuItemCreateIntro title={copy.pageTitle} subtitle={copy.subtitle} />

        <article className="rounded-merchant-stat bg-merchant-surface p-8 shadow-merchant-stat">
          <MerchantMenuItemCreateForm
            copy={copy}
            categories={copy.categories}
            variant="desktop"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </article>
      </div>
    </div>
  )
}
