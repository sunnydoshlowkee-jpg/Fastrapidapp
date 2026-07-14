import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'

const slides = [
  {
    title: 'Fast. Fresh. Reliable.',
    emoji: '🛍️',
    img: '/slide1-hero.png',
    description: 'The best delivery experience in Lagos, tailored just for you.',
    decorations: (
      <>
        <span className="absolute -top-4 -right-4 text-3xl">✨</span>
        <span className="absolute top-10 -left-6 text-2xl">🫧</span>
        <span className="absolute bottom-4 right-0 text-xl">🌟</span>
      </>
    )
  },
  {
    title: 'Order in seconds',
    emoji: '📱',
    img: '/slide2-hero.png',
    description: 'Experience fast checkout and secure payments with card or cash.',
    decorations: (
      <>
        <span className="absolute -top-6 -right-6 text-4xl">💳</span>
        <span className="absolute top-12 -left-8 text-3xl">💵</span>
        <span className="absolute bottom-2 right-4 text-2xl">✅</span>
      </>
    )
  },
  {
    title: 'Track your delivery live',
    emoji: '🛵',
    img: '/slide3-hero.png',
    description: 'Stay updated with real-time tracking from the kitchen to your doorstep.',
    decorations: (
      <>
        <span className="absolute -top-8 left-10 text-4xl">📍</span>
        <span className="absolute bottom-6 -right-4 text-2xl">💨</span>
      </>
    )
  },
  {
    title: 'Find vendors near you',
    emoji: '🗺️',
    img: '/slide4-hero.png',
    description: 'Browse the best restaurants and local shops in your neighborhood.',
    decorations: (
      <>
        <span className="absolute -top-4 -left-2 text-3xl">🍔</span>
        <span className="absolute top-8 -right-6 text-2xl">🛍️</span>
        <span className="absolute bottom-4 left-4 text-xl">📍</span>
      </>
    )
  }
]

export default function Slider() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/onboarding/welcome')
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const slide = slides[currentSlide]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8F9FA] md:bg-white">
      
      {/* Left Panel (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-[#FEFDFD] relative flex-col items-center justify-center overflow-hidden border-r border-gray-100">
        {/* Brand Logo */}
        <div className="absolute top-10 left-12 z-20">
          <Logo variant="blue" height={36} />
        </div>

        {/* Hero Image */}
        <div className="absolute inset-0 z-10 w-full h-full flex justify-center items-center p-12">
          {slide.img ? (
            <img src={slide.img} alt={slide.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="relative inline-block">
              <span className="text-[200px] animate-[bounce_3s_ease-in-out_infinite] block drop-shadow-2xl">
                {slide.emoji}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel (Mobile & Desktop) */}
      <div className="w-full md:w-1/2 flex flex-col items-center px-6 md:px-16 lg:px-28 pb-10 pt-14 md:justify-center">
        
        {/* Top action (Skip) */}
        <div className="w-full flex justify-end mb-8 md:absolute md:top-10 md:right-12 md:w-auto">
          <Link to="/onboarding/welcome" className="text-[#4342FF] font-semibold text-[15px] hover:text-indigo-800 transition-colors">
            Skip
          </Link>
        </div>

        {/* Mobile Card or Image (Hidden on Desktop) */}
        <div className="w-full max-w-md mx-auto md:hidden">
          {slide.img ? (
            <div className="w-full flex justify-center mb-10">
              <img src={slide.img} alt={slide.title} className="w-full h-auto object-contain" />
            </div>
          ) : (
            <div className="w-full bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 pt-10 flex flex-col items-center justify-center min-h-[360px] mb-10 relative overflow-hidden">
              <h1 className="text-[22px] font-bold text-[#2D2AEE] mb-8 text-center px-2 leading-tight">
                {slide.title}
              </h1>
              <div className="relative inline-block" key={currentSlide}>
                <span className="text-9xl animate-[bounce_3s_ease-in-out_infinite] block">
                  {slide.emoji}
                </span>
                {slide.decorations}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Title (Shown on Mobile if no image card) */}
        <div className={`w-full max-w-lg mx-auto flex flex-col items-center md:items-start ${!slide.img && 'hidden md:flex'}`}>
          <h1 className="text-[28px] md:text-[52px] font-extrabold text-[#111827] mb-4 md:mb-6 text-center md:text-left leading-[1.1] tracking-tight">
            {slide.title}
          </h1>
          <p className="text-[#4B5563] text-center md:text-left text-[16px] md:text-[20px] leading-relaxed mb-10 md:mb-14">
            {slide.description}
          </p>

          {/* Dots */}
          <div className="flex gap-2.5 justify-center md:justify-start mb-10 md:mb-14 w-full md:w-auto">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-10 bg-[#4342FF]' : 'w-3 bg-[#E5E7EB]'
                }`}
              />
            ))}
          </div>

          {/* Full-width Button */}
          <button
            onClick={handleNext}
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 md:py-5 rounded-xl font-bold text-[16px] md:text-[20px] transition-all shadow-lg shadow-indigo-500/30 active:scale-[0.98]"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
        
      </div>
    </div>
  )
}
