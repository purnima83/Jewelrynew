import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
    async redirect({ url, baseUrl }) {
      console.log("🔄 Redirecting to:", url, "Base URL:", baseUrl);
      
      // Ensure users always land on the correct domain
      if (url.startsWith(baseUrl)) {
        return url; // ✅ Allow only safe redirects
      }
      
      return `${baseUrl}/profile`; // ✅ Redirect to profile page after login
    },
  },
  debug: true, // ✅ Enable debugging logs in terminal
};
