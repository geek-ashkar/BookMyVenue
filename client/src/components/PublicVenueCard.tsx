import { useNavigate } from "react-router-dom";
import "./PublicVenueCard.css";

type Venue = {
  id: number;
  name: string;
  category: string;
  city: string;
  capacity: number;
  base_price: string;
  thumbnail: string | null;
};

type Props = {
  venue: Venue;
};

function PublicVenueCard({ venue }: Props) {
  const navigate = useNavigate();

  const category = venue.category
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="public-card">

      <div className="public-image">

        {venue.thumbnail ? (
          <img
            src={`http://localhost:5001/${venue.thumbnail}`}
            alt={venue.name}
          />
        ) : (
          <div className="public-no-image">
            No Image
          </div>
        )}

      </div>

      <div className="public-content">

        <h3 className="public-name">
          {venue.name}
        </h3>

        <p className="public-city">
          📍 {venue.city}
        </p>

        <span className="public-category">
          {category}
        </span>

        <hr />

        <div className="public-bottom">

          <div>

            <span>Capacity</span>

            <strong>{venue.capacity}</strong>

            <small>Guests</small>

          </div>

          <div className="price">

            <span>Starting From</span>

            <strong>
              €
              {Number(
                venue.base_price
              ).toLocaleString()}
            </strong>

            <small>/event</small>

          </div>

        </div>

        <button
          className="public-btn"
          onClick={() =>
            navigate(`/venues/${venue.id}`)
          }
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default PublicVenueCard;