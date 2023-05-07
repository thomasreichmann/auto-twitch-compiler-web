import accountRepository from "@/repo/accountRepository";
import { google, Auth } from "googleapis";
import { Account } from "next-auth";

export const googleClient = {
  getAuth(account: Account): Auth.OAuth2Client {
    const oauthClient = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    oauthClient.setCredentials({
      ...account,
      expiry_date: (account.expires_at ?? 0) * 1000,
    });

    oauthClient.on("tokens", async (tokens) => {
      account.access_token = tokens.access_token ?? undefined;
      account.expires_at = Math.floor((tokens.expiry_date ?? 0) / 1000);
      account.id_token = tokens.id_token ?? undefined;

      await accountRepository.updateAccount(account.userId ?? "", account);
    });

    return oauthClient;
  },
};
