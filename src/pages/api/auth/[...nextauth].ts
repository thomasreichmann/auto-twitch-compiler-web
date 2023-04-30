import clientPromise from "@/lib/mongodb";
import accountRepository from "@/repo/accountRepository";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      let account = await accountRepository.findByUserId(user.id);

      session.idToken = account?.access_token;
      session.accessToken = account?.access_token;

      return session;
    },
    async signIn({ account, user }) {
      if (account?.refresh_token) {
        // Save new refresh token from signIn if we have received new access_token
        try {
          await accountRepository.updateAccount(user.id, account);
        } catch (err) {
          console.error("Error while updating account on signIn", err);
        }
      }

      return true;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login",
  },
  debug: false,
};

export default NextAuth(authOptions);
