import { Worker, type ConnectionOptions } from "bullmq";
import chalk from "chalk";
import { envConfig } from "../configs/env.config";
import { smtpFrom, smtpTransporter } from "../configs/smtp.config";
import { welcomeEmailTemplate } from "../mailTemplates/emailTemplate";

if (!envConfig.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in your environment variables!");
}

const toConnectionOptions = (redisUrl: string): ConnectionOptions => {
  const url = new URL(redisUrl);
  const db =
    url.pathname && url.pathname.length > 1 ? Number(url.pathname.slice(1)) : undefined;
  const isTls = url.protocol === "rediss:";

  return {
    host: url.hostname,
    port: Number(url.port) || 6379,
    username: url.username || undefined,
    password: url.password || undefined,
    db: Number.isFinite(db) ? db : undefined,
    tls: isTls ? {} : undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };
};

const connection = toConnectionOptions(envConfig.REDIS_URL);

export const startEmailWorker = (): Worker => {
  const worker = new Worker(
    "email",
    async (job) => {
      if (job.name !== "welcome-email") return;
      const { email, firstName, lastName } = job.data as {
        email: string;
        firstName: string;
        lastName: string;
      };

      const fullName = `${firstName} ${lastName}`.trim();

      await smtpTransporter.sendMail({
        from: smtpFrom || envConfig.SMTP_USER,
        to: email,
        subject: "Thanks for registering",
        html: welcomeEmailTemplate(fullName),
      });

      if (process.env.NODE_ENV !== "test") {
        console.log(chalk.blue(`Welcome email sent to ${email}`));
      }
    },
    { connection }
  );

  worker.on("completed", (job) => {
    if (process.env.NODE_ENV !== "test") {
      console.log(chalk.green(`Email job completed: ${job.id}`));
    }
  });

  worker.on("failed", (job, err) => {
    if (process.env.NODE_ENV !== "test") {
      console.error(chalk.red(`Email job failed: ${job?.id}`), err);
    }
  });

  return worker;
};
