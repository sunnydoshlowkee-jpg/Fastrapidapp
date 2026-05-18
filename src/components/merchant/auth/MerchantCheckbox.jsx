export default function MerchantCheckbox({ id, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 pt-1 md:gap-0 md:px-1 md:pt-0"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 appearance-none rounded border border-merchant-checkbox bg-white checked:border-merchant-link checked:bg-merchant-link focus:outline-none focus:ring-2 focus:ring-merchant-link/20 md:h-4 md:w-4 md:rounded-[2px] md:checked:border-merchant-primary md:checked:bg-merchant-primary md:focus:ring-merchant-primary/20"
      />
      <span className="text-sm font-medium leading-6 text-merchant-ink md:pl-3 md:text-base md:font-normal md:text-merchant-body">
        {label}
      </span>
    </label>
  )
}
