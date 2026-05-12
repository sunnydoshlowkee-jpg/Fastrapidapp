import { Routes, Route } from 'react-router-dom'
import Landing from '../apps/user/pages/Landing'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route index element={<Landing />} />
    </Routes>
  )
}
