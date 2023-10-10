import { CreateScheduleValidationError } from "@/errors";
import CreateScheduleRequest from "@/types/CreateScheduleRequest";
import { InvokeCommand, Lambda } from "@aws-sdk/client-lambda";

const CREATE_SCHEDULE_NAME = "CreateSchedule";

const lambdaClient = new Lambda();

export default class AwsService {
  async createSchedule(request: CreateScheduleRequest) {
    const { logs, result } = await this.invokeLambda(CREATE_SCHEDULE_NAME, request);

    if (result.errorType == "ValidationException") throw new CreateScheduleValidationError(result.errorMessage);

    return result;
  }

  private async invokeLambda(functionName: string, payload: any = {}) {
    const command = new InvokeCommand({
      FunctionName: functionName,
      Payload: JSON.stringify(payload),
    });

    const response = await lambdaClient.send(command);

    const result = JSON.parse(Buffer.from(response.Payload ?? "").toString());
    const logs = Buffer.from(response.LogResult ?? "", "base64").toString();

    console.log(logs, result);

    return { logs, result };
  }
}
