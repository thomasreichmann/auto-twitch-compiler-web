// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from "@/lib/auth";
import channelService from "@/services/channelService";
import UploadsService, { Upload } from "@/services/uploadsService";
import type { NextApiRequest, NextApiResponse } from "next";

const uploadsService = new UploadsService();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Upload[]>) {
  if (req.method == "GET") {
    const session = await auth(req, res);
    if (!session) return res.status(401);

    const channel = await channelService.getChannel(session.user.id);
    const uploads = uploadsService.getUploadsByChannelId(channel._id);

    res.status(200).json(uploads);
  } else {
    res.status(405);
  }
}
