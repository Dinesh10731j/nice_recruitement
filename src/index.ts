import createApp from "./configs/app";
import { AppDataSource } from "./configs/psqllDB.config";
import { envConfig } from "./configs/env.config";
import { createServer } from "http";
import { startEmailWorker } from "./worker/emailWorker";
import { verifySmtpConnection } from "./configs/smtp.config";


import chalk from "chalk";


const app = createApp();
const PORT = Number(envConfig.PORT) || 5000;
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "5433";
const dbName = process.env.DB_NAME || "eagle_heli";
const dbUser = process.env.DB_USER_NAME || "postgres";

console.log(
  chalk.cyan(
    `DB target -> host=${dbHost} port=${dbPort} db=${dbName} user=${dbUser}`
  )
);

AppDataSource.initialize()
  .then(async () => {
    console.log(chalk.green("Database connected"));
    if (process.env.NODE_ENV !== "test" && process.env.RUN_MIGRATIONS !== "false") {
      await AppDataSource.runMigrations();
      console.log(chalk.green("Database migrations applied"));
    }

    try {
      await verifySmtpConnection();
      console.log(chalk.green("SMTP connected"));
    } catch (err) {
      console.error(chalk.red("SMTP connection failed"), err);
    }

    startEmailWorker();

    const server = createServer(app);
   

    server.listen(PORT, () => {
      console.log(chalk.blue(`Server running on http://localhost:${PORT}`));
    });
  })
  .catch((err:unknown) => {

    if(err instanceof Error){
        throw new Error(err?.message ?? "Somethinng wen wrong in database connection")
    }else{
  console.error(chalk.red("Database connection failed"), err);
    }
  
  });
