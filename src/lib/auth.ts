import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.AUTH_URL!],
  emailAndPassword: {
    enabled: true,
  },
  events: {
    async afterUserCreated(user: any, context: any) {
      const { role } = context.body as {
        role?: "CUSTOMER" | "PROVIDER";
      };

      const finalRole = role === "PROVIDER" ? "PROVIDER" : "CUSTOMER";

      await prisma.user.update({
        where: { id: user.id },
        data: { role: finalRole },
      });
    },
  },
});
