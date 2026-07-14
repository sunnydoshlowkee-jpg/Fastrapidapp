import api from './api';
import { uploadProfileAvatar } from './authService';
import { clearPushTokenOnLogout, syncPushTokenAfterLogin } from './pushNotifications';

export const requestRegistrationEmail = (email) =>
  api.post('/rider/auth/email', { email });

export const verifyRegistrationEmail = ({ email, code }) =>
  api.post('/rider/auth/email/verify', { email, code });

export const login = (credentials) => api.post('/rider/auth/login', credentials);

export const register = (data) => api.post('/rider/auth/register', data);

export const toggleStatus = () => api.post('/rider/auth/status');
export const getProfile = () => api.get('/rider/me');
export const updateProfile = (data) => api.put('/rider/profile', data);
export const requestEmailOtp = (email) => api.post('/rider/auth/email', { email });
export const verifyEmailOtp = (email, code) => api.post('/rider/auth/email/verify', { email, code });
export const requestPhoneOtp = (phone) => api.post('/rider/auth/phone', { phone });
export const verifyPhoneOtp = (phone, code) => api.post('/rider/auth/phone/verify', { phone, code });

export const getRiderBanks = async () => {
  const { data } = await api.get('/rider/banks')
  return data?.data || []
}

export const resolveRiderAccountName = async (bankCode, accountNumber) => {
  const { data } = await api.post('/rider/resolve-account', {
    bank_code: bankCode,
    account_number: accountNumber,
  })
  return data?.data
}

export const getDocuments = () => api.get('/rider/documents');
export const uploadDocument = (data) => api.post('/rider/documents', data, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getRiderMe = () => api.get('/rider/me');

export const updateRiderProfile = (data) => api.put('/rider/profile', data);

export const getRiderDocuments = () => api.get('/rider/documents');

export const uploadRiderAvatar = uploadProfileAvatar;

export function extractRiderSession(response) {
  const data = response.data?.data ?? response.data ?? response;

  return {
    token: data.token ?? response.data?.token ?? response.token,
    profile: {
      user: data.user,
      rider: data.rider,
    },
  };
}

export function persistRiderSession({ token, profile }) {
  if (token) {
    localStorage.setItem('rider_token', token)
    localStorage.setItem('rapid_token', token)
  }
  if (profile?.user || profile?.rider) {
    localStorage.setItem('rider_user', JSON.stringify(profile))
  }
  window.dispatchEvent(new Event('rapid-auth-changed'))
  syncPushTokenAfterLogin()
}

export async function clearRiderSession() {
  await clearPushTokenOnLogout()
  localStorage.removeItem('rider_token')
  localStorage.removeItem('rapid_token')
  localStorage.removeItem('rider_user')
  window.dispatchEvent(new Event('rapid-auth-changed'))
}

export async function refreshRiderSession() {
  const { data } = await getProfile()
  const profile = data?.data ?? data

  if (profile?.user || profile?.rider) {
    localStorage.setItem('rider_user', JSON.stringify(profile))
  }

  return profile
}

export function getRiderApprovalStatus() {
  try {
    const raw = localStorage.getItem('rider_user')
    const parsed = raw ? JSON.parse(raw) : null
    return parsed?.rider?.status || 'pending'
  } catch {
    return 'pending'
  }
}

export function isRiderApproved() {
  return getRiderApprovalStatus() === 'approved'
}

export function updateCachedRiderProfile(profile) {
  if (profile?.user || profile?.rider) {
    localStorage.setItem('rider_user', JSON.stringify(profile))
  }
}

export function getCachedRiderProfile() {
  try {
    const raw = localStorage.getItem('rider_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getRiderGreetingName(profile) {
  return (
    profile?.user?.first_name
    || profile?.user?.full_name?.split(' ')?.[0]
    || 'Rider'
  );
}

export function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
