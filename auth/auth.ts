import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "../auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // @ts-ignore - Incompatibilidad de versiones entre @auth/prisma-adapter y next-auth
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});