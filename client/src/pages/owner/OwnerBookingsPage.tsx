import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./OwnerBookingsPage.css";

type Booking = {
  booking_id: number;
  customer_name: string;
  customer_email: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_amount: string;
  payment_status: string;
  booking_status: string;
};

function OwnerBookingsPage() {
  const { venueId } = useParams();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/bookings/owner/${venueId}`);

        setBookings(response.data.bookings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [venueId]);

  const formatTime = (time: string) => time.substring(0, 5);

  if (loading) {
    return <h2>Loading bookings...</h2>;
  }

  return (
    <div className="owner-bookings-container">

      <h1>Venue Bookings</h1>

      <p className="booking-count">
        Total Bookings: <strong>{bookings.length}</strong>
      </p>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          No bookings found for this venue.
        </div>
      ) : (

        <table className="bookings-table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking.booking_id}>

                <td>{booking.customer_name}</td>

                <td>{booking.customer_email}</td>

                <td>
                  {new Date(
                    booking.booking_date
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td>
                  {formatTime(booking.start_time)} -{" "}
                  {formatTime(booking.end_time)}
                </td>

                <td className="amount">
                  €
                  {Number(
                    booking.total_amount
                  ).toLocaleString()}
                </td>

                <td>
                  <span
                    className={`badge payment-${booking.payment_status}`}
                  >
                    {booking.payment_status}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge booking-${booking.booking_status}`}
                  >
                    {booking.booking_status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}
    </div>
  );
}

export default OwnerBookingsPage;