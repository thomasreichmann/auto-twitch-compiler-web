import "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: Required<DefaultUser>;
    error?: "RefreshAccessTokenError";
  }
}
