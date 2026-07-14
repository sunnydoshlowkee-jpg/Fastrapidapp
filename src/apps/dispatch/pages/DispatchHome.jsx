import { Navigate } from 'react-router-dom'
import { isRiderApproved } from '../../../services/riderAuthService'
import MapView from './MapView'

export default function DispatchHome() {
  if (!isRiderApproved()) {
    return <Navigate to="/dispatch/pending" replace />
  }

  return <MapView />
}
