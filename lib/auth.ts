import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub; // ✅ Assign `id` safely
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // ✅ Ensure token has `sub` for user ID
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("🔄 Redirecting to:", url, "Base URL:", baseUrl);

      // Ensure redirection stays within the correct domain
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).host === new URL(baseUrl).host) {
        return url;
      }
      return `${baseUrl}/profile`; // ✅ Redirect to profile page after login
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NEXTAUTH_DEBUG === "true",
};
