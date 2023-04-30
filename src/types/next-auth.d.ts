import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    error?: "RefreshAccessTokenError";
  }
}
