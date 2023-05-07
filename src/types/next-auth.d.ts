import NextAuth from "next-auth";
import { Account } from "next-auth";

declare module "next-auth" {
  interface Session {
    account: Account;
    error?: "RefreshAccessTokenError";
  }
}
