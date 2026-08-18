import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CreateBookingPage.css";
import { useEffect } from "react";
import api from "../../services/api";

type Venue = {
  id: number;
  name: string;
  category: string;
  city: string;
  base_price: string;
};


function CreateBookingPage() {
  const { venueId } = useParams();

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState<Venue | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

    useEffect(() =>{

    const fetchVenue = async () => {
        try {
            const response = await api.get(`/venues/${venueId}`);
            setVenue(response.data.venue);
        } catch (error) {
            console.error(error);
        }
        };
        fetchVenue();
    }, [venueId]);

    const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingDate || !startTime || !endTime) {
        alert("Please fill all fields.");
        return;
    }

    if (startTime >= endTime) {
        alert("End time must be after start time.");
        return;
    }

    setShowSummary(true);
    };

    const handleConfirmBooking = async () => {
    try {

        const response = await api.post("/bookings", {
            venue_id: Number(venueId),
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
        });

        navigate(`/payment/${response.data.booking.id}`, {
        state: {
        booking: response.data.booking,
        payment: response.data.payment,
    },
});

    } catch (error: any) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to create booking."
        );
    }
 };



  return (
  <div className="booking-page">

    <div className="booking-card">

      <h1>Book Venue</h1>

      <p className="venue-id">
        Venue : <strong>{venue?.name}</strong>
      </p>

      <form onSubmit={handleContinue}>

        <div className="form-group">
          <label>Booking Date</label>

          <input
            type="date"
             min={today}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>

        <div className="time-row">

          <div className="form-group">
            <label>Start Time</label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>End Time</label>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

        </div>

        {!showSummary && (
          <>
            <p className="booking-note">
              Your booking will be confirmed after reviewing the details.
            </p>

            <button type="submit" className="continue-btn">
              Continue
            </button>
          </>
        )}

      </form>

      {showSummary && (

        <div className="booking-review">

          <h2>Booking Summary</h2>

          <div className="review-row">
            <span>🏛 Venue</span>
            <strong>{venue?.name}</strong>
          </div>

          <div className="review-row">
            <span>📂 Category</span>
            <strong>{venue?.category.replace("_", " ")}</strong>
          </div>

          <div className="review-row">
            <span>📍 City</span>
            <strong>{venue?.city}</strong>
          </div>

          <div className="review-row">
            <span>📅 Date</span>
            <strong>{bookingDate}</strong>
          </div>

          <div className="review-row">
            <span>🕒 Time</span>
            <strong>
              {startTime} - {endTime}
            </strong>
          </div>

          <div className="price-section">

            <p>Total Price</p>

            <h2>
              € {Number(venue?.base_price).toLocaleString()}
            </h2>

          </div>

          <div className="review-buttons">

            <button
              type="button"
              className="edit-btn"
              onClick={() => setShowSummary(false)}
            >
              Edit
            </button>

            <button
              type="button"
              className="confirm-btn"
              onClick={handleConfirmBooking} 
              >
              Confirm Booking
            </button>

          </div>

        </div>

      )}

    </div>

  </div>
);
}

export default CreateBookingPage;