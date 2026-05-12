import { Routes, Route } from 'react-router-dom'
import DispatchLayout from '../layouts/DispatchLayout'
import MapView from '../apps/dispatch/pages/MapView'
import Deliveries from '../apps/dispatch/pages/Deliveries'
import RiderProfile from '../apps/dispatch/pages/RiderProfile'

export default function DispatchRoutes() {
  return (
    <Routes>
      <Route element={<DispatchLayout />}>
        <Route index element={<MapView />} />
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="profile" element={<RiderProfile />} />
      </Route>
    </Routes>
  )
}
