import { Request, Response } from "express";
import { HTTP_STATUS } from "../../constant/statusCode.interface";
import { Message } from "../../constant/message.interface";
import { AdvertiseService } from "../../service/advertise/advertise.service";
import { AdvertiseRepository } from "../../repository/advertise/advertise.repository";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryUpload";
import { CreateAdvertiseDto } from "../../dto/advertise/advertise.dto";
import { plainToInstance } from "class-transformer";
import {validate} from "class-validator";
const repo = new AdvertiseRepository();
const service = new AdvertiseService(repo);

const getIdParam = (req: Request, res: Response): string | null => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim().length === 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: Message.INVALID_REQUEST });
    return null;
  }
  return id;
};

export class AdvertiseController {
  static async create(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateAdvertiseDto,req.body);
      // ✅ Validate DTO
          const errors = await validate(dto);
          if (errors.length > 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
              message: "Validation failed",
              errors,
            });
          }
      const payload = { ...req.body } as Record<string, unknown>;
      if (req.file?.buffer) {
        payload.imageUrl = await uploadBufferToCloudinary(req.file.buffer, "advertise");
      }

      const data = await service.create(payload);
      return res.status(HTTP_STATUS.CREATED).json({ message: Message.CREATED, data });
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }

  static async findAll(_req: Request, res: Response) {
    try {
      const data = await service.findAll();
      return res.status(HTTP_STATUS.OK).json({ message: Message.FETCHED, data });
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }

  static async findById(req: Request, res: Response) {
    const id = getIdParam(req, res);
    if (!id) return;

    try {
      const data = await service.findById(id);
      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: Message.NOT_FOUND });
      }
      return res.status(HTTP_STATUS.OK).json({ message: Message.FETCHED, data });
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }

  static async update(req: Request, res: Response) {
    const id = getIdParam(req, res);
    if (!id) return;

    try {
      const payload = { ...req.body } as Record<string, unknown>;
      if (req.file?.buffer) {
        payload.imageUrl = await uploadBufferToCloudinary(req.file.buffer, "advertise");
      }

      const data = await service.update(id, payload);
      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: Message.NOT_FOUND });
      }
      return res.status(HTTP_STATUS.OK).json({ message: Message.UPDATED, data });
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }

  static async remove(req: Request, res: Response) {
    const id = getIdParam(req, res);
    if (!id) return;

    try {
      await service.remove(id);
      return res.status(HTTP_STATUS.OK).json({ message: Message.DELETED });
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }
}
