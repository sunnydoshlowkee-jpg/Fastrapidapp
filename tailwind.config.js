/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rapid: {
          orange: '#FF5A1F',
          dark:   '#0F0F0F',
          surface: '#1A1A1A',
          muted:  '#6B7280',
        },
        merchant: {
          primary: '#4342FF',
          'primary-dark': '#3837e6',
          link: '#2419E9',
          ink: '#191C1D',
          'ink-slate': '#0F172A',
          body: '#454557',
          canvas: '#F8F9FA',
          surface: '#FFFFFF',
          'onboarding-sidebar': '#F1F4F6',
          'onboarding-panel': '#E2E9EC',
          'nav-active': 'rgba(67, 66, 255, 0.05)',
          'sign-out': '#DAE2FD',
          'icon-tile': '#E7E8E9',
          input: '#F3F4F5',
          divider: '#F1F5F9',
          'field-border': 'rgba(198, 196, 218, 0.2)',
          checkbox: '#C6C4DA',
          error: '#BA1A1A',
          warning: '#9D4300',
          'warning-star': '#FD761A',
          muted: '#767588',
          'mobile-muted': '#5F5E5E',
          'mobile-warning': '#F97316',
          'mobile-secondary': '#EDEEEF',
          'tip-purple': '#E1E0FF',
          'tip-orange': '#FFDBCA',
          'tip-orange-icon': '#A44600',
          'nav-muted': '#94A3B8',
          'header-muted': '#475569',
          placeholder: '#737C7F',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'merchant-stat': '12px',
        'merchant-panel': '24px',
      },
      boxShadow: {
        'merchant-card': '0px 10px 40px 0px rgba(25, 28, 29, 0.04)',
        'merchant-stat': '0px 1px 3px 0px rgba(25, 28, 29, 0.06), 0px 1px 2px 0px rgba(25, 28, 29, 0.04)',
        'merchant-panel': '0px 8px 40px 0px rgba(25, 28, 29, 0.04)',
        'merchant-btn': '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        'merchant-cta':
          '0px 20px 25px -5px rgba(36, 25, 233, 0.25), 0px 8px 10px -6px rgba(36, 25, 233, 0.25)',
        'merchant-step-active': '0px 0px 0px 4px rgba(62, 60, 251, 0.1)',
        'merchant-panel-card': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'merchant-choice-card': '0px 4px 20px -2px rgba(67, 66, 255, 0.04)',
      },
      backgroundImage: {
        'merchant-empty-panel':
          'radial-gradient(ellipse 85% 70% at 100% 0%, rgba(67, 66, 255, 0.09) 0%, transparent 58%), radial-gradient(ellipse 75% 60% at 0% 100%, rgba(255, 186, 168, 0.22) 0%, transparent 52%), linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}
