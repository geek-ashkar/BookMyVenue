import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Name, email and password are required.",
      });
      return;
    }

    // Check if email already exists
    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(409).json({
        message: "Email already exists.",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Root Admin
    const result = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password,
        role
      )
      VALUES ($1, $2, $3, 'root_admin')
      RETURNING id, name, email, role, created_at
      `,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Root admin created successfully.",
      admin: result.rows[0],
    });

  } catch (error) {

    console.error("Create admin error:", error);

    res.status(500).json({
      message: "Something went wrong while creating admin.",
    });

  }
};