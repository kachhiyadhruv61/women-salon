import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Public Pages */
import Home from "./Pages/Home";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Team from "./Pages/Team";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

/* Headers & Footer */
import Header from "./Components/Header";
import Footer from "./Components/Footer";

/* Admin */
import AdminHeader from "./Admin/AdminHeader";
import Dashboard from "./Admin/Dashboard";
import Adminservice from "./Admin/Adminservice";
import AdBooking from "./Admin/AdBooking";
import Adpayment from "./Admin/Adpayment";
import Staff from "./Admin/Staff";
import Product from "./Admin/Product";
import Reports from "./Admin/Reports";
import Settings from "./Admin/Settings";
import User from "./Admin/User";
import Profile from "./Admin/Profile";
import Orders from "./Admin/Orders";

/* User */
import UserHeader from "./User/UserHeader";
import UserDashboard from "./User/UserDashboard";
import UserProfile from "./User/UserProfile";
import UserOrders from "./User/UserOrders";
import Userpayment from "./User/Userpayment";
import UserBooking from "./User/UserBooking";

function App() {
  const [role, setRole] = useState("guest");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* ===== HEADER (ONLY ONE) ===== */}
      {role === "admin" && <AdminHeader setRole={setRole} />}
      {role === "user" && <UserHeader setRole={setRole} />}
      {role === "guest" && <Header />}

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/team" element={<Team />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setRole={setRole} />} />

        {/* ===== ADMIN ROUTES (PROTECTED) ===== */}
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
          path="/orders"
          element={role === "admin" ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/product"
          element={role === "admin" ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={role === "admin" ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={role === "admin" ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={role === "admin" ? <Profile /> : <Navigate to="/login" />}
        />

        {/* ===== USER ROUTES (PROTECTED) ===== */}
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
          path="/userpayment"
          element={role === "user" ? <Userpayment /> : <Navigate to="/login" />}
        />

        {/* ===== INVALID URL ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
