import { useNavigate } from "react-router-dom";
import "./VenueCard.css";
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
    <div className ="venue-card">

        <div className="venue-image">

            {venue.thumbnail ? (
                <img
                src={`http://localhost:5001/${venue.thumbnail}`}
                alt={venue.name}
                className="venue-thumbnail"
            />
            ) : (
            <p>No Image Available</p>
            )} 
        </div>


        <div className="venue-info">
            <h2>{venue.name}</h2>

            <p>
                <strong> Category :</strong>{" "}
                {
                    venue.category .split("_") .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")
                }
            </p>

            <p>
            <strong>City:</strong> {venue.city}
            </p>

             <p>
             <strong>Capacity:</strong> {venue.capacity} People
             </p>

            <p className="price">
                € {Number(venue.base_price).toLocaleString()}
            </p>

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