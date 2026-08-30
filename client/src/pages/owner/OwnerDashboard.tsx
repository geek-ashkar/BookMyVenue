// OwnerDashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import type { Venue } from "../../types/venue";
import "./OwnerDashboard.css";
import { useAuth } from "../../context/AuthContext";

type VenueRecord = Venue & Record<string, unknown>;

const statusLabels: Record<string, string> = {
  pending: "Verification Pending",
  approved: "Admin Verified",
  rejected: "Admin Rejected",
};

function getVenueValue(venue: VenueRecord, keys: string[]) {
  for (const key of keys) {
    const value = venue[key];

    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }

  return "";
}

const getImageUrl = (venue: VenueRecord) => {
  const rawImage = getVenueValue(venue, [
    "image",
    "imageUrl",
    "image_url",
    "thumbnail",
    "photo",
  ]);

  if (!rawImage) {
    return "";
  }

  if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
    return rawImage;
  }

  const backendUrl =
    api.defaults.baseURL?.replace(/\/api\/?$/, "") || "http://localhost:5001";

  return `${backendUrl}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;
};

function OwnerDashboard() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [failedImages, setFailedImages] = useState<number[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchMyVenues = async () => {
      try {
        const response = await api.get("/venues/my-venues");
        setVenues(response.data.venues ?? []);

        const summaryResponse = await api.get(
          "/owner/dashboard-summary"
        );

        setSummary(summaryResponse.data.summary);

      } catch (fetchError) {
        console.error(fetchError);
        setError("Failed to load venues. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyVenues();
  }, []);

  type DashboardSummary = {
    total_venues: number;
    total_bookings: number;
    total_revenue: string;
    pending_bookings: number;
    confirmed_bookings: number;
    cancelled_bookings: number; 
  };

  const [summary, setSummary] =
  useState<DashboardSummary | null>(null);  

  const handleDelete = async (venueId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/venues/owner/${venueId}`);

      setVenues((previousVenues) =>
        previousVenues.filter((venue) => venue.id !== venueId)
      );

      window.alert("Venue deleted successfully.");
    } catch (deleteError) {
      console.error(deleteError);
      window.alert("Failed to delete venue. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="owner-dashboard state-message">
        <div className="loading-spinner" />
        <p>Loading your venues...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="owner-dashboard state-message">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </main>
    );
  }

  return (
    <main className="owner-dashboard">



      <section className="owner-dashboard__header">
        <div>
          <p className="owner-dashboard__eyebrow">Venue management</p>
          <h1>Owner Dashboard</h1>
          <p className="owner-dashboard__subtitle">
            Manage your venues, review bookings, and keep your listings current.
          </p>
        </div>

        <button
          className="add-venue-btn"
          onClick={() => navigate("/owner/add-venue")}
        >
          <span aria-hidden="true">+</span>
          Add Venue
        </button>

        <button
              className="logout-btn"
              onClick={() => {
                  logout();
                  navigate("/");
              }}>
              Logout
        </button>
      </section>

      {summary && (

        <div className="dashboard-summary">

          <div className="summary-card">
            <h3>🏛 My Venues</h3>
            <h2>{summary.total_venues}</h2>
          </div>

          <div
            className="summary-card clickable"
            onClick={() => navigate("/owner/bookings")}
          >
            <h3>📅 Bookings</h3>
            <h2>{summary.total_bookings}</h2>
          </div>

          <div className="summary-card">
            <h3>💶 Revenue</h3>
            <h2>
              €
              {Number(summary.total_revenue).toLocaleString()}
            </h2>
          </div>

          <div className="summary-card">
            <h3>⏳ Pending</h3>
            <h2>{summary.pending_bookings}</h2>
          </div>

          <div className="summary-card">
            <h3>✅ Confirmed</h3>
            <h2>{summary.confirmed_bookings}</h2>
          </div>

          <div className="summary-card">
            <h3>❌ Cancelled</h3>
            <h2>{summary.cancelled_bookings}</h2>
          </div>

        </div>

        )}

      <section className="owner-dashboard__content">
        <div className="section-heading">
          <div>
            <h2>My Venues</h2>
            <p>
              {venues.length} {venues.length === 1 ? "venue" : "venues"} listed
            </p>
          </div>
        </div>

        {venues.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">
              ◇
            </div>
            <h3>No venues added yet</h3>
            <p>Start building your venue portfolio by adding your first listing.</p>
            <button
              className="add-venue-btn"
              onClick={() => navigate("/owner/add-venue")}
            >
              <span aria-hidden="true">+</span>
              Add Your First Venue
            </button>
          </div>
        ) : (
          <div className="owner-venue-grid">
            {venues.map((venue) => {
              const venueData = venue as VenueRecord;
              const image = getImageUrl(venueData);
              const imageFailed = failedImages.includes(venue.id);

              const name = getVenueValue(venueData, [
                "name",
                "venueName",
                "title",
              ]);
              const location = getVenueValue(venueData, [
                "location",
                "address",
                "city",
              ]);
              
              const capacity = getVenueValue(venueData, [
                "capacity",
                "guestCapacity",
              ]);
              const price = getVenueValue(venueData, [
                "base_price",
                "price",
                "pricePerHour",
                "price_per_hour",
                "rent",
              ]);
              const status = getVenueValue(venueData, [
                "status",
                "approval_status",
                "approvalStatus",
                "status",
              ]).toLowerCase() || "pending";

              return (
                <article className="owner-venue-card" key={venue.id}>
                  <div className="owner-venue-card__image-wrap">
                    
                  {image && !imageFailed ? (
                      <img
                        className="owner-venue-card__image"
                        src={image}
                        alt=""
                        onError={() => {
                          setFailedImages((previous) =>
                            previous.includes(venue.id)
                              ? previous
                              : [...previous, venue.id]
                          );
                        }}
                      />
                    ) : (
                      <div className="owner-venue-card__image-placeholder">
                        <span aria-hidden="true">⌂</span>
                        <p>No image available</p>
                      </div>
                    )}


                    <span className={`status-badge status-badge--${status}`}>
                      {statusLabels[status] ?? status}
                    </span>
                  </div>

                  <div className="owner-venue-card__body">
                    <div className="owner-venue-card__title-row">
                      <h3>{name || "Untitled Venue"}</h3>
                    </div>

                    {location && (
                      <p className="venue-detail">
                        <span aria-hidden="true">⌖</span>
                        {location}
                      </p>
                    )}

                    <div className="venue-meta">
                      {capacity && (
                        <span>
                          <strong>{capacity}</strong> guests
                        </span>
                      )}

                      {price && (
                        <span>
                          <strong>₹{price}</strong>
                          <small>/ hour</small>
                        </span>
                      )}
                    </div>

                    <div className="owner-venue-card__actions">
                      <button
                        className="card-action card-action--primary"
                        onClick={() => navigate(`/owner/venues/${venue.id}`)}
                      >
                        View
                      </button>

                      <button
                        className="card-action"
                        onClick={() =>
                          navigate(`/owner/venues/${venue.id}/bookings`)
                        }
                      >
                        Bookings
                      </button>

                      <button
                        className="card-action"
                        onClick={() =>
                          navigate(`/owner/venues/${venue.id}/edit`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="card-action card-action--delete"
                        onClick={() => handleDelete(venue.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default OwnerDashboard;