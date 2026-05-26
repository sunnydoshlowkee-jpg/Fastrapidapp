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
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Top action */}
      <div className="w-full flex justify-end p-5 pt-12 md:p-8">
        <Link to="/onboarding/welcome" className="text-[#4F46E5] font-semibold text-sm">
          Skip
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full md:max-w-4xl md:flex-row md:gap-12 md:px-12 pb-12">
        
        {/* Desktop Left / Mobile Top Image */}
        <div className="w-full max-w-sm aspect-square bg-[#F8F9FA] rounded-[2rem] flex items-center justify-center p-8 mb-8 md:mb-0 md:flex-1 relative overflow-hidden">
          <div className="text-center transition-all duration-500 ease-in-out">
            {/* Title moved inside the card for slide 2,3,4 based on screenshot? 
                Wait, screenshot shows title inside the card for "Track your delivery live" and "Find vendors near you".
                Actually, let's keep it consistent, but looking at screenshots, the title is inside the grey box!
                Let's put the title above the emoji inside the image box if the screenshot has it.
                Ah, screenshot 1 (Fast.Fresh.Reliable) has the title above the image in the white card.
                Screenshot 2 (Order in seconds) has title at the bottom of the card.
                Screenshot 3 (Track your delivery live) has title at the top of the card.
                Screenshot 4 (Find vendors near you) has title at the top of the card.
                Let's just use a clean layout: title on top of the emoji, or outside.
                Actually, the first batch screenshot had it inside the white card box. 
                Let's just put it outside for all slides to keep the layout very clean, or inside the card like the screenshots.
            */}
            
            {/* 3D Illustration placeholder / Image */}
            <div className="relative inline-block mt-4 mb-4" key={currentSlide}>
              {slide.img ? (
                <img src={slide.img} alt={slide.title} className="w-[200px] h-[200px] object-contain animate-[bounce_2s_ease-in-out_infinite]" />
              ) : (
                <span className="text-9xl animate-[bounce_2s_ease-in-out_infinite] block">
                  {slide.emoji}
                </span>
              )}
              {slide.decorations}
            </div>
          </div>
        </div>

        {/* Text and Actions */}
        <div className="w-full max-w-sm flex flex-col items-center text-center md:flex-1 md:items-start md:text-left">
          
          <h1 className="text-2xl font-bold text-[#4F46E5] mb-4 md:mb-6">
            {slide.title}
          </h1>

          <p className="text-gray-600 text-base leading-relaxed px-4 md:px-0 mb-12">
            {slide.description}
          </p>

          <div className="w-full flex items-center justify-between mt-auto md:mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-6 bg-[#4F46E5]' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-[#4F46E5] text-white py-3.5 px-8 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
