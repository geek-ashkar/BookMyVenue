import type { Response } from "express";
import { pool } from "../config/db.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const getOwnerDashboardSummary = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const ownerId = req.user?.id;

  if (!ownerId) {
    res.status(401).json({
      message: "Unauthorized. Please login first.",
    });
    return;
  }

  try {
    const result = await pool.query(
      `
      SELECT

      COUNT(DISTINCT v.id) AS total_venues,

      COUNT(b.id) AS total_bookings,

      COALESCE(SUM(
        CASE
          WHEN b.booking_status = 'confirmed'
          THEN b.total_amount
          ELSE 0
        END
      ),0) AS total_revenue,

      COUNT(
        CASE
          WHEN b.booking_status = 'pending_payment'
          THEN 1
        END
      ) AS pending_bookings,

      COUNT(
        CASE
          WHEN b.booking_status = 'confirmed'
          THEN 1
        END
      ) AS confirmed_bookings,

      COUNT(
        CASE
          WHEN b.booking_status = 'cancelled'
          THEN 1
        END
      ) AS cancelled_bookings

      FROM venues v

      LEFT JOIN bookings b
        ON b.venue_id = v.id

      WHERE v.owner_id = $1
      `,
      [ownerId]
    );

    res.status(200).json({
      message: "Owner dashboard summary fetched successfully.",
      summary: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Something went wrong while fetching dashboard summary.",
    });

  }
};