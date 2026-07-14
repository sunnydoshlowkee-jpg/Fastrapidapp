import { useState } from 'react'
import { Plus } from 'lucide-react'
import MerchantMenuItemCreateField from './MerchantMenuItemCreateField'
import { inputClassName } from './MerchantMenuItemCreateMediaUpload'

export default function MerchantMenuItemCategoryField({
  label,
  categories,
  value,
  onChange,
  onCreateCategory,
  creating = false,
}) {
  const [showCreate, setShowCreate] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const options = [
    { value: '', label: 'Select category' },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.name,
    })),
  ]

  const handleCreate = async () => {
    if (!newCategoryName.trim() || creating) return

    const created = await onCreateCategory?.(newCategoryName.trim())
    if (created?.slug) {
      onChange(created.slug)
      setNewCategoryName('')
      setShowCreate(false)
    }
  }

  return (
    <div className="space-y-3">
      <MerchantMenuItemCreateField id="category" label={label}>
        <div className="relative">
          <select
            id="category"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className={`${inputClassName} appearance-none pr-10`}
          >
            {options.map((option) => (
              <option key={option.value || 'placeholder'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </MerchantMenuItemCreateField>

      {!showCreate ? (
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-merchant-primary hover:text-merchant-link"
        >
          <Plus size={16} />
          Add new category
        </button>
      ) : (
        <div className="rounded-xl border border-merchant-divider bg-merchant-input p-4">
          <label htmlFor="newCategory" className="mb-2 block text-sm font-semibold text-merchant-ink">
            New category name
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="newCategory"
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Power Banks"
              className={inputClassName}
            />
            <button
              type="button"
              onClick={handleCreate}
              disabled={creating || !newCategoryName.trim()}
              className="rounded-lg bg-merchant-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {creating ? 'Saving…' : 'Save category'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
