import Card from '../../../components/ui/Card'

const stats = [
  { label: 'Today\'s Orders', value: '0' },
  { label: 'Revenue', value: '₦0' },
  { label: 'Active Items', value: '0' },
  { label: 'Rating', value: '—' },
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value }) => (
          <Card key={label} className="p-5">
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Recent orders</h2>
        <p className="text-sm text-gray-400">No orders yet today.</p>
      </Card>
    </div>
  )
}
