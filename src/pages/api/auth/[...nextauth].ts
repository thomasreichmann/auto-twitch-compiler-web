import clientPromise from "@/lib/mongodb";
import accountRepository from "@/repo/accountRepository";
import { AcUnitOutlined } from "@mui/icons-material";
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
    async session(params) {
      let account = await accountRepository.findByUserId(params.user.id);

      // console.log("SESSION CALLBACK:", account?.access_token);
      params.session.accessToken = account?.access_token;

      return params.session;
    },
    async signIn(params) {
      if (params.account?.refresh_token) {
        // Save new refresh token from signIn if we have received new access_token
        try {
          await accountRepository.updateAccount(params.user.id, params.account);
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
