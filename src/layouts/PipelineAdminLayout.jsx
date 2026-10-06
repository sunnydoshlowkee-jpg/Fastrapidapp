import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { GitBranch } from 'lucide-react'
import PipelineAdminSidebar from '../components/pipeline-admin/layout/PipelineAdminSidebar'

export default function PipelineAdminLayout() {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!drawerOpen) return undefined
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [drawerOpen])

  return (
    <div className="flex min-h-screen bg-[#F5F6F8] font-sans text-gray-900">
      <div className="hidden lg:flex">
        <PipelineAdminSidebar />
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-40 flex lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-gray-900/50"
          />
          <div className="relative z-10 flex max-h-full max-w-[18rem]">
            <PipelineAdminSidebar onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <span className="text-xl leading-none">&#9776;</span>
          </button>
          <div className="flex items-center gap-2 text-violet-700">
            <GitBranch size={18} strokeWidth={2} aria-hidden />
            <span className="text-sm font-bold">Pipeline</span>
          </div>
          <span className="w-9" aria-hidden />
        </header>

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}