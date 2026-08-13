import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./VenueDetailsPage.css";
import { useNavigate } from "react-router-dom";

type Venue ={
    id : number;
    owner_id: number;

    owner_name: string;

    name: string;
    category: string;
    description: string;

    address: string;
    city: string;

    capacity: number;
    base_price: string;
    
    thumbnail: string|null;

}

function VenueDetailsPage () {

    const {id} = useParams();
    const [venue, setVenue] = useState<Venue | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect (() => {
        const fetchVenue = async () =>{
            try{
                const response = await api.get(`/venues/${id}`);

console.log(response.data);
console.log(response.data.venue);

                setVenue(response.data.venue);
            }catch(error){
                console.error(error);

                setError("Failed to load venue.");
            }finally{
                setLoading(false);
            }
        };

        fetchVenue();
    }, [id]);
console.log("Fetching:", `/venues/${id}`);

    if(loading){
        return <h2>Loading venue ..</h2>;
    }

    if(error){
        return <h2>{error}</h2> ;
    }

    if(!venue){
        return <h2> Venue not found</h2>;
    }
console.log("Venue:", venue);
console.log("Thumbnail:", venue.thumbnail);
  return (
  <div className="venue-details-container">

    <div className="hero-image">
      {venue.thumbnail ? (
        <img
          src={`http://localhost:5001/${venue.thumbnail}`}
          alt={venue.name}
        />
      ) : (
        <div className="no-image">
          No Image Available
        </div>
      )}

      <div className="hero-overlay">
        <span className="category-badge">
          {venue.category.replace("_", " ")}
        </span>

        <h1>{venue.name}</h1>
      </div>
    </div>

    <div className="details-layout">

      
      

      <div className="details-left">


        <div className="description">

        <h2>About this Venue</h2>

        <p>{venue.description}</p>

        </div>

        <div className="venue-info">
        <div className="info-card">
        <p>
          📍 <strong>City:</strong> {venue.city}
        </p>
        </div>

        <div className="info-card">
        <p>
          🏠 <strong>Address:</strong> {venue.address}
        </p>
        </div>

        <div className="info-card">
        <p>
          👥 <strong>Capacity:</strong> {venue.capacity}
        </p>
        </div>
        </div>
        <div className="owner-card">

        <h3>Venue Owner</h3>
         <p>
          👤 {venue.owner_name}
         </p>
        </div>

      </div>

      <div className="booking-card">

      <div className="booking-price ">
          <p className="price">
          € {Number(venue.base_price).toLocaleString()}
        </p>
      </div>

      <div className="booking-info">

        <p>👥 Capacity: {venue.capacity} People</p>
        <p>📍 {venue.city}</p>
        <p>✅ Instant Confirmation</p>
        <p>🔒 Secure Booking</p>

      </div>

      <button
        className="book-btn"
        onClick={() => navigate(`/bookings/new/${venue.id}`)} >
         Book Now
      </button>

      </div>

    </div>

  </div>
);
}

export default VenueDetailsPage;

