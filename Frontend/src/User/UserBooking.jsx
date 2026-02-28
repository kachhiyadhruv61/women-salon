import { useState } from "react";
import BookingForm from "../Pages/BookingForm";

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
    <div className="container py-5">
      <BookingForm onBookingSubmit={addBooking} />
    </div>
  );
}

export default UserBooking;
