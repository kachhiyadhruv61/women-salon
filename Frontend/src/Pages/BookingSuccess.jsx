import { useLocation, useNavigate } from "react-router-dom";

function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data || !data.paymentVerified) {
  return (
    <div className="container mt-5 text-center">
      <h3 className="text-danger">
        Unauthorized Access 🚫
      </h3>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}
  return (
    <div className="container mt-5">
      <div className="card shadow p-4 text-center">
        <h2 className="text-success">🎉 Booking Confirmed!</h2>

        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Service:</strong> {data.service}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Time:</strong> {data.time}</p>
        <p><strong>Advance Paid:</strong> ₹{data.advanceAmount}</p>
        <p><strong>Remaining:</strong> ₹{data.remainingAmount}</p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/userbookings")}
        >
         my appointments
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;