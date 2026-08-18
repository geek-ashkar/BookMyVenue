import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import "./PaymentPage.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  if (!booking) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No booking found.
      </h2>
    );
  }

  const handlePayment = async () => {
  try {

    const response = await api.patch(
      `/bookings/${booking.id}/pay`,
      {
        booking_id: booking.id,
      }
    );

    alert(response.data.message);

    navigate("/booking-success", {
      state: {
        booking: response.data.booking,
        payment: response.data.payment,
      },
    });

  } catch (error: any) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Payment failed."
    );

  }
  };

  return (
    <div className="payment-page">

      <div className="payment-card">

        <h1>Complete Payment</h1>

        <p className="payment-subtitle">
          Choose a payment method to confirm your booking.
        </p>

        <div className="payment-summary">

          <div className="summary-row">
            <span>Booking ID</span>
            <strong>#{booking.id}</strong>
          </div>

          <div className="summary-row">
            <span>Booking Date</span>
            <strong>{booking.booking_date}</strong>
          </div>

          <div className="summary-row">
            <span>Time</span>
            <strong>
              {booking.start_time} - {booking.end_time}
            </strong>
          </div>

        </div>

        <h3>Payment Method</h3>

        <div className="payment-methods">

          <label>
            <input
              type="radio"
              value="credit_card"
              checked={paymentMethod === "credit_card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Credit Card
          </label>

          <label>
            <input
              type="radio"
              value="debit_card"
              checked={paymentMethod === "debit_card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Debit Card
          </label>

          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            📱 UPI
          </label>

          <label>
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            🅿️ PayPal
          </label>

          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💵 Cash
          </label>

        </div>

        <div className="payment-total">

          <span>Total Amount</span>

          <h2>
            € {Number(booking.total_amount).toLocaleString()}
          </h2>

        </div>

        <button className="pay-btn"
          onClick={handlePayment}>
          Pay Now
        </button>

      </div>

    </div>
  );
}

export default PaymentPage;