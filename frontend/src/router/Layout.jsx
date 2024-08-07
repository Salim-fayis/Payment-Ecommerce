import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../pages/signin-signout/Login'
import ForgotPassword from '../pages/signin-signout/ForgotPassword'
import SignUp from '../pages/signin-signout/SignUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import OrderPage from '../pages/OrderPage'
import AllOrder from '../pages/AllOrder'



const Layout = () => {
    return (
        <>

            <ToastContainer position='top-center' />
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="pt-16 min-h-[calc(100vh-120px)]">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/product-category" element={<CategoryProduct />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/success" element={<Success />} />
                            <Route path="/cancel" element={<Cancel />} />
                            <Route path="/search" element={<SearchProduct />} />
                            <Route path="/order" element={<OrderPage />} />
                            <Route path="/admin-panel" element={<AdminPanel />}>
                                <Route path="all-users" element={<AllUsers />} />
                                <Route path="all-products" element={<AllProducts />} /> 
                                <Route path="all-order" element={<AllOrder />} /> 
                                </Route> 
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>

        </>
    )
}

export default Layout
