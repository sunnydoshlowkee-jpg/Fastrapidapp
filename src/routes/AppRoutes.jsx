import { Routes, Route } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Home from '../apps/user/pages/Home'
import Search from '../apps/user/pages/Search'
import Orders from '../apps/user/pages/Orders'
import Profile from '../apps/user/pages/Profile'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
