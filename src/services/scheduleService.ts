import CreateScheduleRequest from "@/types/CreateScheduleRequest";
import AwsService from "./awsService";

const awsService = new AwsService();

export default class ScheduleService {
  async createSchedule(request: CreateScheduleRequest) {
    const invokeResult = await awsService.createSchedule({ ...request });

    return invokeResult;
  }
}
