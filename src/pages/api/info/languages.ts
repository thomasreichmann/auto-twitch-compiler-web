// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import infoService, { Language } from "@/services/infoService";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Language[]>
) {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401);

    const languages = await infoService.getLanguages();
    res.status(200).json(languages);
  } else {
    res.status(405);
  }
}
