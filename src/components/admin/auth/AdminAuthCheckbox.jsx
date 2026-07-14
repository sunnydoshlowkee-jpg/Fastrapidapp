export default function AdminAuthCheckbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded border border-gray-300 text-rapid-orange focus:ring-rapid-orange/30"
      />
      <span className="text-sm text-gray-500">{label}</span>
    </label>
  )
}
