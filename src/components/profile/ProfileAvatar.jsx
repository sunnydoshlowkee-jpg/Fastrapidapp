import { Camera } from 'lucide-react'

export default function ProfileAvatar({
  avatarUrl,
  fallbackLetter,
  uploading = false,
  onPickPhoto,
  variant = 'mobile',
}) {
  const isDesktop = variant === 'desktop'

  if (isDesktop) {
    return (
      <div className="relative w-28 h-28 bg-[#2C3440] rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
        <button
          type="button"
          onClick={onPickPhoto}
          disabled={uploading}
          className="h-full w-full flex items-center justify-center disabled:opacity-70"
          aria-label="Upload profile photo"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-[#FCD34D]">{fallbackLetter}</span>
          )}
        </button>
        <button
          type="button"
          onClick={onPickPhoto}
          disabled={uploading}
          className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D2AEE] rounded-full flex items-center justify-center text-white border-[3px] border-white z-10 hover:bg-blue-700 transition-colors disabled:opacity-70"
          aria-label="Upload profile photo"
        >
          <Camera size={14} />
        </button>
      </div>
    )
  }

  return (
    <div className="relative w-24 h-24">
      <button
        type="button"
        onClick={onPickPhoto}
        disabled={uploading}
        className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#3B82F6] flex items-center justify-center disabled:opacity-70"
        aria-label="Upload profile photo"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-[#FEF38D]">{fallbackLetter}</span>
        )}
      </button>
      <button
        type="button"
        onClick={onPickPhoto}
        disabled={uploading}
        className="absolute bottom-0 right-0 w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm disabled:opacity-70"
        aria-label="Upload profile photo"
      >
        <Camera size={14} />
      </button>
    </div>
  )
}
