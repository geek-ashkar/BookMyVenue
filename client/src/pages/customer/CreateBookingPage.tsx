import { useParams } from "react-router-dom";
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

    useEffect(() => {

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

  return (
 
    <div className="booking-layout">
    <div className="booking-page">

      <div className="booking-card">

        <h1>Book Venue</h1>

        <p className="venue-id">
          Venue : {venue?.name}
        </p>

        <form>

          <div className="form-group">
            <label>Booking Date</label>

            <input
              type="date"
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

          <button type="submit">
            Confirm Booking
          </button>

        </form>

      </div>

    </div>
    <div className="booking-summary">
        <h2>Booking Summary</h2>

<div className="summary-card">

    <p>
        <strong>Venue</strong>
    </p>

    <p>{venue?.name}</p>

    <hr />

    <p>
        <strong>Category</strong>
    </p>

    <p>{venue?.category?.replace("_", " ")}</p>

    <hr />

    <p>
        <strong>City</strong>
    </p>

    <p>{venue?.city}</p>

    <hr />

    <p>
        <strong>Price</strong>
    </p>

    <h3>
        € {Number(venue?.base_price).toLocaleString()}
    </h3>

</div>
    </div>
    </div>
  );
}

export default CreateBookingPage;