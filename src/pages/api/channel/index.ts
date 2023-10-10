import { auth } from "@/lib/auth";
import { Channel } from "@/repo/channelRepository";
import channelService from "@/services/channelService";
import ScheduleService from "@/services/scheduleService";
import CreateScheduleRequest from "@/types/CreateScheduleRequest";
import type { NextApiRequest, NextApiResponse } from "next";

const scheduleService = new ScheduleService();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Channel | string>) {
  if (req.method == "GET") {
    const session = await auth(req, res);
    if (!session) return res.status(401);

    const channel = await channelService.getChannel(session.user.id);
    res.status(200).json(channel);
  } else if (req.method == "PUT") {
    const session = await auth(req, res);
    if (!session) return res.status(401);

    try {
      const channel = JSON.parse(req.body) as Channel;

      const created = await channelService.saveChannel(channel);

      const channelDate = new Date(channel.date);
      const scheduleRequest: CreateScheduleRequest = {
        name: channel._id.toString(),
        state: channel.enableUploads ? "ENABLED" : "DISABLED",
        time: {
          hours: channelDate.getUTCHours().toString(),
          minutes: channelDate.getUTCMinutes().toString(),
        },
        payload: await channelService.getSchedulePayload(channel),
      };

      try {
        await scheduleService.createSchedule(scheduleRequest);
      } catch (err: any) {
        return res.status(500).send(`Failed to create schedule: ${err.message}`);
      }

      return res.status(200).json(created);
    } catch (err: any) {
      console.log(err);
      return res.status(500).send(err);
    }
  } else {
    return res.status(405);
  }
}
