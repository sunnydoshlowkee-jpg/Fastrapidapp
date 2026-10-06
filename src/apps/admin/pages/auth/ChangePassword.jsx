import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminRecoveryCard from '../../../../components/admin/auth/AdminRecoveryCard'
import AdminAuthField from '../../../../components/admin/auth/AdminAuthField'
import AdminRecoveryButton from '../../../../components/admin/auth/AdminRecoveryButton'
import {
  changeAdminPassword,
  getStoredAdminSession,
  isAdminAuthenticated,
} from '../../../../services/adminAuthService'

export default function AdminChangePassword() {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  const stored = getStoredAdminSession()
  const displayName = stored?.user?.name || stored?.user?.email || 'Administrator'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await changeAdminPassword({ currentPassword, newPassword, confirmPassword })
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to change your password.')
    } finally {
      setLoading(false)
    }
  }

  const icon = <KeyRound size={24} strokeWidth={2} className="text-[#C4590E]" aria-hidden />

  return (
    <AdminRecoveryCard icon={icon}>
      <header className="mb-8 w-full text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Set your new password</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Hi {displayName}. You signed in with a temporary password — please create a secure
          password for your account before continuing.
        </p>
      </header>

      {error ? (
        <div
          role="alert"
          className="mb-6 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <AdminAuthField
          id="admin-change-current"
          label="Current password"
          type="password"
          placeholder="Your temporary password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value)
            if (error) setError('')
          }}
          leadingIcon="lock"
          labelVariant="recovery"
        />
        <AdminAuthField
          id="admin-change-new"
          label="New password"
          type="password"
          placeholder="At least 8 chars, incl. number & symbol"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value)
            if (error) setError('')
          }}
          leadingIcon="lock"
          labelVariant="recovery"
        />
        <AdminAuthField
          id="admin-change-confirm"
          label="Confirm new password"
          type="password"
          placeholder="Re-enter your new password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            if (error) setError('')
          }}
          leadingIcon="lock"
          labelVariant="recovery"
        />

        <AdminRecoveryButton disabled={loading}>
          {loading ? 'Saving…' : 'Save new password'}
        </AdminRecoveryButton>
      </form>
    </AdminRecoveryCard>
  )
}
