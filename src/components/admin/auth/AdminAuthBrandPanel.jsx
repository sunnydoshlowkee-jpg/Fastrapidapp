import { Check, Cloud } from 'lucide-react'
import Logo from '../../brand/Logo'
import { ADMIN_LOGIN_COPY } from '../../../services/data/adminAuth.mock'

export default function AdminAuthBrandPanel() {
  const { brand } = ADMIN_LOGIN_COPY

  return (
    <aside className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FF6B2C] via-[#E85A1F] to-[#7A2E0F] px-8 py-10 text-white lg:min-h-screen lg:w-1/2 lg:px-12 lg:py-12 xl:px-16">
      <div>
        <Logo height={32} className="h-8 w-auto" />
        <h1 className="mt-10 text-3xl font-bold tracking-tight lg:text-4xl xl:text-[2.5rem] xl:leading-tight">
          {brand.title}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 lg:text-base">
          {brand.description}
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm lg:mt-0">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
          <Cloud size={22} strokeWidth={1.75} aria-hidden />
          <Check
            size={12}
            strokeWidth={2.5}
            className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white/20 p-0.5"
            aria-hidden
          />
        </span>
        <div>
          <p className="text-base font-bold">{brand.uptime}</p>
          <p className="mt-0.5 text-sm text-white/75">{brand.status}</p>
        </div>
      </div>
    </aside>
  )
}
