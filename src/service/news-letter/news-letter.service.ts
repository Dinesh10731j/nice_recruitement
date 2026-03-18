import { smtpFrom, smtpTransporter } from "../../configs/smtp.config";
import { envConfig } from "../../configs/env.config";
import {
  CreateNewsLetterDto,
  SendNewsletterDto,
} from "../../dto/news-letter/news-letter.dto";
import { manpowerNewsletterTemplate } from "../../mailTemplates/newsLetterTemplate";
import { NewsLetterRepository } from "../../repository/news-letter/news-letter.repository";
import { HTTP_STATUS } from "../../constant/statusCode.interface";

export type ServiceResult<T> = {
  status: number;
  data?: T | null;
};

export class NewsLetterService {
  constructor(private readonly repo = new NewsLetterRepository()) {}

  async createSubscription(
    dto: CreateNewsLetterDto
  ): Promise<ServiceResult<unknown>> {
    const existing = await this.repo.findByEmail(dto.email);
    if (existing) {
      return { status: HTTP_STATUS.OK, data: existing };
    }
    const created = await this.repo.createSubscriber(dto.email);
    return { status: HTTP_STATUS.CREATED, data: created };
  }

  async getAllSubscriptions(): Promise<ServiceResult<unknown[]>> {
    const rows = await this.repo.listAll();
    return { status: HTTP_STATUS.OK, data: rows };
  }

  async getSubscriptionById(id: string): Promise<ServiceResult<unknown>> {
    const row = await this.repo.findById(id);
    if (!row) return { status: HTTP_STATUS.NOT_FOUND, data: null };
    return { status: HTTP_STATUS.OK, data: row };
  }

  async deleteSubscription(id: string): Promise<ServiceResult<null>> {
    const row = await this.repo.findById(id);
    if (!row) return { status: HTTP_STATUS.NOT_FOUND, data: null };
    await this.repo.deleteById(id);
    return { status: HTTP_STATUS.OK, data: null };
  }

  async sendNewsletter(dto: SendNewsletterDto): Promise<ServiceResult<{ sentTo: number }>> {
    const from = dto.fromName
      ? `${dto.fromName} <${envConfig.SMTP_USER}>`
      : smtpFrom || envConfig.SMTP_USER;

    const recipients = await this.repo.listActiveEmails();

    if (recipients.length === 0) {
      return { status: HTTP_STATUS.OK, data: { sentTo: 0 } };
    }

    const html = manpowerNewsletterTemplate(dto.template);

    await smtpTransporter.sendMail({
      from,
      to: envConfig.SMTP_USER,
      bcc: recipients,
      subject: dto.subject,
      html,
    });

    return { status: HTTP_STATUS.OK, data: { sentTo: recipients.length } };
  }
}
