import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import { Home, Truck, BarChart2, User } from 'lucide-react'

const navItems = [
  { to: '/dispatch',            icon: Home,     label: 'Home',       end: true },
  { to: '/dispatch/deliveries', icon: Truck,    label: 'Deliveries', end: false },
  { to: '/dispatch/earnings',   icon: BarChart2,label: 'Earnings',   end: false },
  { to: '/dispatch/profile',    icon: User,     label: 'Profile',    end: false },
]

export default function DispatchLayout() {
  const location = useLocation()
  const isAuthed = Boolean(localStorage.getItem('rapid_token'))

  if (!isAuthed) {
    return <Navigate to="/dispatch/login" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center h-[68px] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors w-16 ${
                isActive ? 'text-[#5B5BFF]' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
