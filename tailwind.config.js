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
          link: '#2419E9',
          ink: '#191C1D',
          body: '#454557',
          canvas: '#F8F9FB',
          surface: '#FFFFFF',
          'nav-active': '#EEF0FF',
          'sign-out': '#EEF0FF',
          'icon-tile': '#F3F4F6',
          input: '#F3F4F5',
          divider: '#EDEEEF',
          checkbox: '#C6C4DA',
          error: '#BA1A1A',
          warning: '#C47A3A',
          'warning-star': '#F59E0B',
          muted: '#6B7280',
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
        'merchant-cta': '0px 8px 24px 0px rgba(67, 66, 255, 0.28)',
      },
      backgroundImage: {
        'merchant-empty-panel':
          'radial-gradient(ellipse 85% 70% at 100% 0%, rgba(67, 66, 255, 0.09) 0%, transparent 58%), radial-gradient(ellipse 75% 60% at 0% 100%, rgba(255, 186, 168, 0.22) 0%, transparent 52%), linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}
