import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password required" });
    }

    console.log(`Auth attempt for username='${username}'`);
    const user = await User.findOne({ username }).exec();

    if (!user) {
      console.warn(`Auth: user not found for '${username}'`);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      console.warn(`Auth: password mismatch for '${username}'`);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ role: user.role, username: user.username }, JWT_SECRET, { expiresIn: "8h" });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Auth Controller Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
