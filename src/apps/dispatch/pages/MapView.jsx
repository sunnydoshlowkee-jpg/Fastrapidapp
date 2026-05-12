import { MapPin } from 'lucide-react'

export default function MapView() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-white px-6">
      <MapPin size={48} className="text-rapid-orange" />
      <h1 className="text-lg font-bold">Waiting for a delivery</h1>
      <p className="text-sm text-gray-400 text-center">Stay online to receive new delivery requests.</p>
    </div>
  )
}
