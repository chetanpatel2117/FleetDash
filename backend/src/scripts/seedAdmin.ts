import bcrypt from "bcryptjs";
import User from "../models/user.model";

export async function seedAdmin() {
  try {
    const adminUser = process.env.ADMIN_USER || "admin";
    const adminPass = process.env.ADMIN_PASS || "admin123";
    const adminRole = process.env.ADMIN_ROLE || "admin";

    const existing = await User.findOne({ username: adminUser }).exec();

    if (existing) {
        // If an admin already exists, ensure the password matches the configured ADMIN_PASS.
        const same = await bcrypt.compare(adminPass, existing.passwordHash);
        if (same) {
          console.log("Admin user already exists and password matches");
          return;
        }

        // Password differs: update the stored hash to match the configured ADMIN_PASS.
        const newHash = await bcrypt.hash(adminPass, 10);
        existing.passwordHash = newHash;
        await existing.save();
        console.log("Admin user existed — updated password hash from ADMIN_PASS");
        return;
    }

    const hash = await bcrypt.hash(adminPass, 10);

    await User.create({ username: adminUser, passwordHash: hash, role: adminRole });

    console.log("Seeded admin user:", adminUser);
  } catch (error) {
    console.error("Failed to seed admin user:", error);
  }
}
