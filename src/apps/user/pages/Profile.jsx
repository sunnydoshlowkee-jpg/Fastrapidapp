import { User } from 'lucide-react'

export default function Profile() {
  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="flex flex-col items-center gap-3">
        <span className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
          <User size={32} className="text-rapid-orange" />
        </span>
        <p className="text-sm text-gray-500">Sign in to see your profile</p>
      </div>
    </div>
  )
}
