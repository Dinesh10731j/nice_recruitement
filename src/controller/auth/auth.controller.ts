import { Request, Response } from "express";
import { AuthService } from "../../service/auth/auth.service";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "../../dto/auth/auth.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HTTP_STATUS } from "../../constant/statusCode.interface";
import { Message } from "../../constant/message.interface";

// Initialize AuthService
const authService = new AuthService();

type ServiceResult<T> = {
  status: number;
  data?: T;
  message?: string;
};

export class AuthController {
  static async signup(req: Request, res: Response) {
  try {
    const dto = plainToInstance(RegisterDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);

    // Call your AuthService to create user and get tokens
    const { user, access_token, refresh_token } = await authService.signup(dto);

    // Set cookies
    res
      .cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(HTTP_STATUS.CREATED)
      .json({ message: Message.USER_CREATED_SUCCESS});
  } catch (err: any) {
    const msg = err?.message === Message.USER_ALREADY_EXISTS ? Message.USER_ALREADY_EXISTS : Message.INVALID_REQUEST;
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: msg });
  }
}

static async signin(req: Request, res: Response) {
  try {
    const dto = plainToInstance(LoginDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);

    // Calling   AuthService to validate user and get tokens
    const { access_token, refresh_token } = await authService.signin(dto);

    // Set cookies
    res
      .cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(HTTP_STATUS.OK)
      .json({ message: Message.LOGIN_SUCCESS });
  } catch (err: any) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: Message.INVALID_EMAIL_OR_PASSWORD });
  }
}

static async forgotPassword(req: Request, res: Response) {
  try {
    const dto = plainToInstance(ForgotPasswordDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);

    const result: ServiceResult<null> = await authService.forgotPassword(dto.email);
    if (result.status === HTTP_STATUS.NOT_FOUND) {
      return res.status(result.status).json({ message: Message.USER_NOT_FOUND });
    }
    if (result.status !== HTTP_STATUS.OK) {
      return res.status(result.status).json({ message: Message.INTERNAL_SERVER_ERROR });
    }
    return res.status(result.status).json({ message: Message.RESET_EMAIL_SENT });
  } catch (err: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: Message.INTERNAL_SERVER_ERROR });
  }
}

static async resetPassword(req: Request, res: Response) {
  try {
    const dto = plainToInstance(ResetPasswordDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
    const result: ServiceResult<null> = await authService.resetPassword(dto.token, dto.newPassword);
    if (result.status === HTTP_STATUS.NOT_FOUND) {
      return res.status(result.status).json({ message: Message.USER_NOT_FOUND });
    }
    if (result.status === HTTP_STATUS.BAD_REQUEST) {
      return res.status(result.status).json({ message: Message.RESET_TOKEN_INVALID });
    }
    if (result.status !== HTTP_STATUS.OK) {
      return res.status(result.status).json({ message: Message.INTERNAL_SERVER_ERROR });
    }
    return res.status(result.status).json({ message: Message.PASSWORD_RESET_SUCCESS });
  } catch (err: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: Message.INTERNAL_SERVER_ERROR });
  }
}


static async logout(req: Request, res: Response) {
    try {
      res
        .clearCookie("access_token", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .clearCookie("refresh_token", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .status(HTTP_STATUS.OK)
        .json({ message: Message.SUCCESS });
    } catch (err: any) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: Message.INTERNAL_SERVER_ERROR });
    }
  }



}




