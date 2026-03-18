import nodemailer from "nodemailer";
import { envConfig } from "./env.config";

const host = envConfig.SMTP_HOST || "smtp.gmail.com";
const port = Number(envConfig.SMTP_PORT) || 465;
const secure = port === 465;

export const smtpTransporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user: envConfig.SMTP_USER,
    pass: envConfig.SMTP_PASS,
  },
});

export const smtpFrom =
  envConfig.SMTP_USER ? `Recruiting App <${envConfig.SMTP_USER}>` : undefined;

export const verifySmtpConnection = async (): Promise<void> => {
  if (!envConfig.SMTP_USER || !envConfig.SMTP_PASS) {
    throw new Error("SMTP credentials are missing!");
  }
  await smtpTransporter.verify();
};
