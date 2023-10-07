import { auth } from "@/lib/auth";
import { Channel } from "@/repo/channelRepository";
import channelService from "@/services/channelService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Channel | string>) {
  if (req.method == "GET") {
    const session = await auth(req, res);
    if (!session) return res.status(401);

    console.log(session);

    const channel = await channelService.getChannel(session.user.id);
    res.status(200).json(channel);
  } else if (req.method == "PUT") {
    const session = await auth(req, res);
    if (!session) return res.status(401);

    try {
      const channel = JSON.parse(req.body) as Channel;

      const created = await channelService.saveChannel(channel);
      res.status(200).json(created);
    } catch (err: any) {
      console.log(err);
      res.status(400).send(err);
    }
  } else {
    res.status(405);
  }
}
