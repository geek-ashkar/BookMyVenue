import { Router } from "express";
import { payForBooking } from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router=Router();

router.post(
    "/dummy-success",
    authMiddleware,
    allowRoles("customer"),
    payForBooking
);

export default router;


