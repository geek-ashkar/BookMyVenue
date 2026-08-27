import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AddVenuePage from "./pages/owner/AddVenuePage";
import OwnerVenueView from "./pages/owner/OwnerVenueView";
import EditVenuePage from "./pages/owner/EditVenuePage";
import ProtectedRoute from "./components/ProtectedRoute";
import PendingVenuesPage from "./pages/admin/PendingVenuesPage";
import CustomersPage from "./pages/admin/CustomersPage";
import OwnersPage from "./pages/admin/OwnersPage";
import VenuesPage from "./pages/admin/VenuesPage";
import ApprovedVenuesPage from "./pages/admin/ApprovedVenuesPage";
import RejectedVenuesPage from "./pages/admin/RejectedVenuesPage";
import BookingsPage from "./pages/admin/BookingsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import CustomerVenueDetailsPage from "./pages/customer/VenueDetailsPage";
import AdminVenueDetailsPage from "./pages/admin/VenuesDetailsPage";
import CreateBookingPage from "./pages/customer/CreateBookingPage";
import BookingSuccessPage from "./pages/customer/BookingSuccessPage";
import MyBookingsPage from "./pages/customer/MyBookingsPage";
import PaymentPage from "./pages/customer/PaymentPage";
import OwnerBookingsPage from "./pages/owner/OwnerBookingsPage";
import AddAdminPage from "./pages/admin/AddAdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect Home */}
        <Route path="/" element={<LandingPage/>} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />

        <Route
           path="/admin/login"
           element={<AdminLoginPage />}
            />

        <Route
          path="/register/:role"
          element={<RegisterPage />}
        />

        {/* Customer Dashboard */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/venues"
          element={<CustomerDashboard />}
        />

        <Route
          path="/venues/:id"
          element={<CustomerVenueDetailsPage />}
        />

        <Route
          path="/bookings/new/:venueId"
          element={
         <ProtectedRoute allowedRoles={["customer"]}>
             <CreateBookingPage />
         </ProtectedRoute>
        }
        />

        <Route
        path="/booking-success"
        element={
        <ProtectedRoute allowedRoles={["customer"]}>
            <BookingSuccessPage />
        </ProtectedRoute>
        }
        />

        <Route
          path="/customer/my-bookings"
          element={
        <ProtectedRoute allowedRoles={["customer"]}>
        <MyBookingsPage />
        </ProtectedRoute>
        }
        />

        <Route
        path="/payment/:bookingId"
        element={
        <ProtectedRoute allowedRoles={["customer"]}>
        <PaymentPage />
        </ProtectedRoute>
        }
        />

        {/* Owner Dashboard */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/add-venue"
          element={
          <ProtectedRoute allowedRoles={["owner"]}>
          <AddVenuePage />
          </ProtectedRoute>
          }
          />

          <Route
            path="/owner/venues/:id"
            element={
           <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerVenueView />
            </ProtectedRoute>
             }
            />

          <Route
              path="/owner/venues/:id/edit"
              element={
              <ProtectedRoute allowedRoles={["owner"]}>
              <EditVenuePage />
              </ProtectedRoute>
              }
          />

          <Route
            path="/owner/venues/:venueId/bookings"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <OwnerBookingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/bookings"
            element={
                <ProtectedRoute allowedRoles={["owner"]}>
                    <OwnerBookingsPage />
                </ProtectedRoute>
            }
          />

          {/* Root Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["root_admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
            path="/admin/customers"
            element={
          <ProtectedRoute allowedRoles={["root_admin"]}>
            <CustomersPage />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/owners"
          element={
          <ProtectedRoute allowedRoles={["root_admin"]}>
              <OwnersPage />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/venues"
          element={
          <ProtectedRoute allowedRoles={["root_admin"]}>
            <VenuesPage />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/approved-venues"
          element={
          <ProtectedRoute allowedRoles={["root_admin"]}>
              <ApprovedVenuesPage />
          </ProtectedRoute>
        }
        />

        <Route
          path="/admin/rejected-venues"
          element={
          <ProtectedRoute allowedRoles={["root_admin"]}>
            <RejectedVenuesPage />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
          <ProtectedRoute allowedRoles={["root_admin"]}>
            <BookingsPage />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
          <ProtectedRoute allowedRoles={["root_admin"]}>
            <PaymentsPage />
          </ProtectedRoute>
          }
        />

        <Route
            path="/admin/pending-venues"
            element={
            <ProtectedRoute allowedRoles={["root_admin"]}>
            <PendingVenuesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/venues/:id"
          element={
            <ProtectedRoute allowedRoles={["root_admin"]}>
            <AdminVenueDetailsPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-admin"
          element={
                <ProtectedRoute
                    allowedRoles={["root_admin"]}
                >
                    <AddAdminPage />
                </ProtectedRoute>
            }
        />

        {/* Unknown Routes */}
        <Route
          path="*"
          element={< Navigate to="/" replace/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;