import Card from '../../../components/ui/Card'
import { UtensilsCrossed, ShoppingBasket, Store } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  { label: 'Food', icon: UtensilsCrossed, color: 'bg-orange-50 text-rapid-orange' },
  { label: 'Groceries', icon: ShoppingBasket, color: 'bg-green-50 text-green-600' },
  { label: 'Market', icon: Store, color: 'bg-purple-50 text-purple-600' },
]

export default function Home() {
  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Good morning 👋</h1>
        <p className="text-sm text-gray-500 mt-0.5">What do you need today?</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {categories.map(({ label, icon: Icon, color }) => (
          <Card key={label} className="flex flex-col items-center py-4 gap-2">
            <span className={`p-3 rounded-xl ${color}`}>
              <Icon size={22} />
            </span>
            <span className="text-xs font-medium text-gray-700">{label}</span>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Nearby restaurants</h2>
        <p className="text-sm text-gray-400">Connect your API to load results.</p>
      </div>
    </div>
  )
}
