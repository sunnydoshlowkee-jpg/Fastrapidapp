import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function VendorInfoTab({ merchant }) {
  const latitude = merchant.latitude ? parseFloat(merchant.latitude) : null
  const longitude = merchant.longitude ? parseFloat(merchant.longitude) : null

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <h3 className="text-[16px] font-bold text-gray-900 mb-4">About {merchant.name}</h3>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
          {merchant.description || 'No description available for this vendor.'}
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-[#4F46E5] shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-bold text-gray-900">Address</p>
              <p className="text-[13px] text-gray-500">
                {merchant.registered_address || 'Address not provided'}
                {merchant.address_city && `, ${merchant.address_city}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-[#4F46E5] shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-bold text-gray-900">Opening Hours</p>
              <p className="text-[13px] text-gray-500">
                {merchant.operating_hours ? 'Check vendor hours' : 'Operating hours not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {latitude && longitude && (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 h-[250px] flex flex-col">
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">Location</h3>
          <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-200 z-0">
            <MapContainer 
              center={[latitude, longitude]} 
              zoom={15} 
              zoomControl={false}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitude, longitude]}>
                <Popup>{merchant.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  )
}
