import { useOutletContext } from 'react-router-dom'
import MerchantMenuItemCreateForm from './MerchantMenuItemCreateForm'
import MerchantMenuItemCreateHeader from './MerchantMenuItemCreateHeader'
import MerchantMenuItemCreateIntro from './MerchantMenuItemCreateIntro'

export default function MerchantMenuItemCreateDesktop({
  copy,
  loading,
  initialForm,
  initialImageUrl,
  submitting,
  error,
  handleCancel,
  handleSubmit,
}) {
  const { openMobileNav } = useOutletContext()

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
          {loading ? (
            <p className="py-8 text-center text-sm text-merchant-muted">Loading product…</p>
          ) : (
            <MerchantMenuItemCreateForm
              copy={copy}
              categories={copy.categories}
              variant="desktop"
              initialForm={initialForm}
              initialImageUrl={initialImageUrl}
              submitting={submitting}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </article>
      </div>
    </div>
  )
}
