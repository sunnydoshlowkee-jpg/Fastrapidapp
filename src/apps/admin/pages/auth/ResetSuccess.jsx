import { useEffect } from 'react'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminLoginButton from '../../../../components/admin/auth/AdminLoginButton'
import {
  ADMIN_LOGIN_PATH,
  ADMIN_RESET_SUCCESS_COPY,
} from '../../../../services/data/adminAuth.mock'

const RESET_SUCCESS_FLAG = 'rapid_admin_reset_success'

export function markAdminResetSuccess() {
  sessionStorage.setItem(RESET_SUCCESS_FLAG, '1')
}

export function clearAdminResetSuccessFlag() {
  sessionStorage.removeItem(RESET_SUCCESS_FLAG)
}

export default function AdminResetSuccess() {
  const navigate = useNavigate()
  const copy = ADMIN_RESET_SUCCESS_COPY

  const goLogin = () => {
    clearAdminResetSuccessFlag()
    navigate(ADMIN_LOGIN_PATH, { replace: true })
  }

  useEffect(() => {
    if (!sessionStorage.getItem(RESET_SUCCESS_FLAG)) {
      navigate(ADMIN_LOGIN_PATH, { replace: true })
      return undefined
    }

    const timer = setTimeout(goLogin, copy.redirectDelayMs)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 font-sans">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full bg-emerald-100/80"
            aria-hidden
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0px_4px_20px_0px_rgba(16,185,129,0.35)]">
            <Check size={32} strokeWidth={2.5} aria-hidden />
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{copy.title}</h1>
        <p className="mt-2 text-sm text-gray-500">{copy.subtitle}</p>

        <div className="mt-10 w-full">
          <AdminLoginButton type="button" onClick={goLogin}>
            {copy.buttonLabel}
          </AdminLoginButton>
        </div>
      </div>
    </div>
  )
}
