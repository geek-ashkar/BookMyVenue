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

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(
          "/bookings/my-bookings"
        );

        setBookings(response.data.bookings ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  /* =========================
     Format Booking Date
  ========================= */

  const formatBookingDate = (
    dateString: string
  ) => {
    return new Date(dateString).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =========================
     Format Time
  ========================= */

  const formatTime = (
    timeString: string
  ) => {
    return timeString.slice(0, 5);
  };

  /* =========================
     Format Created Date
  ========================= */

  const formatCreatedDate = (
    dateString: string
  ) => {
    return new Date(dateString).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatCreatedTime = (
    dateString: string
  ) => {
    return new Date(dateString).toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /* =========================
     Format Category
  ========================= */

  const formatCategory = (
    category: string
  ) => {
    return category
      .replaceAll("_", " ")
      .replace(/\b\w/g, (character) =>
        character.toUpperCase()
      );
  };

  /* =========================
     Format Status
  ========================= */

  const formatStatus = (
    status: string
  ) => {
    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (character) =>
        character.toUpperCase()
      );
  };

  /* =========================
     Cancel Booking
  ========================= */

  const handleCancelBooking = async (
    bookingId: number
  ) => {
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
                payment_status: "refunded",
              }
            : booking
        )
      );

      if (
        selectedBooking?.booking_id ===
        bookingId
      ) {
        setSelectedBooking({
          ...selectedBooking,
          booking_status: "cancelled",
          payment_status: "refunded",
        });
      }
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to cancel booking."
      );
    }
  };

  if (loading) {
    return (
      <div className="bookings-loading">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="my-bookings-page">

      {/* Back Button */}

      <button
        className="back-dashboard-btn"
        onClick={() =>
          navigate("/customer/dashboard")
        }
      >
        ← Back to Dashboard
      </button>

      {/* Page Header */}

      <div className="bookings-page-header">
        <h1>My Bookings</h1>

        <p>
          Manage all your venue bookings in one
          place.
        </p>
      </div>

      {/* Empty */}

      {bookings.length === 0 ? (
        <div className="bookings-empty-state">
          <div className="empty-icon">
            📅
          </div>

          <h2>No Bookings Yet</h2>

          <p>
            You haven't booked any venues yet.
          </p>

          <button
            onClick={() =>
              navigate("/venues")
            }
          >
            Browse Venues
          </button>
        </div>
      ) : (
        <div className="bookings-list">

          {bookings.map((booking) => (

            <article
              key={booking.booking_id}
              className="customer-booking-card"
            >

              {/* Top */}

              <div className="booking-top">

                <div className="booking-title-section">

                  <h2>
                    {booking.venue_name}
                  </h2>

                  <p className="booking-category">
                    {formatCategory(
                      booking.category
                    )}
                  </p>

                  <p className="booked-on">
                    Booked on{" "}
                    {formatCreatedDate(
                      booking.created_at
                    )}
                    {" • "}
                    {formatCreatedTime(
                      booking.created_at
                    )}
                  </p>

                </div>

                <span
                  className={`booking-status booking-status--${booking.booking_status}`}
                >
                  {formatStatus(
                    booking.booking_status
                  )}
                </span>

              </div>

              {/* Booking Details */}

              <div className="booking-details-grid">

                <div className="booking-detail-box">

                  <div className="detail-icon">
                    📅
                  </div>

                  <strong>
                    Event Date
                  </strong>

                  <span>
                    {formatBookingDate(
                      booking.booking_date
                    )}
                  </span>

                </div>

                <div className="booking-detail-box">

                  <div className="detail-icon">
                    🕒
                  </div>

                  <strong>
                    Time
                  </strong>

                  <span>
                    {formatTime(
                      booking.start_time
                    )}
                    {" - "}
                    {formatTime(
                      booking.end_time
                    )}
                  </span>

                </div>

                <div className="booking-detail-box">

                  <div className="detail-icon">
                    📍
                  </div>

                  <strong>
                    City
                  </strong>

                  <span>
                    {booking.city}
                  </span>

                </div>

                <div className="booking-detail-box">

                  <div className="detail-icon">
                    💶
                  </div>

                  <strong>
                    Price
                  </strong>

                  <span>
                    €
                    {Number(
                      booking.total_amount
                    ).toLocaleString()}
                  </span>

                </div>

              </div>

              {/* Footer */}

              <div className="booking-footer">

                <div className="payment-section">

                  <small>
                    Payment Status
                  </small>

                  <p
                    className={`payment-status payment-status--${booking.payment_status}`}
                  >
                    {formatStatus(
                      booking.payment_status
                    )}
                  </p>

                </div>

                <div className="booking-buttons">

                  <button
                    className="details-btn"
                    onClick={() =>
                      setSelectedBooking(
                        booking
                      )
                    }
                  >
                    View Details
                  </button>

                  {(booking.booking_status ===
                    "pending_payment" ||
                    booking.booking_status ===
                      "confirmed") && (

                    <button
                      className="cancel-btn"
                      onClick={() =>
                        handleCancelBooking(
                          booking.booking_id
                        )
                      }
                    >
                      Cancel Booking
                    </button>

                  )}

                </div>

              </div>

            </article>

          ))}

        </div>
      )}

      {/* Booking Details Modal */}

      {selectedBooking && (

        <div
          className="booking-modal-overlay"
          onClick={() =>
            setSelectedBooking(null)
          }
        >

          <div
            className="booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>
                  Booking Details
                </h2>

                <p>
                  Booking #
                  {selectedBooking.booking_id}
                </p>
              </div>

              <button
                className="modal-x-btn"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                ×
              </button>

            </div>

            <div className="modal-content">

              <div className="modal-row">

                <span>
                  Venue
                </span>

                <strong>
                  {
                    selectedBooking.venue_name
                  }
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  Category
                </span>

                <strong>
                  {formatCategory(
                    selectedBooking.category
                  )}
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  City
                </span>

                <strong>
                  {selectedBooking.city}
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  Event Date
                </span>

                <strong>
                  {formatBookingDate(
                    selectedBooking.booking_date
                  )}
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  Time
                </span>

                <strong>
                  {formatTime(
                    selectedBooking.start_time
                  )}
                  {" - "}
                  {formatTime(
                    selectedBooking.end_time
                  )}
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  Booked On
                </span>

                <strong>
                  {formatCreatedDate(
                    selectedBooking.created_at
                  )}
                  {" • "}
                  {formatCreatedTime(
                    selectedBooking.created_at
                  )}
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  Total Amount
                </span>

                <strong>
                  €
                  {Number(
                    selectedBooking.total_amount
                  ).toLocaleString()}
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  Booking Status
                </span>

                <strong>
                  {formatStatus(
                    selectedBooking.booking_status
                  )}
                </strong>

              </div>

              <div className="modal-row">

                <span>
                  Payment Status
                </span>

                <strong>
                  {formatStatus(
                    selectedBooking.payment_status
                  )}
                </strong>

              </div>

            </div>

            <button
              className="close-modal-btn"
              onClick={() =>
                setSelectedBooking(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default MyBookingsPage;