import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  created_at: string;
};

function MyBookingsPage() {

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleCancelBooking = async (bookingId: number) => {

  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) {
    return;
  }

  try {

    const response = await api.patch(
      `/bookings/${bookingId}/cancel`
    );

    alert(response.data.message);

    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.booking_id === bookingId
          ? {
              ...booking,
              booking_status: "cancelled",
              payment_status: "cancelled",
            }
          : booking
      )
    );

  } catch (error: any) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to cancel booking."
    );
  }
};

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

                <h2><strong>{booking.venue_name}</strong></h2>

                <p className="booking-category">
                {booking.category.replace("_", " ")}
                </p>

                <p className="booked-on">
                Booked on{" "}
                {new Date(booking.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
                {" • "}
                {new Date(booking.created_at).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                })}
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
                <strong>Event Date</strong>
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

                  <button
                   className="cancel-btn"
                   onClick={() =>
                   handleCancelBooking(booking.booking_id)
                   }
                    >
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