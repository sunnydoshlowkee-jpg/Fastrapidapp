import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { LocationProvider } from './context/LocationContext'
import { CartProvider } from './context/CartContext'
import './index.css'

const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <LocationProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </LocationProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)
