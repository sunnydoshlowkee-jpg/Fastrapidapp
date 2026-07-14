export default function MerchantInventoryCategoryBadge({ category }) {
  return (
    <span className="inline-flex rounded-full bg-merchant-input px-2.5 py-1 text-xs font-medium text-merchant-body">
      {category}
    </span>
  )
}
