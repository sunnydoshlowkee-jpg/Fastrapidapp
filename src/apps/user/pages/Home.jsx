import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, ChevronDown, Heart, Plus, Star, ChevronRight, Search, ShoppingCart, Car, Utensils, ShoppingBasket, Package, Pill } from 'lucide-react'

// Mock Data (Shared/Mobile)
const mobileQuickReorder = [
  { id: 1, name: 'Burger King', img: '/burger.png' },
  { id: 2, name: 'Pizza Hut', img: '/pizza.png' },
  { id: 3, name: 'Bowl Hub', img: '/burger.png' },
  { id: 4, name: 'The Salad Bar', img: '/pizza.png' },
]

const restaurants = [
  { id: 1, name: 'Burger Shop Deluxe', tags: 'Burgers • American • Fast Food', rating: 4.8, distance: '900m', delivery: '₦500', img: '/burger.png', time: '15-25 min' },
  { id: 2, name: "Mama's Kitchen", tags: 'Nigerian • Local • Rice', rating: 4.8, distance: '900m', delivery: '₦800', img: '/pizza.png', time: '20-30 min' },
]

const groceryStores = [
  { id: 1, name: 'Fresh Market Reserve', tags: 'Organic • Fresh • Market', rating: 4.8, distance: '900m', delivery: '₦500', img: '/burger.png', time: '15-25 min' },
  { id: 2, name: "Mama's Kitchen", tags: 'Nigerian • Local • Rice', rating: 4.8, distance: '900m', delivery: '₦800', img: '/pizza.png', time: '20-30 min' },
]

const trendingFood = [
  { id: 1, name: 'KFC Mega Bucket', store: 'KFC - Sabo', price: '₦8,500', img: '/burger.png' },
  { id: 2, name: 'Large Fries & Dip', store: 'Burger King', price: '₦2,200', img: '/pizza.png' },
  { id: 3, name: 'Classic Pepperoni', store: "Domino's Pizza", price: '₦6,800', img: '/pizza.png' },
  { id: 4, name: 'Chocolate Sundae', store: 'Cold Stone', price: '₦3,500', img: '/burger.png' },
]

const trendingGrocery = [
  { id: 1, name: 'Avocados large', store: 'Produce', price: '₦8,500', img: '/pizza.png' },
  { id: 2, name: 'Organic milk', store: 'Dairy', price: '₦2,200', img: '/burger.png' },
  { id: 3, name: 'Sourdough Loaf', store: 'Bakery', price: '₦6,800', img: '/pizza.png' },
  { id: 4, name: 'Brown Eggs', store: 'Dairy & Eggs', price: '₦3,500', img: '/burger.png' },
]

// Mock Data (Desktop Only)
const desktopServices = [
  { name: 'Rides', icon: Car },
  { name: 'Food', icon: Utensils },
  { name: 'Grocery', icon: ShoppingBasket },
  { name: 'Package', icon: Package },
  { name: 'Health', icon: Pill },
]

const desktopQuickReorder = [
  { id: 1, name: 'Margherita\nPizza', img: '/pizza.png', color: 'ring-blue-500' },
  { id: 2, name: 'Cheeseburger\nMeal', img: '/burger.png', color: 'ring-yellow-500' },
  { id: 3, name: 'Greek\nBowl', img: '/pizza.png', color: 'ring-green-500' },
  { id: 4, name: 'Salmon\nSushi', img: '/pizza.png', color: 'ring-orange-500' },
  { id: 5, name: 'Grill\nMix', img: '/burger.png', color: 'ring-red-500' },
]

const desktopPopular = [
  { id: 1, name: 'The Lagos Bistro', tags: 'Continental • 20–30 mins', rating: 4.8, badge: 'TOP RATED', badgeColor: 'bg-blue-600', fee: 'Free Delivery', img: '/burger.png' },
  { id: 2, name: 'Pepper & Spice', tags: 'African Fusion • 15–25 mins', rating: 4.5, badge: null, fee: '₦1,200 del.', img: '/pizza.png' },
  { id: 3, name: 'Pizza Express', tags: 'Italian • 10–15 mins', rating: 4.2, badge: 'FASTEST', badgeColor: 'bg-red-600', fee: 'Free Delivery', img: '/pizza.png' },
  { id: 4, name: "Wok n' Roll", tags: 'Asian • 25–40 mins', rating: 4.7, badge: null, fee: '₦800 del.', img: '/burger.png' },
]

export default function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Food')
  const [bannerIndex, setBannerIndex] = useState(0)

  const trending = activeTab === 'Food' ? trendingFood : trendingGrocery
  const stores = activeTab === 'Food' ? restaurants : groceryStores

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      {/* Mobile Top Bar */}
      <div className="md:hidden px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100/50 p-2 rounded-xl transition-colors -ml-2">
          <MapPin size={18} className="text-[#4F46E5]" strokeWidth={2} />
          <span className="font-semibold text-gray-900 text-[14px]">Yaba, Lagos</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div 
          className="cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-full hover:shadow-sm transition-all"
          onClick={() => navigate('/app/wallet')}
        >
          <span className="font-bold text-[#4F46E5] text-[14px] flex items-center gap-2">
            ₦4,500
          </span>
        </div>
      </div>

      <div className="md:hidden flex-1 w-full max-w-md mx-auto px-5 pt-2 flex flex-col">
        {/* Mobile Hero Banner */}
        <div className="relative w-full h-[140px] rounded-2xl overflow-hidden mb-3">
          <div className={`absolute inset-0 ${activeTab === 'Food' ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1]' : 'bg-gradient-to-r from-[#10B981] to-[#34D399]'}`} />
          <div className="absolute inset-0 p-5 flex flex-col justify-center w-[65%]">
            <span className="hidden px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full w-max mb-3 backdrop-blur-sm">Limited Offer</span>
            <h2 className="text-white text-[17px] font-bold leading-snug mb-1">
              {activeTab === 'Food' ? '50% off your first grocery haul' : 'Fresh groceries, 50% off today'}
            </h2>
            <p className="text-white/80 text-[11px] font-medium mb-3">Fresh items delivered fast to your door</p>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-[12px] font-bold w-max flex items-center gap-1 hover:scale-105 transition-transform shadow-lg shadow-black/10">
              Order now <ChevronRight size={16} />
            </button>
          </div>
          <img 
            src={activeTab === 'Food' ? "/burger.png" : "/pizza.png"} 
            alt="Promo" 
            className="absolute -right-4 -bottom-4 w-36 h-36 object-cover opacity-80 drop-shadow-2xl" 
          />
        </div>

        {/* Mobile Carousel Dots */}
        <div className="flex justify-center gap-1.5 mb-5">
          {[0, 1, 2].map(i => (
            <div 
              key={i} 
              className={`rounded-full transition-all ${i === bannerIndex ? 'w-5 h-[6px] bg-[#4F46E5]' : 'w-[6px] h-[6px] bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Mobile: What do you need? */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-gray-900 mb-3">What do you need?</h3>
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveTab('Food')}
              className={`flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl transition-all duration-200 ${
                activeTab === 'Food' ? 'bg-[#4F46E5] h-[100px] shadow-lg shadow-indigo-200' : 'bg-[#F0F0F5] h-[85px]'
              }`}
            >
              <span className="text-[28px]">🍽️</span>
              <span className={`text-[12px] font-semibold ${activeTab === 'Food' ? 'text-white' : 'text-gray-700'}`}>Food</span>
            </div>
            <div 
              onClick={() => setActiveTab('Groceries')}
              className={`flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl transition-all duration-200 ${
                activeTab === 'Groceries' ? 'bg-[#4F46E5] h-[100px] shadow-lg shadow-indigo-200' : 'bg-[#F0F0F5] h-[85px]'
              }`}
            >
              <span className="text-[28px]">🧺</span>
              <span className={`text-[12px] font-semibold ${activeTab === 'Groceries' ? 'text-white' : 'text-gray-700'}`}>Groceries</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#F0F0F5] rounded-2xl h-[85px]">
              <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center">
                <Plus size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-semibold text-gray-700">more</span>
            </div>
          </div>
        </div>

        {/* Mobile: Active Order Tracker */}
        <div className="mb-7">
          <div className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer" onClick={() => navigate('/app/track/123')}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#F3F4F6] rounded-full flex items-center justify-center">
                <span className="text-[18px]">🛵</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[13px] leading-tight">On the way <span className="text-[#4F46E5]">• 8 mins</span></h3>
                <p className="text-[11px] text-gray-500 mt-0.5">KFC · Yaba Branch</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mobile: Stores / Restaurants */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-900">
              {activeTab === 'Food' ? 'Restaurants near you' : 'Grocery stores near you'}
            </h3>
            <span className="text-[12px] font-bold text-[#4F46E5] cursor-pointer hover:underline">See all</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {stores.map((store, i) => (
              <div key={store.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 cursor-pointer group flex-shrink-0 w-[190px] transition-shadow" onClick={() => navigate(`/app/vendor/${store.id}`)}>
                <div className="w-full h-[120px] bg-gray-100 overflow-hidden relative">
                  <img src={store.img} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-900 shadow-sm">{store.time}</div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-[#4F46E5] transition-colors shadow-sm">
                    <Heart size={14} className={i === 0 ? "fill-[#4F46E5]" : ""} />
                  </button>
                </div>
                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 text-[13px] truncate">{store.name}</h4>
                    <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 shrink-0">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" /> {store.rating}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium mb-3 truncate">{store.tags}</p>
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {store.distance}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Delivery: {store.delivery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Quick Reorder */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-gray-900 mb-3">Quick reorder</h3>
          <div className="flex gap-5 overflow-x-auto pb-2 hide-scrollbar">
            {mobileQuickReorder.map(brand => (
              <div key={brand.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
                <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#4F46E5] transition-colors">
                  <img src={brand.img} alt={brand.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-medium text-gray-600">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Trending Items */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-900">Trending Items</h3>
            <span className="text-[12px] font-bold text-[#4F46E5] cursor-pointer hover:underline">View Market</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {trending.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md border border-gray-100 flex flex-col group cursor-pointer transition-all hover:-translate-y-1">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-gray-50">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-[#4F46E5] shadow-sm">
                    <Heart size={14} />
                  </button>
                </div>
                <h4 className="font-bold text-gray-900 text-[13px] mb-0.5 truncate group-hover:text-[#4F46E5] transition-colors">{item.name}</h4>
                <p className="text-[10px] font-medium text-gray-400 mb-3 truncate">{item.store}</p>
                <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-50">
                  <span className="font-bold text-gray-900 text-[14px]">₦{item.price.replace('₦', '')}</span>
                  <button className="w-7 h-7 bg-[#4F46E5] hover:bg-indigo-700 rounded-full flex items-center justify-center text-white transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Desktop Top Bar */}
      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="flex-1 flex justify-center px-8">
          <div className="w-full max-w-2xl bg-gray-100/70 hover:bg-gray-100 rounded-xl px-5 py-3.5 flex items-center gap-3 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-500 border border-transparent">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for food, groceries, or essentials..." 
              className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <MapPin size={20} className="text-[#4F46E5]" strokeWidth={2} />
            <span className="font-semibold text-[#4F46E5] text-[15px]">Lagos, NG</span>
          </div>
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <ShoppingCart size={24} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">3</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col flex-1 w-full max-w-[1200px] mx-auto px-10 pt-10 pb-12">
        
        {/* Desktop Banner */}
        <div className="w-full bg-[#463F3A] rounded-[24px] overflow-hidden mb-12 relative h-[320px] flex items-center">
          <img src="/pizza.png" alt="Groceries background" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#463F3A] via-[#463F3A]/90 to-transparent" />
          
          <div className="relative z-10 px-14 py-10 w-[60%]">
            <span className="inline-block px-4 py-1.5 bg-red-600 text-white text-[12px] font-bold rounded-md tracking-wider mb-5">LIMITED OFFER</span>
            <h2 className="text-white text-[52px] font-bold leading-[1.1] mb-4">
              50% off your first grocery haul
            </h2>
            <p className="text-gray-200 text-[18px] mb-8 font-medium">
              Freshness delivered from the farm to your doorstep in 30 minutes.
            </p>
            <button className="bg-[#2D2AEE] hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-[15px] font-bold transition-all shadow-lg shadow-blue-900/30">
              Shop Groceries Now
            </button>
          </div>
        </div>

        {/* Desktop Services */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[22px] font-bold text-gray-900">Our Services</h3>
            <span className="text-[14px] font-bold text-[#2D2AEE] cursor-pointer hover:underline">See all &gt;</span>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {desktopServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="flex flex-col items-center gap-4 cursor-pointer group">
                  <div className="w-full aspect-[4/3] bg-white rounded-3xl border border-gray-100/50 shadow-sm shadow-gray-200/50 flex items-center justify-center group-hover:shadow-md group-hover:border-indigo-100 transition-all">
                    <Icon size={42} className="text-[#2D2AEE] group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-bold text-[15px] text-gray-900">{service.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Desktop Quick Reorder */}
        <div className="mb-14">
          <div className="mb-6">
            <h3 className="text-[22px] font-bold text-gray-900 mb-1">Quick reorder</h3>
            <p className="text-gray-500 text-[14px]">Based on your favorites</p>
          </div>
          <div className="flex gap-10">
            {desktopQuickReorder.map(item => (
              <div key={item.id} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className={`w-[85px] h-[85px] rounded-full p-1 ring-2 ${item.color} group-hover:scale-105 transition-transform bg-white`}>
                  <img src={item.img} alt={item.name.replace('\n', ' ')} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="font-bold text-[13px] text-gray-900 text-center leading-tight whitespace-pre-line">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Popular Near You */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[22px] font-bold text-gray-900 mb-1">Popular Near You</h3>
              <p className="text-gray-500 text-[14px]">Trending restaurants in Victoria Island</p>
            </div>
            <span className="text-[14px] font-bold text-[#2D2AEE] cursor-pointer hover:underline">View all vendors</span>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {desktopPopular.map(item => (
              <div key={item.id} className="flex flex-col cursor-pointer group">
                <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-4 relative shadow-sm">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Rating Top Right */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[12px] font-bold text-gray-900">{item.rating}</span>
                  </div>
                  {/* Badge Bottom Left */}
                  {item.badge && (
                    <div className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-lg ${item.badgeColor} shadow-sm`}>
                      <span className="text-[10px] font-bold text-white tracking-wide">{item.badge}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 text-[18px]">{item.name}</h4>
                  {item.fee === 'Free Delivery' ? (
                    <span className="px-2.5 py-1 bg-blue-50 text-[#2D2AEE] rounded text-[11px] font-bold whitespace-nowrap">Free Delivery</span>
                  ) : (
                    <span className="text-[13px] font-medium text-gray-400 whitespace-nowrap">{item.fee}</span>
                  )}
                </div>
                <p className="text-[13px] text-gray-500 font-medium">{item.tags}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}