import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

type UsersSummary = {
  total_customers: number;
  total_owners: number;
  total_root_admins: number;
};

type VenuesSummary = {
  total_venues: number;
  pending_venues: number;
  approved_venues: number;
  rejected_venues: number;
  active_venues: number;
};

type BookingsSummary = {
  total_bookings: number;
  pending_payment_bookings: number;
  confirmed_bookings: number;
  cancelled_bookings: number;
  failed_bookings: number;
};

type PaymentsSummary = {
  total_payments: number;
  pending_payments: number;
  successful_payments: number;
  failed_payments: number;
  refunded_payments: number;
  total_revenue: string;
};

type RecentBooking = {
  booking_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_amount: string;
  booking_status: string;

  venue_name: string;
  venue_city: string;

  customer_name: string;
  owner_name: string;

  payment_status: string | null;
};

type DashboardSummary = {
  users: UsersSummary;
  venues: VenuesSummary;
  bookings: BookingsSummary;
  payments: PaymentsSummary;
  recent_bookings: RecentBooking[];
};

function AdminDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response = await api.get("/dashboard/admin");

        setSummary(response.data.summary);
        setError("");

        console.log(response.data.summary);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!summary) {
    return <h2>No dashboard data found.</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

        <h2 className="section-title"> Summary</h2>

      <div className = "dashboard-grid">
        <div className = "dashboard-card">
          <h3>Customers</h3>
          <h2 className = "dashboard-card-value">
            {summary.users.total_customers}
          </h2>
        </div>

        <div className ="dashboard-card">
          <h3>Owners</h3>
          <h2 className = "dashboard-card-value">
            {summary.users.total_owners}
          </h2>
        </div>

        <div className="dashboard-card">
          <h3>Venues</h3>
          <h2 className="dashboard-card-value">
            {summary.venues.total_venues}
          </h2>
        </div>

        <div className = "dashboard-card">
          <h3>Total Revenue</h3>
          <h2 className="dashboard-card-value">
            € {summary.payments.total_revenue}
          </h2>
        </div>
      </div>

        <h2 className="section-title"> Operations</h2>

      <div className = "dashboard-grid">

          <div className="dashboard-card">
          <h3>Total Bookings</h3>
          <h2 className = "dashboard-card-value">
            {summary.bookings.total_bookings}
          </h2>
          </div>

         <div className="dashboard-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/pending-venues")}>
                
          <h3>Approval Pending Venues</h3>
          <h2 className="dashboard-card-value">
            {summary.venues.pending_venues}
          </h2>
         </div>

         <div className = "dashboard-card">
          <h3>Approved Venues</h3>
          <h2 className ="dashboard-card-value">
            {summary.venues.approved_venues}
          </h2>
         </div>

          <div className ="dashboard-card">
          <h3>Rejected Venues</h3>
          <h2 className ="dashboard-card-value">
            {summary.venues.rejected_venues}
          </h2>
          </div>
      </div>

      <div className="venue-request-card">
          <h2>Venue Requests</h2>

            <p>
                There are{" "}
                <strong>{summary.venues.pending_venues}</strong> venue(s)
                waiting for approval.
            </p>

          <button
              className="primary-button"
              onClick={() => navigate("/admin/pending-venues")}
              >
               View Pending Venues
          </button>
       </div>

    <div className="recent-bookings">

       <h2>Recent Bookings</h2>

      <table className = "dashboard-table">
            <thead>
             <tr>
               <th className="table-header">Booking ID</th>
               <th className="table-header">Customer</th>
               <th className="table-header">Venue</th>
               <th className="table-header">City</th>
               <th className="table-header">Date</th>
               <th className="table-header">Time</th>
               <th className="table-header">Amount</th>
               <th className="table-header">Booking Status</th>
               <th className="table-header">Payment Status</th>
              </tr>
            </thead>

          <tbody>
            {summary.recent_bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td className= "table-cell">{booking.booking_id}</td>

              <td className ="table-cell">{booking.customer_name}</td>

              <td className ="table-cell">{booking.venue_name}</td>

              <td className ="table-cell">{booking.venue_city}</td>

              <td className ="table-cell">{booking.booking_date}</td>

              <td className ="table-cell">{booking.start_time} - {booking.end_time}</td>

              <td className ="table-cell"> € {booking.total_amount}</td>

              <td className ="table-cell">{booking.booking_status}</td>

              <td className ="table-cell">{booking.payment_status ?? "N/A"}</td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>
        
      
    </div>
 );
  
}

export default AdminDashboard;