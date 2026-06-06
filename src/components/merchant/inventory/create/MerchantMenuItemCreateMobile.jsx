import { MERCHANT_MENU_ITEM_CREATE } from '../../../../services/data/merchantMenuItemCreate.mock'
import MerchantMenuItemCreateForm from './MerchantMenuItemCreateForm'
import MerchantMenuItemCreateMobileHeader from './mobile/MerchantMenuItemCreateMobileHeader'
import useMerchantMenuItemCreate from './useMerchantMenuItemCreate'

export default function MerchantMenuItemCreateMobile() {
  const copy = MERCHANT_MENU_ITEM_CREATE
  const { submitting, error, handleCancel, handleSubmit } = useMerchantMenuItemCreate()

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantMenuItemCreateMobileHeader title={copy.headerTitle} />

      <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        <MerchantMenuItemCreateForm
          copy={copy}
          categories={copy.categories}
          variant="mobile"
          submitting={submitting}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </article>
    </div>
  )
}
