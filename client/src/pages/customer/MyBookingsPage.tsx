import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MyBookingsPage.css";


type Booking = {
  booking_id: number;
  venue_name: string;
  category: string;
  city: string;

  booking_date: string;
  start_time: string;
  end_time: string;

  total_amount: string;

  booking_status: string;
  payment_status: string;
};

function MyBookingsPage() {

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const response = await api.get("/bookings/my-bookings");

        setBookings(response.data.bookings);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, []);

  if (loading) {
    return <h2>Loading bookings...</h2>;
  }

  return (
  <div className="my-bookings-page">

    <div className="page-header">
      <h1>My Bookings</h1>
      <p>Manage all your venue bookings in one place.</p>
    </div>

    {bookings.length === 0 ? (

      <div className="empty-state">
        <h2>No Bookings Yet</h2>
        <p>
          You haven't booked any venues yet.
        </p>
      </div>

    ) : (

      <div className="bookings-list">

        {bookings.map((booking) => (

          <div
            key={booking.booking_id}
            className="booking-card"
          >

            <div className="booking-top">

              <div>

                <h2>{booking.venue_name}</h2>

                <p className="booking-category">
                  {booking.category.replace("_", " ")}
                </p>

              </div>

              <span
                className={`status ${booking.booking_status}`}
              >
                {booking.booking_status.replace("_", " ")}
              </span>

            </div>

            <div className="booking-details">

              <div>
                📅
                <strong>Date</strong>
                <span>{booking.booking_date}</span>
              </div>

              <div>
                🕒
                <strong>Time</strong>
                <span>
                  {booking.start_time} - {booking.end_time}
                </span>
              </div>

              <div>
                📍
                <strong>City</strong>
                <span>{booking.city}</span>
              </div>

              <div>
                💶
                <strong>Price</strong>
                <span>
                  € {Number(booking.total_amount).toLocaleString()}
                </span>
              </div>

            </div>

            <div className="booking-footer">

              <div>

                <small>Payment Status</small>

                <p
                  className={`payment ${booking.payment_status}`}
                >
                  {booking.payment_status}
                </p>

              </div>

              <div className="booking-buttons">

                <button className="details-btn">
                  View Details
                </button>

                {(booking.booking_status === "pending_payment" ||
                  booking.booking_status === "confirmed") && (

                  <button className="cancel-btn">
                    Cancel Booking
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}

export default MyBookingsPage;