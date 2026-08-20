import { Router } from "express";
import {
    createBooking,
    getMyBookings,
    getOwnerVenueBookings,
    cancelMyBooking,
    getAllBookingsForAdmin,
    getBookingDetailsForAdmin,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { payForBooking } from "../controllers/paymentController.js";

const  router = Router();

router.post("/",authMiddleware, allowRoles("customer"), createBooking);

router.get("/my-bookings", authMiddleware, allowRoles("customer"), getMyBookings);

router.get("/owner/:venueId", authMiddleware,  allowRoles("owner"),  getOwnerVenueBookings);

router.get("/admin/all", authMiddleware, allowRoles("root_admin"), getAllBookingsForAdmin);

router.get("/admin/:id", authMiddleware, allowRoles("root_admin"), getBookingDetailsForAdmin);

router.patch("/:id/cancel", authMiddleware, allowRoles("customer"), cancelMyBooking);

router.patch("/:bookingId/pay", authMiddleware, allowRoles("customer"), payForBooking);

export default router;
