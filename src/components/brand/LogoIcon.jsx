export default function LogoIcon({ size = 40, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 4H26C31.523 4 36 8.477 36 14C36 19.523 31.523 24 26 24H6V4Z"
        stroke={color} strokeWidth="5" strokeLinejoin="round"
      />
      <line x1="6" y1="4" x2="6" y2="48" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <line x1="6" y1="24" x2="36" y2="48" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <line x1="14" y1="24" x2="44" y2="48" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
