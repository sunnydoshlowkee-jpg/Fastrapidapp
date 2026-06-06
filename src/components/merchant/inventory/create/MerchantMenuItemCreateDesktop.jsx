import { useOutletContext } from 'react-router-dom'
import { MERCHANT_MENU_ITEM_CREATE } from '../../../../services/data/merchantMenuItemCreate.mock'
import MerchantMenuItemCreateForm from './MerchantMenuItemCreateForm'
import MerchantMenuItemCreateHeader from './MerchantMenuItemCreateHeader'
import MerchantMenuItemCreateIntro from './MerchantMenuItemCreateIntro'
import useMerchantMenuItemCreate from './useMerchantMenuItemCreate'

export default function MerchantMenuItemCreateDesktop() {
  const { openMobileNav } = useOutletContext()
  const copy = MERCHANT_MENU_ITEM_CREATE
  const { submitting, error, handleCancel, handleSubmit } = useMerchantMenuItemCreate()

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
          {error ? (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}
          <MerchantMenuItemCreateForm
            copy={copy}
            categories={copy.categories}
            variant="desktop"
            submitting={submitting}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </article>
      </div>
    </div>
  )
}
