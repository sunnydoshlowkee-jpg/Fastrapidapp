export default function DesktopFooter() {
  return (
    <footer className="hidden md:flex items-center justify-between px-8 py-4 border-t border-gray-100 text-xs text-gray-400 bg-white mt-auto">
      <span>© 2024 RAPID Consumer App. All Rights Reserved.</span>
      <div className="flex gap-6">
        <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-gray-600 transition-colors">Contact Us</a>
      </div>
    </footer>
  )
}
