import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] md:bg-gray-50/50">
      
      {/* Top action */}
      <div className="w-full flex justify-end p-6 pt-14 md:p-8 md:max-w-md md:mx-auto">
        <Link to="/onboarding/welcome" className="text-[#4F46E5] font-semibold text-[15px]">
          Skip
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-6 max-w-md mx-auto w-full pb-10">
        
        {/* Card or Image */}
        {slide.img ? (
          <div className="w-full flex justify-center mb-10">
            <img src={slide.img} alt={slide.title} className="w-full h-auto object-contain" />
          </div>
        ) : (
          <div className="w-full bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 pt-10 flex flex-col items-center justify-center min-h-[360px] mb-10 relative overflow-hidden">
            <h1 className="text-[22px] md:text-2xl font-bold text-[#2D2AEE] mb-8 text-center px-2 leading-tight">
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

        {/* Description */}
        <p className="text-[#4A5568] text-center text-[15px] leading-relaxed px-4 mb-10 min-h-[44px]">
          {slide.description}
        </p>

        {/* Dots */}
        <div className="flex gap-2 justify-center mb-10">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-[#4F46E5]' : 'w-2 bg-[#E2E8F0]'
              }`}
            />
          ))}
        </div>

        {/* Full-width Button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#4F46E5] hover:bg-indigo-700 text-white py-4 rounded-xl font-medium text-[16px] transition-all shadow-[0_8px_20px_rgba(79,70,229,0.2)] active:scale-[0.98]"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
        
      </div>
    </div>
  )
}
