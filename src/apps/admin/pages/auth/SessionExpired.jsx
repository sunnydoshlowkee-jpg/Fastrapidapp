import { ArrowRight, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminRecoveryCard from '../../../../components/admin/auth/AdminRecoveryCard'
import {
  ADMIN_LOGIN_PATH,
  ADMIN_SESSION_EXPIRED_COPY,
} from '../../../../services/data/adminAuth.mock'
import { clearAdminSession } from '../../../../services/adminAuthService'

export default function AdminSessionExpired() {
  const navigate = useNavigate()
  const copy = ADMIN_SESSION_EXPIRED_COPY

  const handleLoginAgain = () => {
    clearAdminSession()
    navigate(ADMIN_LOGIN_PATH, { replace: true })
  }

  const icon = (
    <Lock size={24} strokeWidth={2} className="text-[#C4590E]" aria-hidden />
  )

  return (
    <AdminRecoveryCard icon={icon}>
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {copy.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          {copy.subtitle}
        </p>
      </header>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleLoginAgain}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0px_10px_24px_-12px_rgba(228,75,21,0.6)] transition-opacity hover:opacity-95"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #FF6B30 0%, #E14A12 100%)',
          }}
        >
          {copy.buttonLabel}
          <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </AdminRecoveryCard>
  )
}
