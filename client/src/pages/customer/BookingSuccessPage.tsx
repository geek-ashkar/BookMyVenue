import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSuccessPage.css";

function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  const payment = location.state?.payment;

  if (!booking) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No booking information found.
      </h2>
    );
  }

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Booking Created Successfully</h1>

        <p className="success-message">
          Your booking request has been created successfully.
        </p>

        <div className="success-details">

          <div className="detail-row">
            <span>Booking ID</span>
            <strong>#{booking.id}</strong>
          </div>

          <div className="detail-row">
            <span>Booking Date</span>
            <strong>
              {new Date(booking.booking_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </strong>
          </div>

          <div className="detail-row">
            <span>Time</span>
            <strong>
              {booking.start_time} - {booking.end_time}
            </strong>
          </div>

          <div className="detail-row">
            <span>Booking Status</span>
            <strong>{booking.booking_status}</strong>
          </div>

          <div className="detail-row">
            <span>Payment Status</span>
            <strong>{payment?.payment_status}</strong>
          </div>

          <div className="detail-row">
            <span>Total Amount</span>
            <strong>€ {booking.total_amount}</strong>
          </div>

        </div>

        <button
          className="view-bookings-btn"
          onClick={() => navigate("/customer/my-bookings")}
        >
          View My Bookings
        </button>

      </div>

    </div>
  );
}

export default BookingSuccessPage;