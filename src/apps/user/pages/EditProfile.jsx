import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle2 } from 'lucide-react'
import { useStore } from '../../../store/useStore'

export default function EditProfile() {
  const navigate = useNavigate()
  const { user, updateUser } = useStore()
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    updateUser(formData)
    navigate(-1)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-32 relative">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center w-full gap-3">
        <button onClick={() => navigate(-1)} className="text-[#1A1AF5] w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      <div className="px-4 lg:px-8 max-w-4xl mx-auto w-full flex-1 lg:pt-12">
        
        {/* Desktop Header */}
        <div className="hidden lg:block mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h1>
          <p className="text-gray-500 text-sm max-w-lg">
            Update your photo and personal details here. Changes will be reflected across all RAPID services.
          </p>
        </div>

        <div className="bg-transparent lg:bg-white lg:rounded-[2.5rem] lg:p-12 lg:shadow-sm">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="relative mb-3">
              <img src={user.avatar} alt="Avatar" className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white lg:border-gray-50 object-cover shadow-sm bg-gray-100" />
              <button className="absolute bottom-0 right-0 lg:-right-2 w-8 h-8 lg:w-10 lg:h-10 bg-[#3B3BFF] rounded-full flex items-center justify-center border-2 border-white lg:border-none text-white hover:bg-blue-700 transition-colors shadow-sm">
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center hidden lg:block">
              <h3 className="font-bold text-gray-900">Update Avatar</h3>
              <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size 2MB</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100/80 lg:bg-gray-50 border-none rounded-xl px-4 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100/80 lg:bg-gray-50 border-none rounded-xl px-4 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-100/80 lg:bg-gray-50 border-none rounded-xl pl-4 pr-32 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:outline-none transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-md text-xs font-bold tracking-wider">
                    <CheckCircle2 size={14} className="fill-green-600 text-white" />
                    VERIFIED
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Bio (Desktop Only / Optional for mobile) */}
            <div className="hidden lg:block">
              <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Professional Bio</label>
              <textarea 
                rows="3"
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:outline-none transition-all resize-none"
                defaultValue="Passionate about efficient marketplaces and streamlined logistics. Currently scaling operations at RAPID Lagos."
              ></textarea>
            </div>

            {/* Account Security Info (Mobile Only) */}
            <div className="lg:hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mt-2">
              <h3 className="font-bold text-gray-900 mb-2">Account Security</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your phone number is verified. Changes to your primary email address will require a one-time verification code for your security.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className="fixed bottom-0 left-0 lg:left-[280px] lg:w-[calc(100%-280px)] w-full bg-white lg:border-t-2 lg:border-red-600 p-4 lg:py-4 lg:px-8 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:shadow-none flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="hidden lg:flex items-center gap-2 text-gray-400 text-xs font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Last edited 3 days ago
        </div>
        <div className="flex w-full lg:w-auto items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="hidden lg:block bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 px-8 rounded-xl transition-colors"
          >
            Discard
          </button>
          <button 
            onClick={handleSave}
            className="w-full lg:w-auto bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-3.5 lg:px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-colors flex items-center justify-center gap-2"
          >
            Save Changes
            <CheckCircle2 size={18} className="hidden lg:block" />
          </button>
        </div>
      </div>

    </div>
  )
}
