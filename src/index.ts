import { createHttpTerminator } from "http-terminator";

import { app } from "./app";
import { config } from "./config";
import { handle } from "./util/error";
import { logger } from "./util/logger";

process.on("unhandledRejection", (err) => {
  throw err;
});

process.on("uncaughtException", (err) => {
  handle(err);
});

const server = app.listen(config.port, () => {
  logger.info(`started server on :${config.port} in ${config.env} mode`);
});

const httpTerminator = createHttpTerminator({ server });

const shutdownSignals = ["SIGTERM", "SIGINT"];

shutdownSignals.forEach((signal) =>
  process.on(signal, async () => {
    logger.info(`${signal} received, closing gracefully ...`);
    await httpTerminator.terminate();
  })
);
