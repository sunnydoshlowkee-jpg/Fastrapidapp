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
          <p className="py-8 text-center text-sm text-merchant-muted">Loading product…</p>
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
            submitting={submitting}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </article>
    </div>
  )
}
