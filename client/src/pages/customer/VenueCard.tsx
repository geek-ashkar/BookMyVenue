import { useNavigate } from "react-router-dom";
import "./VenueCard.css";

type Venue = {
  id: number;
  name: string;
  category: string;
  city: string;
  capacity: number;
  base_price: string;
  thumbnail: string | null;
};

type VenueCardProps = {
  venue: Venue;
};

function VenueCard({ venue }: VenueCardProps) {
  const navigate = useNavigate();

  return (
    <div className="venue-card">

      <img
        src={`http://localhost:5001/${venue.thumbnail}`}
        alt={venue.name}
        className="venue-thumbnail"
      />

      <div className="venue-content">

        <h2>{venue.name}</h2>

        <p className="venue-location">
          📍 {venue.city}
        </p>

        <hr />

        <div className="venue-info">

          <div>
            <strong>{venue.capacity}</strong>
            <span>Guests</span>
          </div>

          <div>
            <strong>
              €
              {Number(venue.base_price).toLocaleString()}
            </strong>
            <span>/ hour</span>
          </div>

        </div>

        <button
          className="view-btn"
          onClick={() => navigate(`/venues/${venue.id}`)}
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default VenueCard;