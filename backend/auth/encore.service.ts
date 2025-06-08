import { Service } from "encore.dev/service";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If prisma file located elsewhere
import { PrismaClient } from "./generated/prisma";
import { betterAuth } from "better-auth";
import prisma from "./database";

export const auth = betterAuth({
  // Initialize database
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Initialize email & password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  trustedOrigins: ["http://localhost:3000"],
})

export default new Service("auth");