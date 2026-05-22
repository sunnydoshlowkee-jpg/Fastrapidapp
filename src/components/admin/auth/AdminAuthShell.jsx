import AdminAuthBrandPanel from './AdminAuthBrandPanel'

export default function AdminAuthShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans lg:flex-row">
      <AdminAuthBrandPanel />
      <main className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
