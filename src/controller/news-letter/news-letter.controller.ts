import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HTTP_STATUS } from "../../constant/statusCode.interface";
import { Message } from "../../constant/message.interface";
import {
  CreateNewsLetterDto,
  SendNewsletterDto,
} from "../../dto/news-letter/news-letter.dto";
import { NewsLetterRepository } from "../../repository/news-letter/news-letter.repository";
import { NewsLetterService } from "../../service/news-letter/news-letter.service";
import { getCache, setCache, delCache } from "../../utils/helpers/redis_helper";

const newsRepo = new NewsLetterRepository();
const newsService = new NewsLetterService(newsRepo);

const getIdParam = (req: Request, res: Response): string | null => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim().length === 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: Message.INVALID_REQUEST });
    return null;
  }
  return id;
};

export class NewsLetterController {
  static async createSubscription(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateNewsLetterDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      }

      const result = await newsService.createSubscription(dto);
      if (!result.data) {
        return res
          .status(result.status)
          .json({ message: Message.INTERNAL_SERVER_ERROR });
      }
      await delCache("newsLetter:all");
      return res
        .status(result.status)
        .json({ message: Message.NEWSLETTER_SUBSCRIBED });
    } catch (err: unknown) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: Message.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async getAllSubscriptions(req: Request, res: Response) {
    try {
      const cached = await getCache<any[]>("newsLetter:all");
      if (cached.cached && cached.data) {
        return res
          .status(HTTP_STATUS.OK)
          .json({ message: Message.FETCHED, isCached: true, data: cached.data });
      }
      const result = await newsService.getAllSubscriptions();
      if (!result.data) {
        return res
          .status(result.status)
          .json({ message: Message.INTERNAL_SERVER_ERROR });
      }
      await setCache("newsLetter:all", result.data, 300);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: Message.FETCHED, isCached: false, data: result.data });
    } catch (err: unknown) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }

  static async getSubscriptionById(req: Request, res: Response) {
    const id = getIdParam(req, res);
    if (!id) return;

    try {
      const cacheKey = `newsLetter:${id}`;
      const cached = await getCache<any>(cacheKey);
      if (cached.cached && cached.data) {
        return res
          .status(HTTP_STATUS.OK)
          .json({ message: Message.FETCHED, isCached: true, data: cached.data });
      }
      const result = await newsService.getSubscriptionById(id);
      if (result.status === HTTP_STATUS.NOT_FOUND || !result.data) {
        return res.status(result.status).json({ message: Message.NOT_FOUND });
      }
      await setCache(cacheKey, result.data, 300);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: Message.FETCHED, isCached: false, data: result.data });
    } catch (err: unknown) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }

  static async deleteSubscription(req: Request, res: Response) {
    const id = getIdParam(req, res);
    if (!id) return;

    try {
      const result = await newsService.deleteSubscription(id);
      if (result.status === HTTP_STATUS.NOT_FOUND) {
        return res.status(result.status).json({ message: Message.NOT_FOUND });
      }
      await delCache("newsLetter:all");
      await delCache(`newsLetter:${id}`);
      return res.status(HTTP_STATUS.OK).json({ message: Message.DELETED });
    } catch (err: unknown) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }

  static async sendNewsletter(req: Request, res: Response) {
    try {
      const dto = plainToInstance(SendNewsletterDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      }

      const result = await newsService.sendNewsletter(dto);
      if (!result.data) {
        return res
          .status(result.status)
          .json({ message: Message.INTERNAL_SERVER_ERROR });
      }
      return res.status(result.status).json({
        message: Message.NEWSLETTER_SENT,
        data: result.data,
      });
    } catch (err: unknown) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }
}
