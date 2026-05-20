import { useState } from "react";
import BookingForm from "../Pages/BookingForm";
import "./UserBooking.css";

function UserBooking() {
  const [bookings, setBookings] = useState([]);

  const addBooking = (data) => {
    setBookings([
      ...bookings,
      {
        id: Date.now(),
        ...data, // status already coming from BookingForm
      },
    ]);
  };

  return (
    <div className="container py-5 user-booking-page">
      <BookingForm onBookingSubmit={addBooking} />
    </div>
  );
}

export default UserBooking;
