// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import infoService, { AvailableGame } from "@/services/infoService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AvailableGame[]>
) {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401);

    const channels = await infoService.getAvailableGames();
    res.status(200).json(channels);
  } else {
    res.status(405);
  }
}
