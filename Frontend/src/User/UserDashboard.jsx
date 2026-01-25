import { useState } from "react";

import UserBooking from "./UserBooking";
import UserOrders from "./UserOrders";
import UserProfile from "./UserProfile";
import Userpayment from "./Userpayment";



function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mt-4">
      <h2>User Dashboard 👤</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("booking")}
          >
            My Bookings
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "payments" ? "active" : ""}`}
            onClick={() => setActiveTab("payments")}
          >
            My Payments
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === "userprofile" && <UserProfile />}
      {activeTab === "userbooking" && <UserBooking />}
      {activeTab === "userorders" && <UserOrders />}
      {activeTab === "userpayment" && <Userpayment />}
    </div>
  );
}

export default UserDashboard;
