import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { envConfig } from "./env.config";

const host = envConfig.SMTP_HOST || "smtp.gmail.com";
const port = Number(envConfig.SMTP_PORT) || 587;
const secure = port === 465;

// Cast to `any` to allow `family` (runtime works fine)
const smtpOptions: SMTPTransport.Options & { family?: number } = {
  host,
  port,
  secure,
  auth: {
    user: envConfig.SMTP_USER,
    pass: envConfig.SMTP_PASS,
  },
  family: 4, // ✅ force IPv4
  tls: { rejectUnauthorized: false },
};

export const smtpTransporter = nodemailer.createTransport(smtpOptions);

export const smtpFrom =
  envConfig.SMTP_USER ? `Recruiting App <${envConfig.SMTP_USER}>` : undefined;

export const verifySmtpConnection = async (): Promise<void> => {
  if (!envConfig.SMTP_USER || !envConfig.SMTP_PASS) {
    throw new Error("SMTP credentials are missing!");
  }
  try {
    await smtpTransporter.verify();
    console.log("✅ SMTP connected");
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    throw error;
  }
};