import BrandedLoader from '../../../ui/BrandedLoader'
import MerchantMenuItemCreateForm from './MerchantMenuItemCreateForm'
import MerchantMenuItemCreateMobileHeader from './mobile/MerchantMenuItemCreateMobileHeader'

export default function MerchantMenuItemCreateMobile({
  copy,
  categories,
  allowsMultipleImages,
  creatingCategory,
  loading,
  initialForm,
  initialImageUrls,
  showAnnounce = false,
  submitting,
  error,
  handleCancel,
  handleCreateCategory,
  handleSubmit,
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantMenuItemCreateMobileHeader title={copy.headerTitle} />

      <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {loading ? (
          <BrandedLoader size="md" />
        ) : (
          <MerchantMenuItemCreateForm
            copy={copy}
            categories={categories}
            allowsMultipleImages={allowsMultipleImages}
            onCreateCategory={handleCreateCategory}
            creatingCategory={creatingCategory}
            variant="mobile"
            initialForm={initialForm}
            initialImageUrls={initialImageUrls}
            showAnnounce={showAnnounce}
            submitting={submitting}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </article>
    </div>
  )
}
