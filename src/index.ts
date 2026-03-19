import createApp from "./configs/app";
import { AppDataSource } from "./configs/psqllDB.config";
import { envConfig } from "./configs/env.config";
import { createServer } from "http";
import { startEmailWorker } from "./worker/emailWorker";
import { verifySmtpConnection } from "./configs/smtp.config";
import { createGraphQLServer } from "./configs/graphql.config";
import { context } from "./graphql/context/context";
import { HeaderMap } from "@apollo/server";
import cookieParser from "cookie-parser";
import cors from "cors";
import chalk from "chalk";
import { json } from "body-parser";


const app = createApp();
const PORT = Number(envConfig.PORT) || 5000;

async function start() {
  // Initialize DB
  await AppDataSource.initialize();
  console.log(chalk.green("Database connected"));

  if (process.env.NODE_ENV !== "test" && process.env.RUN_MIGRATIONS !== "false") {
    await AppDataSource.runMigrations();
    console.log(chalk.green("Database migrations applied"));
  }

  // Verify SMTP
  try {
    await verifySmtpConnection();
    console.log(chalk.green("SMTP connected"));
  } catch (err) {
    console.error(chalk.red("SMTP connection failed"), err);
  }

  // Start email worker
  startEmailWorker();

  // Start Apollo Server
  const apolloServer = createGraphQLServer();
  await apolloServer.start();

  // Express middlewares (cookies, CORS, JSON)
  app.use(cookieParser());
  app.use(
  "/graphql",
  cors({
    origin: envConfig.FRONTEND_URL || "http://localhost:7000",
    credentials: true,
  }),
  json(),
  async (req, res) => {
    // ✅ Use Apollo's HeaderMap, not native Map

    console.log("This is the data",req.body)
    const headers = new HeaderMap();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value) {
        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
    });

    const response = await apolloServer.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        body: req.body,
        headers,        // ✅ now correct type
        method: req.method,
        search: req.url?.split("?")[1] || "",
      },
      context: async ()=> await context({ req, res }), // <-- pass `res` here!
    });

    res.status(response.status || 200);
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (response.body.kind === "complete") {
      res.send(response.body.string);
    } else {
      for await (const chunk of response.body.asyncIterator) {
        res.write(chunk);
      }
      res.end();
    }
  }
);
  // Start HTTP server
  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(chalk.blue(`Server running on http://localhost:${PORT}`));
    console.log(chalk.green(`GraphQL endpoint -> http://localhost:${PORT}/graphql`));
  });
}

start().catch((err) => {
  console.error(chalk.red("Server failed to start"), err);
});