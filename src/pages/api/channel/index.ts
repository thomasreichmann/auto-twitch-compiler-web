import channelService, { Channel } from "@/services/channelService";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Channel>
) {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401);

    const channel = await channelService.getChannel(session.account);
    res.status(200).json(channel);
  } else {
    res.status(405);
  }
}
