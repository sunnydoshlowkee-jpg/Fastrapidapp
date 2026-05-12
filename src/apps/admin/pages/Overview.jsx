import Card from '../../../components/ui/Card'

const stats = [
  { label: 'Total Users', value: '0' },
  { label: 'Total Merchants', value: '0' },
  { label: 'Active Riders', value: '0' },
  { label: 'Orders Today', value: '0' },
]

export default function Overview() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-100">Overview</h1>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value }) => (
          <Card key={label} className="bg-gray-800 border-white/5 p-5">
            <p className="text-xs text-gray-400 font-medium">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
