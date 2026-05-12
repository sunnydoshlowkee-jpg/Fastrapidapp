import Input from '../../../components/ui/Input'
import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
  return (
    <div className="px-4 pt-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Search</h1>
      <div className="relative">
        <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          id="search"
          placeholder="Restaurants, groceries, items…"
          className="pl-9"
        />
      </div>
      <p className="text-sm text-gray-400 text-center pt-8">Start typing to search</p>
    </div>
  )
}
