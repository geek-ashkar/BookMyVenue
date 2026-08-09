import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./VenueDetailsPage.css";

type Venue = {
  id: number;
  owner_id: number;

  owner_name: string;
  owner_email: string;

  name: string;
  category: string;
  description: string;

  address: string;
  city: string;

  capacity: number;
  base_price: string;

  approval_status: string;

  is_active: boolean;

  created_at: string;
};

type Document = {
  id: number;
  venue_id: number;

  document_type: string;

  file_name: string;

  mime_type: string;
};

function VenueDetailsPage() {

    const { id } = useParams();
    const [venue, setVenue] = useState<Venue | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

useEffect(() => {

    const fetchVenue = async () => {
        try {
            const response = await api.get(`/venues/admin/${id}`);
            setVenue(response.data.venue);
            setDocuments(response.data.documents);
        } catch (err) {

            console.error(err);
            setError("Failed to load venue.");

        } finally {
            setLoading(false);
        }
     };

    fetchVenue();

}, [id ]);

const viewDocument = async (documentId: number) => {

    console.log("View clicked:", documentId);

  try {
    const response = await api.get(
      `/venues/admin/documents/${documentId}/view`,
      {
        responseType: "blob",
      }
    );

     console.log("API Response:", response);


    const fileURL = URL.createObjectURL(response.data);

    console.log("File URL:", fileURL);

    window.location.href = fileURL;
  } catch (error:any) {
    console.error(error);
   
    console.log(error.response?.status);
    console.log(error.response?.data);


    alert("Failed to open document.");
  }
};

if (loading) {
    return <h2>Loading venue...</h2>;
}

if (error) {
    return <h2>{error}</h2>;
}

if (!venue) {
    return <h2>Venue not found.</h2>;
}

   return (
  <div className="venue-details-container">

    <h1 className="page-title">
      Venue Review
    </h1>

    <div className="details-card">

      <h2>Venue Information</h2>

      <div className="details-grid">

        <div>
          <strong>Venue Name</strong>
          <p>{venue.name}</p>
        </div>

        <div>
          <strong>Category</strong>
          <p>{venue.category}</p>
        </div>

        <div>
          <strong>City</strong>
          <p>{venue.city}</p>
        </div>

        <div>
          <strong>Address</strong>
          <p>{venue.address}</p>
        </div>

        <div>
          <strong>Capacity</strong>
          <p>{venue.capacity}</p>
        </div>

        <div>
          <strong>Base Price</strong>
          <p>€ {venue.base_price}</p>
        </div>

        <div>
          <strong>Status</strong>
          <p>{venue.approval_status}</p>
        </div>

      </div>

    </div>

    <div className="details-card">

      <h2>Owner Information</h2>
      <div className="details-grid">
        <div>
          <strong>Owner Name</strong>
          <p>{venue.owner_name}</p>
        </div>
        <div>
          <strong>Email</strong>
          <p>{venue.owner_email}</p>
        </div>
      </div>
    </div>

    <div className="details-card">
       <h2>Uploaded Documents</h2>
       <table className="documents-table">
           <thead>
                <tr>
                    <th>Document Type</th>
                    <th>File Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((document) => (
                    <tr key={document.id}>
                        <td>{document.document_type}</td>
                        <td>{document.file_name}</td>
                        <td>
                            <button
                                onClick={() => viewDocument(document.id)} >
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

export default VenueDetailsPage;