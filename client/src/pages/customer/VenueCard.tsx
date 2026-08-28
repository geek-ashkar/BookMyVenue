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

        <p className="venue-category">
          {venue.category.replaceAll("_", " ")}
        </p>

        <hr />

        <div className="venue-bottom">

          <div>
            <h3>{venue.capacity}</h3>
            <span>Guests</span>
          </div>

          <div className="venue-price">
            €
            {Number(venue.base_price).toLocaleString()}
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