import { Routes, Route, Navigate } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Home from '../apps/user/pages/Home'
import Search from '../apps/user/pages/Search'
import Promotions from '../apps/user/pages/Promotions'
import Orders from '../apps/user/pages/Orders'
import Profile from '../apps/user/pages/Profile'
import Wallet from '../apps/user/pages/Wallet'
import Vendors from '../apps/user/pages/Vendors'
import Categories from '../apps/user/pages/Categories'
import VendorDetail from '../apps/user/pages/VendorDetail'
import ItemDetail from '../apps/user/pages/ItemDetail'
import CartDetail from '../apps/user/pages/CartDetail'
import Payment from '../apps/user/pages/Payment'
import OrderSuccess from '../apps/user/pages/OrderSuccess'
import TrackOrder from '../apps/user/pages/TrackOrder'
import OrderDetail from '../apps/user/pages/OrderDetail'
import OrderChat from '../apps/user/pages/OrderChat'
import EditProfile from '../apps/user/pages/EditProfile'
import Addresses from '../apps/user/pages/Addresses'
import PaymentMethods from '../apps/user/pages/PaymentMethods'
import ReferEarn from '../apps/user/pages/ReferEarn'
import Help from '../apps/user/pages/Help'
import PrivacySecurity from '../apps/user/pages/PrivacySecurity'
import LegalHub from '../apps/user/pages/LegalHub'
import SendMoney from '../apps/user/pages/SendMoney'
import ReceiveMoney from '../apps/user/pages/ReceiveMoney'
import FundWallet from '../apps/user/pages/FundWallet'
import PayBills from '../apps/user/pages/PayBills'
import WalletReceipt from '../apps/user/pages/WalletReceipt'
import WalletTransactions from '../apps/user/pages/WalletTransactions'
import KycVerification from '../apps/user/pages/KycVerification'
import Notifications from '../apps/user/pages/Notifications'
import WalletGate from '../components/kyc/WalletGate'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="vendors/:type" element={<Vendors />} />
        <Route path="vendor/:id" element={<VendorDetail />} />
        <Route path="item/:id" element={<ItemDetail />} />
        <Route path="cart" element={<CartDetail />} />
        <Route path="checkout" element={<Payment />} />
        <Route path="payment/crypto" element={<Navigate to="/app/checkout" replace />} />
        <Route path="order-success/:id" element={<OrderSuccess />} />
        <Route path="track/:id" element={<TrackOrder />} />
        <Route path="order/:id" element={<OrderDetail />} />
        <Route path="order/:id/chat" element={<OrderChat />} />
        <Route path="search" element={<Search />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="orders" element={<Orders />} />
        {/* Wallet Routes - gated by KYC verification */}
        <Route path="wallet" element={<WalletGate><Wallet /></WalletGate>} />
        <Route path="wallet/send" element={<WalletGate><SendMoney /></WalletGate>} />
        <Route path="wallet/receive" element={<WalletGate><ReceiveMoney /></WalletGate>} />
        <Route path="wallet/fund" element={<WalletGate><FundWallet /></WalletGate>} />
        <Route path="wallet/pay-bills" element={<WalletGate><PayBills /></WalletGate>} />
        <Route path="wallet/receipt/:id" element={<WalletGate><WalletReceipt /></WalletGate>} />
        <Route path="wallet/transactions" element={<WalletGate><WalletTransactions /></WalletGate>} />

        {/* KYC Routes */}
        <Route path="kyc/verify" element={<KycVerification />} />

        {/* Profile Routes */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="profile/addresses" element={<Addresses />} />
        <Route path="profile/payment-methods" element={<PaymentMethods />} />
        <Route path="profile/refer-earn" element={<ReferEarn />} />
        <Route path="profile/help" element={<Help />} />
        <Route path="profile/privacy-security" element={<PrivacySecurity />} />
        <Route path="legal" element={<LegalHub />} />
        <Route path="legal/:doc" element={<LegalHub />} />
      </Route>
    </Routes>
  )
}
