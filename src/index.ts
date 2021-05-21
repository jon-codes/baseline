import { config } from "dotenv";
import { createHttpTerminator } from "http-terminator";

import { app } from "./app";
import { handle } from "./util/error";
import { logger } from "./util/logger";

config();

process.on("unhandledRejection", (err) => {
  throw err;
});

process.on("uncaughtException", (err) => {
  handle(err);
});

const server = app.listen(process.env.PORT || 3000, () => {
  logger.info(
    `started server on :${process.env.PORT || 3000} in ${
      process.env.NODE_ENV
    } mode`
  );
});

const httpTerminator = createHttpTerminator({ server });

const shutdownSignals = ["SIGTERM", "SIGINT"];

shutdownSignals.forEach((signal) =>
  process.on(signal, async () => {
    logger.info(`${signal} received, closing gracefully ...`);
    await httpTerminator.terminate();
  })
);
