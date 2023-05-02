import { googleClient } from "@/lib/googleClient";
import { google } from "googleapis";
import { Account } from "next-auth";

const channelService = {
  async getChannel(account: Account) {
    const auth = googleClient.getAuth(account);

    const youtube = google.youtube({ version: "v3", auth });

    let channels = await youtube.channels.list({
      part: ["snippet"],
      maxResults: 1,
      mine: true,
    });

    if (!channels.data.items) throw Error(`No channel found for user`);

    return channels.data.items[0];
  },
};

export type Channel = {
  id: number;
  name: string;
  subscribers: number;
};

export type User = {
  id: number;
  firstName: string;
  age: number;
  height: number;
};

export default channelService;
