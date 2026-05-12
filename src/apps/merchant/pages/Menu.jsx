import Button from '../../../components/ui/Button'
import { Plus } from 'lucide-react'

export default function Menu() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Menu</h1>
        <Button size="sm"><Plus size={15} /> Add item</Button>
      </div>
      <p className="text-sm text-gray-400">No menu items yet. Add your first item.</p>
    </div>
  )
}
