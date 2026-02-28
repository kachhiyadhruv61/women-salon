import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

/* ===== Public Pages ===== */
import Home from "./Pages/Home";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Team from "./Pages/Team";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";
import BookingForm from "./Pages/BookingForm";
import BookingSuccess from "./Pages/BookingSuccess";
import PaymentPage from "./Pages/PaymentPage";
import Login from "./Pages/Login";
import Gallery from "./Pages/Gallery";
import Servicedetails from "./Pages/Servicedetails";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import CartSummary from "./Pages/CartSummary";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/OrderSuccess";
import OrderTracking from "./Pages/OrderTracking";



/* ===== Headers & Footer ===== */
import Header from "./Components/Header";
import Footer from "./Components/Footer";

/* ===== Admin ===== */
import AdminHeader from "./Admin/AdminHeader";
import Dashboard from "./Admin/Dashboard";
import Adminservice from "./Admin/Adminservice";
import AddService from "./Admin/AddService";
import AdBooking from "./Admin/AdBooking";
import Adpayment from "./Admin/Adpayment";
import Staff from "./Admin/Staff";
import AddStaff from "./Admin/AddStaff";
import Product from "./Admin/Product";
import AddProduct from "./Admin/AddProduct";
import Reports from "./Admin/Reports";
import Settings from "./Admin/Settings";
import User from "./Admin/User";
import Profile from "./Admin/Profile";
import Orders from "./Admin/Orders";
import Contactdata from "./Admin/Contactdata";
import ReportView from "./Admin/ReportView";

/* ===== User ===== */
import UserHeader from "./User/UserHeader";
import UserDashboard from "./User/UserDashboard";
import UserProfile from "./User/UserProfile";
import UserOrders from "./User/UserOrders";
import Userpayment from "./User/Userpayment";
import UserBooking from "./User/UserBooking";
import UserShop from "./User/UserShop";
import UserService from "./User/UserService";
import UserAppoint from "./User/UserAppoint";
import Addresses from "./User/Addresses";

import StaffDashboard from "./Components/Staff/StaffDashboard";



/* 👇 Scroll to top logic INSIDE SAME FILE */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
function App() {
  const [role, setRole] = useState("guest");

  /* Load role from localStorage */
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* ===== HEADER (ALWAYS ONE) ===== */}
      {role === "admin" ? (
        <AdminHeader setRole={setRole} />
      ) : role === "user" ? (
        <UserHeader setRole={setRole} />
      ) : (
        <Header />
      )}
        <ScrollToTop /> {/* 👈 AA LINE IMPORTANT */}

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/:id" element={<Servicedetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookingform" element={<BookingForm />} />
        <Route path="/bookingsuccess" element={<BookingSuccess />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/gallery" element={<Gallery />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartsummary" element={<CartSummary />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/ordertracking" element={<OrderTracking />} />


        {/* ===== ADMIN ROUTES ===== */}
        <Route
          path="/dashboard"
          element={role === "admin" ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={role === "admin" ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/adminservice"
          element={role === "admin" ? <Adminservice /> : <Navigate to="/login" />}
        />
         <Route
          path="/addservice"
          element={role === "admin" ? <AddService /> : <Navigate to="/login" />}
        />
        <Route
          path="/adbooking"
          element={role === "admin" ? <AdBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/adpayment"
          element={role === "admin" ? <Adpayment /> : <Navigate to="/login" />}
        />
        <Route
          path="/staff"
          element={role === "admin" ? <Staff /> : <Navigate to="/login" />}
        />
        <Route
          path="/addstaff"
          element={role === "admin" ? <AddStaff /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={role === "admin" ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/product"
          element={role === "admin" ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/addproduct"
          element={role === "admin" ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/contactdata"
          element={role === "admin" ? <Contactdata /> : <Navigate to="/login" />}
        />

        <Route
          path="/reports"
          element={role === "admin" ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports/:id"
          element={role === "admin" ? <ReportView /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={role === "admin" ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={role === "admin" ? <Profile /> : <Navigate to="/login" />}
        />

        {/* ===== USER ROUTES ===== */}
        <Route
          path="/userdashboard"
          element={role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/userorders"
          element={role === "user" ? <UserOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/userprofile"
          element={role === "user" ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/userbooking"
          element={role === "user" ? <UserBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/usershop"
          element={role === "user" ? <UserShop /> : <Navigate to="/login" />}
        />
        <Route
          path="/userservice"
          element={role === "user" ? <UserService /> : <Navigate to="/login" />}
        />
        <Route
          path="/userpayment"
          element={role === "user" ? <Userpayment /> : <Navigate to="/login" />}
        />
        <Route
          path="/userappoint"
          element={role === "user" ? <UserAppoint /> : <Navigate to="/login" />}
        />
        <Route
          path="/addresses"
          element={role === "user" ? <Addresses /> : <Navigate to="/login" />}
        />
        <Route path="/staff/dashboard"element={<StaffDashboard />}/>
        {/* ===== INVALID ROUTE ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
{/* WhatsApp Button */}
<a
  href="https://wa.me/919998662408?text=Hello%20I%20want%20to%20inquire%20about%20your%20services"
  className="whatsapp-float"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="bi bi-whatsapp"></i>
</a>

<Footer />
    </BrowserRouter>
    
  );
}

export default App;
