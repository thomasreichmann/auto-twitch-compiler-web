import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { AvailableGame } from "@/services/infoService";
import channelService from "@/services/channelService";

export type Channel = {
  games: AvailableGame[];
  date: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Channel>
) {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401);

    const channels = await channelService.getChannel(session.account);
    res.status(200).json(channels);
  } else {
    res.status(405);
  }
}
