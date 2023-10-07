import { CreateScheduleValidationError } from "@/errors";
import { auth } from "@/lib/auth";
import AwsService from "@/services/awsService";
import { NextApiRequest, NextApiResponse } from "next";

const awsService = new AwsService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);
  console.log(session);
  const body = JSON.parse(req.body);

  try {
    const invokeResult = await awsService.createSchedule({
      name: "testFrom Next",
      payload: {},
      state: "ENABLED",
      time: { hours: "10", minutes: "10" },
    });

    console.log(invokeResult);

    res.send({
      message: "Hello World",
    });
  } catch (ex) {
    if (ex instanceof CreateScheduleValidationError)
      return res.status(400).send({ message: ex.message, error: ex.error });

    throw ex;
  }
}
