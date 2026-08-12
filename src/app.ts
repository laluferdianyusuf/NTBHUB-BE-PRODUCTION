import cors from "cors";
import express from "express";
import http from "http";
import { swaggerSpec, swaggerUiMiddleware } from "./config/swagger";

import { startExpireJob } from "cron/expireJob";
import { errorHandler, notFoundHandler } from "middlewares/error.middleware";
import { initSocket } from "socket";
import { requestLogger } from "utils/logger";
import router from "./routes/index";

export type AppOptions = {
  enableSocket?: boolean;
  enableCron?: boolean;
  enableSwagger?: boolean;
  enableRequestLogger?: boolean;
};

export const createApp = (options: AppOptions = {}) => {
  const {
    enableSocket = true,
    enableCron = true,
    enableSwagger = true,
    enableRequestLogger = true,
  } = options;

  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  if (enableRequestLogger) {
    app.use(requestLogger);
  }

  const server = http.createServer(app);

  if (enableSocket && server) {
    initSocket(server);
  }

  if (enableCron) {
    startExpireJob();
  }

  if (enableSwagger) {
    app.use(
      "/api-docs",
      swaggerUiMiddleware.serve,
      swaggerUiMiddleware.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: "NTB Hub API Docs",
        swaggerOptions: {
          persistAuthorization: true,
          docExpansion: "none",
          tagsSorter: "alpha",
          operationsSorter: "alpha",
        },
      }),
    );
    app.get("/api-docs.json", (_req, res) => {
      res.json(swaggerSpec);
    });
  }

  app.use("/", router);

  app.get("/", (_req, res) =>
    res.send({
      message: "Server is running",
      docs: enableSwagger ? "/api-docs" : undefined,
    }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return { app, server };
};

const { app, server } = createApp();

export { app, server };
