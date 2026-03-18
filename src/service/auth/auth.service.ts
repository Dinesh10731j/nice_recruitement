import bcrypt from "bcrypt";
import crypto from "crypto";
import { HTTP_STATUS } from "../../constant/statusCode.interface";
import { Message } from "../../constant/message.interface";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "../../dto/auth/auth.dto";
import { generateAccessToken, generateRefreshToken } from "../../functions/generate_token";
import { enqueueWelcomeEmail } from "../../jobs/emailJob";
import { AuthRepository } from "../../repository/auth/auth.repository";
import { smtpFrom, smtpTransporter } from "../../configs/smtp.config";
import { envConfig } from "../../configs/env.config";
import { resetPasswordTemplate } from "../../mailTemplates/resetPasswordTemplate";

type ServiceResult<T> = {
  status: number;
  data?: T;
  message?: string;
};

export class AuthService {
  constructor(private readonly authRepo = new AuthRepository()) {}

  async signup(
    dto: RegisterDto
  ): Promise<{ user: unknown; access_token: string; refresh_token: string }> {
    const existing = await this.authRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error(Message.USER_ALREADY_EXISTS);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.authRepo.createUser({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: passwordHash,
      isActive: dto.isActive ?? true,
      ...(dto.role !== undefined ? { role: dto.role } : {}),
    });

    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    // Fire-and-forget to keep signup fast even if Redis is slow
    enqueueWelcomeEmail(user).catch((err) => {
      if (process.env.NODE_ENV !== "test") {
        console.error("Failed to enqueue welcome email", err);
      }
    });

    return { user, access_token, refresh_token };
  }

  async signin(
    dto: LoginDto
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.authRepo.findByEmailWithPassword(dto.email);
    if (!user) {
      throw new Error(Message.INVALID_EMAIL_OR_PASSWORD);
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new Error(Message.INVALID_EMAIL_OR_PASSWORD);
    }

    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    return { access_token, refresh_token };
  }

  async forgotPassword(_email: ForgotPasswordDto["email"]): Promise<ServiceResult<null>> {
    const user = await this.authRepo.findByEmailWithReset(_email);
    if (!user) {
      return { status: HTTP_STATUS.NOT_FOUND, data: null };
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.authRepo.setResetToken(user.id, tokenHash, expiresAt);

    const frontend = envConfig.FRONTEND_URL || "http://localhost:3000";
    const resetUrl = `${frontend}/reset-password?token=${rawToken}`;

    const html = resetPasswordTemplate({
      name: `${user.firstName} ${user.lastName}`.trim(),
      resetUrl,
    });

    await smtpTransporter.sendMail({
      from: smtpFrom || envConfig.SMTP_USER,
      to: user.email,
      subject: "Reset your password",
      html,
    });

    return { status: HTTP_STATUS.OK, data: null };
  }

  async resetPassword(
    _token: ResetPasswordDto["token"],
    _newPassword: ResetPasswordDto["newPassword"]
  ): Promise<ServiceResult<null>> {
    const tokenHash = crypto.createHash("sha256").update(_token).digest("hex");
    const user = await this.authRepo.findByResetTokenHash(tokenHash);
    if (!user || !user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
      return { status: HTTP_STATUS.BAD_REQUEST, data: null };
    }

    const passwordHash = await bcrypt.hash(_newPassword, 10);
    await this.authRepo.updatePassword(user.id, passwordHash);
    await this.authRepo.setResetToken(user.id, null, null);

    return { status: HTTP_STATUS.OK, data: null };
  }
}
