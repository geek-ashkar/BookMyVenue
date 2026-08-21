import { Router } from "express";
import { createAdmin } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  allowRoles("root_admin"),
  createAdmin
);

export default router;