import "dotenv/config";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    console.log("***** Admin Seeding Started....");

    const adminData = {
      name: "Mr. Admin",
      email: "muhammadsefat@gmail.com",
      password: "adminsefat55",
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("Admin already exists");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:5000",
        },
        body: JSON.stringify(adminData),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Admin signup failed: ${response.status} ${text}`);
    }

    await prisma.user.update({
      where: { email: adminData.email },
      data: {
        emailVerified: true,
        role: UserRole.ADMIN,
      },
    });

    console.log("✅ Admin created & verified");
  } catch (err) {
    console.error("❌ Admin seeding failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
