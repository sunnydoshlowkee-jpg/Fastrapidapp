export const PIPELINE_ADMIN_LOGIN_PATH = '/pipeline-admin/login'
export const PIPELINE_ADMIN_VERIFY_2FA_PATH = '/pipeline-admin/verify-2fa'
export const PIPELINE_ADMIN_FORGOT_PASSWORD_PATH = '/pipeline-admin/forgot-password'
export const PIPELINE_ADMIN_INDEX_PATH = '/pipeline-admin'
export const PIPELINE_ADMIN_SESSION_EXPIRED_PATH = '/pipeline-admin/session-expired'

export const PIPELINE_ADMIN_2FA_COPY = {
  title: 'Enter your 2FA code',
  subtitle: 'Sent to your email',
  verifyLabel: 'VERIFY',
  resendPrefix: "Didn't receive code?",
  resendAction: 'Resend',
  resendCountdownPrefix: 'Resend in',
  backToLogin: 'Back to Login',
  resendCooldownSeconds: 45,
  invalidCodeMessage: 'Invalid code. Please try again.',
}

export const PIPELINE_ADMIN_FORGOT_PASSWORD_COPY = {
  title: 'Reset your password',
  subtitle: 'We will email you a secure code to set a new password.',
  emailLabel: 'Email Address',
  codeLabel: 'Reset Code',
  newPasswordLabel: 'New Password',
  confirmPasswordLabel: 'Confirm New Password',
  sendCodeLabel: 'SEND CODE',
  resendPrefix: "Didn't receive code?",
  resendAction: 'Resend',
  resendCountdownPrefix: 'Resend in',
  updatePasswordLabel: 'UPDATE PASSWORD',
  codeSentTo: 'Code sent to',
  codeSentMessage: 'Enter the 6-digit code we emailed you, then choose a new password.',
  backToLogin: 'Back to Login',
  useDifferentEmail: 'Use a different email',
  resendCooldownSeconds: 45,
  passwordHint: 'At least 8 characters, including 1 number and 1 symbol.',
  invalidCodeMessage: 'Invalid code. Please try again.',
  resetSuccessMessage: 'Password reset successful. Sign in with your new password.',
}

export const PIPELINE_ADMIN_LOGIN_COPY = {
  brand: {
    title: 'Strategy Pipeline',
    description:
      'Track competitive signals, diagnosis, solutions and shipped initiatives across the organization.',
    uptime: '99.9% Uptime',
    status: 'Platform Status: Optimal',
  },
  form: {
    title: 'Welcome Back',
    subtitle: 'Sign in to access the strategy pipeline panel.',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    submitLabel: 'LOGIN TO PIPELINE',
    footer: 'Secure login for pipeline staff — Powered by Systems',
  },
}

export const PIPELINE_ADMIN_SESSION_EXPIRED_COPY = {
  title: 'Session Expired',
  subtitle:
    'Your session expired for security. Please sign back in to continue.',
  buttonLabel: 'Login Again',
}