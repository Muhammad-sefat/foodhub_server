import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const isProduction = process.env.NODE_ENV === "production";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    "http://localhost:3000",
    "https://foodhub-client.vercel.app", // if deployed later
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      },
    },
  },
});
