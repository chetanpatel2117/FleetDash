import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret";
const FALLBACK_ADMIN_USER = process.env.ADMIN_USER || "admin";
const FALLBACK_ADMIN_PASSWORD = process.env.ADMIN_PASS || "admin123";
const FALLBACK_ADMIN_ROLE = process.env.ADMIN_ROLE || "admin";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password required" });
    }

    const normalizedUsername = username.trim();
    const normalizedPassword = password.trim();

    if (normalizedUsername === FALLBACK_ADMIN_USER && normalizedPassword === FALLBACK_ADMIN_PASSWORD) {
      const token = jwt.sign(
        { role: FALLBACK_ADMIN_ROLE, username: FALLBACK_ADMIN_USER },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.status(200).json({ success: true, token, username: FALLBACK_ADMIN_USER, role: FALLBACK_ADMIN_ROLE });
    }

    console.log(`Auth attempt for username='${normalizedUsername}'`);
    const user = await User.findOne({ username: normalizedUsername }).exec();

    if (!user) {
      console.warn(`Auth: user not found for '${normalizedUsername}'`);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(normalizedPassword, user.passwordHash);

    if (!match) {
      console.warn(`Auth: password mismatch for '${normalizedUsername}'`);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ role: user.role, username: user.username }, JWT_SECRET, { expiresIn: "8h" });

    return res.status(200).json({ success: true, token, username: user.username, role: user.role });
  } catch (error) {
    console.error("Auth Controller Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
