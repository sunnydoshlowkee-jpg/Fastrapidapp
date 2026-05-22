/**
 * Desktop login [330:2109](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-2109),
 * error state [362:3567](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-3567),
 * 2FA [330:1938](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-1938),
 * forgot password [330:2213](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-2213),
 * reset password [330:2005](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-2005),
 * reset success [330:2188](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-2188).
 */
export const ADMIN_LOGIN_PATH = '/admin/login'
export const ADMIN_VERIFY_2FA_PATH = '/admin/verify-2fa'
export const ADMIN_FORGOT_PASSWORD_PATH = '/admin/forgot-password'
export const ADMIN_RESET_PASSWORD_PATH = '/admin/forgot-password/reset'
export const ADMIN_RESET_SUCCESS_PATH = '/admin/forgot-password/success'

export const ADMIN_2FA_OTP = '123456'
export const ADMIN_RESET_OTP = '123456'

export const ADMIN_DUMMY_CREDENTIALS = {
  email: 'admin@kaabo.system',
  password: 'admin123',
}

export const ADMIN_DUMMY_USER = {
  id: 'admin-1',
  name: 'Kaabo Admin',
  email: ADMIN_DUMMY_CREDENTIALS.email,
  role: 'admin',
  token: 'rapid-admin-demo-token',
}

export const ADMIN_LOGIN_COPY = {
  brand: {
    title: 'Command Center',
    description:
      'The centralized hub for orchestrating logistics, managing operations, and overseeing the Kinetic network.',
    uptime: '99.9% Uptime',
    status: 'Platform Status: Optimal',
  },
  form: {
    title: 'Welcome Back',
    subtitle: 'Sign in to access the administrative dashboard.',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot Password?',
    submitLabel: 'LOGIN TO COMMAND CENTER',
    authErrorTitle: 'Authentication Failed',
    authErrorMessage: 'Invalid email or password. Please try again.',
    footer: 'Secure login for Rapid administrators — Powered by Systems',
  },
}

export const ADMIN_FORGOT_PASSWORD_COPY = {
  title: 'Reset your password',
  description:
    "Enter the email address associated with your account and we'll send you a secure link to reset your password.",
  emailLabel: 'Email Address',
  emailPlaceholder: 'curator@kinetic.admin',
  submitLabel: 'Send Reset Link',
  backToLogin: 'Back to Login',
  successMessage: 'If an account exists for that email, a reset link has been sent.',
}

export const ADMIN_RESET_SUCCESS_COPY = {
  title: 'Password reset successfully',
  subtitle: 'Taking you back to login...',
  buttonLabel: 'Go to Login',
  redirectDelayMs: 3000,
}

export const ADMIN_RESET_PASSWORD_COPY = {
  title: 'Reset Password',
  description:
    'Enter the 6-digit verification code sent to your email, then choose a new secure password.',
  codeLabel: 'Verification Code',
  resendPrefix: "Didn't receive a code?",
  resendAction: 'Resend Code',
  newPasswordLabel: 'New Password',
  confirmPasswordLabel: 'Confirm Password',
  confirmPlaceholder: 'Confirm new password',
  passwordHint: '8+ characters, 1 number, 1 symbol',
  submitLabel: 'Reset Password',
  backToLogin: 'Back to Login',
}

export const ADMIN_2FA_COPY = {
  title: 'Enter your 2FA code',
  subtitle: 'Sent to your authenticator app',
  verifyLabel: 'VERIFY',
  resendPrefix: "Didn't receive code?",
  resendAction: 'Resend',
  resendCountdownPrefix: 'Resend in',
  backToLogin: 'Back to Login',
  resendCooldownSeconds: 45,
  invalidCodeMessage: 'Invalid code. Please try again.',
}
