import { ActivityLogRepository } from "modules/log/log.repository";
const logRepository = new ActivityLogRepository();

export class LogServices {
  async getAllLogs() {
    const logs = await logRepository.findAll();

    return { logs };
  }
}
