import { TaskEntityType } from "@prisma/client";
import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { TaskService } from "modules/task/task.service";

const service = new TaskService();

export class TaskController {
  static async create(req: Request, res: Response) {      const task = await runService(() => service.createTask(req.body));
      return sendSuccess(res, task, "Task created successful", 201);
    
  }

  static async generateQr(req: Request, res: Response) {      const { taskId } = req.params;
      const qr = await runService(() => service.generateQr(taskId));
      return sendSuccess(res, qr, "Qr created", 201);
    
  }

  static async verify(req: Request, res: Response) {      const userId = req.user?.id; // dari auth middleware
      const result = await runService(() => service.verifyQrAndExecute({
        userId: String(userId),
        token: req.body.token,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }));
      return sendSuccess(res, result, "Qr verified");
    
  }

  static async findAllWithStatus(req: Request, res: Response) {      const userId = req.user?.id as string;
      const { communityId } = req.query;

      const tasks = await runService(() => service.getTasks(userId, communityId as string));

      return sendSuccess(res, tasks, "Tasks fetched successfully");
    
  }

  static async findAll(req: Request, res: Response) {      const tasks = await runService(() => service.getAllTasks());

      return sendSuccess(res, tasks, "Tasks fetched successfully");
    
  }
}
