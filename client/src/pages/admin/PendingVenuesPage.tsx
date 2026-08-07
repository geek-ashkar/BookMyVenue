import { useEffect, useState } from "react";
import api from "../../services/api";
import "./PendingVenuesPage.css";
import { useNavigate } from "react-router-dom";

type PendingVenue = {
  id: number;
  owner_id: number;
  owner_name: string;
  owner_email: string;

  name: string;
  category: string;
  city: string;

  capacity: number;
  base_price: string;

  approval_status: string;

  created_at: string;
};

function PendingVenuesPage() {

const [venues, setVenues] = useState<PendingVenue[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const navigate = useNavigate();

useEffect(() => {
  const fetchPendingVenues = async () => {
    try {
      const response = await api.get("/venues/admin/pending");

      setVenues(response.data.venues);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending venues.");
    } finally {
      setLoading(false);
    }
  };

  fetchPendingVenues();
}, []);

if (loading) {
  return <h2>Loading pending venues...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

return (
  <div className="pending-container">
    <h1 className="pending-title">Pending Venues</h1>

    <p className="pending-description">
      Review the submitted venues before approving or rejecting them.
    </p>
  <div className="pending-card">

    <table className="pending-table">

      <thead>

        <tr>

          <th>Venue</th>
          <th>Owner</th>
          <th>City</th>
          <th>Category</th>
          <th>Submitted</th>
          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {venues.map((venue) => (

          <tr key={venue.id}>

            <td>{venue.name}</td>

            <td>{venue.owner_name}</td>

            <td>{venue.city}</td>

            <td>{venue.category}</td>

            <td>
              {new Date(venue.created_at).toLocaleDateString()}
            </td>

            <td>

              <button className="view-button"
              onClick={()=> navigate(`/admin/venues/${venue.id}`)}>

                View

              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  </div>
  </div>
);
}
export default PendingVenuesPage;