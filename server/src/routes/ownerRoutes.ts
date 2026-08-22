import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { getOwnerDashboardSummary } from "../controllers/ownerController.js";

const router = Router();

router.get(
  "/dashboard-summary",
  authMiddleware,
  allowRoles("owner"),
  getOwnerDashboardSummary
);

export default router;