import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // ✅ BOOKINGS
    const savedBookings =
      JSON.parse(localStorage.getItem("userBookings")) || [];
    setBookings(savedBookings);

    // ✅ USER NAME SAFE FETCH
    try {
      const userData = localStorage.getItem("user");

      if (userData && userData !== "undefined") {
        const user = JSON.parse(userData);

        if (user && user.name) {
          setUserName(user.name);
        }
      }
    } catch (error) {
      console.error("JSON Parse Error:", error);
      setUserName("User");
    }
  }, []);

  const upcomingBookings = bookings.filter(
    (b) => b.status === "Approved" || b.status === "Pending"
  );

  return (
    <div className="container py-4">
      {/* ✅ FIXED NAME */}
      <h2 className="mb-4">Welcome, {userName} 👋</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Total Bookings</h5>
            <h3>{bookings.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Upcoming</h5>
            <h3>{upcomingBookings.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Completed</h5>
            <h3>
              {bookings.filter((b) => b.status === "Completed").length}
            </h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Cancelled</h5>
            <h3>
              {bookings.filter((b) => b.status === "Cancelled").length}
            </h3>
          </div>
        </div>
      </div>

      {upcomingBookings.length > 0 && (
        <>
          <h4 className="mb-3">📅 Upcoming Appointment</h4>
          <div className="card p-3 mb-4 shadow-sm">
            <p>
              <strong>Service:</strong> {upcomingBookings[0].service}
            </p>
            <p>
              <strong>Date:</strong> {upcomingBookings[0].date}
            </p>
            <p>
              <strong>Location:</strong> {upcomingBookings[0].location}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="badge bg-warning text-dark">
                {upcomingBookings[0].status}
              </span>
            </p>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <Link to="/bookingform" className="btn btn-primary px-4 py-2">
          ➕ Book New Service
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;