import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, LocateFixed } from 'lucide-react'
import CenteredLayout from '../../../../components/layout/CenteredLayout'
import { useLocation } from '../../../../context/LocationContext'
import { LOCATION_AREAS } from '../../../../utils/geo'

export default function Location() {
  const { setUserLocation, detectCurrentLocation, detecting, display } = useLocation()
  const [address, setAddress] = useState('12 Victoria Island, Lagos')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const handleContinue = async () => {
    setSaving(true)
    const match = LOCATION_AREAS.find((a) =>
      address.toLowerCase().includes(a.location_label.toLowerCase()),
    )

    if (match) {
      await setUserLocation({ ...match, state: 'Lagos', country_code: 'NG' })
    } else {
      await setUserLocation({
        ...LOCATION_AREAS[1],
        location_label: address.split(',')[0]?.trim() || address,
        state: 'Lagos',
        country_code: 'NG',
      })
    }

    setSaving(false)
    navigate('/onboarding/phone')
  }

  const handleUseCurrent = async () => {
    const result = await detectCurrentLocation()
    if (result?.location_label) {
      setAddress(result.display || address)
    }
  }

  return (
    <CenteredLayout 
      showBackButton={true} 
      backTo="/onboarding/account-type"
    >
      <div className="flex-1 flex flex-col md:items-center pt-2 pb-6 md:bg-white md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border md:border-gray-100 md:rounded-3xl md:p-12 md:flex-none">
        
        {/* Top Icon */}
        <div className="flex mb-8 md:mb-10">
          <div className="relative">
            {/* Huge orange map pin placeholder */}
            <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-20 md:h-20">
              <path d="M50 8C33.4 8 20 21.4 20 38C20 60.5 50 92 50 92C50 92 80 60.5 80 38C80 21.4 66.6 8 50 8ZM50 46C45.6 46 42 42.4 42 38C42 33.6 45.6 30 50 30C54.4 30 58 33.6 58 38C58 42.4 54.4 46 50 46Z" fill="#FF6B00"/>
              <path d="M25 75L15 90H85L75 75H25Z" fill="#FF6B00" opacity="0.2"/>
              <path d="M28 78L20 90H80L72 78H28Z" stroke="#FF6B00" strokeWidth="6" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-2 md:mb-4 tracking-tight md:text-center">Where should we deliver?</h1>
        <p className="text-[#6B7280] text-[16px] md:text-[18px] mb-8 md:mb-10 md:text-center">
          We'll find the best vendors near you.
        </p>

        {/* Address Input */}
        <div className="w-full flex items-center justify-between bg-[#F3F4F6] rounded-2xl p-5 md:p-6 mb-4 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-transparent text-[#111827] outline-none text-[16px] md:text-[18px] font-medium w-full"
          />
          <Pencil size={18} className="text-[#4342FF] flex-shrink-0 ml-2 cursor-pointer md:w-5 md:h-5" />
        </div>

        <button
          type="button"
          onClick={handleUseCurrent}
          disabled={detecting}
          className="flex items-center gap-2 text-[#4342FF] font-bold md:text-[16px] mb-2 hover:underline w-fit disabled:opacity-60"
        >
          <LocateFixed size={18} className="md:w-5 md:h-5" />
          {detecting ? 'Detecting…' : 'Use my current location'}
        </button>
        {display && (
          <p className="text-sm text-gray-500 mb-6 md:mb-8">Selected: <span className="font-semibold text-gray-800">{display}</span></p>
        )}

        {/* Map Preview Area */}
        <div className="flex-1 w-full bg-[#E5E7EB] rounded-3xl overflow-hidden relative mb-8 md:mb-10 min-h-[220px] md:min-h-[280px] shadow-inner">
          {/* Simulated Map lines */}
          <div className="absolute inset-0 opacity-40"
               style={{ backgroundImage: 'linear-gradient(to right, #ffffff 2px, transparent 2px), linear-gradient(to bottom, #ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          {/* Abstract map paths */}
          <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,20 Q30,40 50,20 T100,50 M0,60 Q40,80 60,40 T100,80 M20,0 L40,100 M70,0 L80,100" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          {/* Center Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-[#4342FF]/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-5 h-5 bg-[#4342FF] border-4 border-white rounded-full shadow-lg" />
            </div>
          </div>
        </div>

        <div className="w-full mt-auto md:mt-0">
          <button 
            onClick={handleContinue}
            disabled={saving}
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 rounded-xl font-bold text-[16px] md:text-[18px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-6 md:mb-6 mt-auto md:mt-0 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Continue'}
          </button>

          <p className="text-center text-[12px] md:text-[13px] text-[#9CA3AF] px-4 md:px-0">
            By continuing, you agree to our{' '}
            <a href="/legal/terms.html" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] underline decoration-gray-300 cursor-pointer hover:text-[#111827]">Terms of Service</a>
            {' '}and{' '}
            <a href="/legal/privacy.html" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] underline decoration-gray-300 cursor-pointer hover:text-[#111827]">Privacy Policy</a>
            .
          </p>
        </div>

      </div>
    </CenteredLayout>
  )
}
