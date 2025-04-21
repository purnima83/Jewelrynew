// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;  // ✅ Add role
    };
  }

  interface User {
    id: string;
    email: string;
    role?: string;  // ✅ Add role to user
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;  // ✅ Add role to JWT token
  }
}
