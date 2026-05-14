import Logo from '../brand/Logo'

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center px-8 py-4 border-b border-gray-100 bg-white">
      <Logo height={24} />
    </nav>
  )
}
