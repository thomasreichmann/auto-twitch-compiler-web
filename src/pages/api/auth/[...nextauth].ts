import clientPromise from "@/lib/mongodb";
import accountRepository from "@/repo/accountRepository";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube",
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

      if (!account) throw Error(`no account for user: ${user}`);

      session.account = account;
      return session;
    },
    async signIn({ account, user }) {
      if (account?.refresh_token) {
        // Save new refresh token from signIn if we have received new refresh_token
        try {
          await accountRepository.updateAccount(user.id, account);
        } catch (err) {
          console.log(account, user);
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
};

export default NextAuth(authOptions);
