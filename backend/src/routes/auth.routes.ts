import express from "express";
import { login } from "../controllers/auth.controller";
import User from "../models/user.model";

const DEBUG_AUTH = process.env.DEBUG_AUTH === "true";

const router = express.Router();

router.post("/api/auth/login", login);

// DEV-only helper to inspect users when DEBUG_AUTH=true
if (DEBUG_AUTH) {
	router.get("/api/auth/debug-users", async (req, res) => {
		try {
			const users = await User.find().select("username role passwordHash createdAt").lean().exec();
			return res.json({ success: true, users });
		} catch (err) {
			console.error("debug-users error:", err);
			return res.status(500).json({ success: false, message: "failed" });
		}
	});
}

export default router;
