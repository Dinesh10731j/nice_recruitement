import { Request, Response } from "express";
import { ActivityService } from "../../service/activity/activity.service";
import { HTTP_STATUS } from "../../constant/statusCode.interface";
import { Message } from "../../constant/message.interface";

const service = new ActivityService();

export class ActivityController {
  static async list(req: Request, res: Response) {
    try {
      const data = await service.list();
      return res.status(HTTP_STATUS.OK).json({ message: Message.FETCHED, data });
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }
}
