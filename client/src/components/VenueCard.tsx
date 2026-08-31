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

  const category = venue.category
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="venue-card">

      <div className="venue-image">

        {venue.thumbnail ? (
          <img
            src={`http://localhost:5001/${venue.thumbnail}`}
            alt={venue.name}
            className="venue-thumbnail"
          />
        ) : (
          <div className="no-image">
            No Image Available
          </div>
        )}

      </div>

      <div className="venue-content">

        <h2 className="venue-name">
          {venue.name}
        </h2>

        <p className="venue-city">
          📍 {venue.city}
        </p>

        <span className="venue-category">
          {category}
        </span>

        <hr />

        <div className="venue-bottom">

          <div className="bottom-item">

            <span>Capacity</span>

            <strong>
              {venue.capacity}
            </strong>

            <small>Guests</small>

          </div>

          <div className="bottom-item right">

            <span>Starting From</span>

            <strong className="venue-price">
              € {Number(venue.base_price).toLocaleString()}
            </strong>

            <small>/ event</small>

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