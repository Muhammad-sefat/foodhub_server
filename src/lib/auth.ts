import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

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
});
