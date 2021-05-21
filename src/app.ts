import express from "express";
import pinoHttp from "pino-http";

import { logger } from "./util/logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

app.get("/api/health", (req, res) => res.send({ message: "OK" }));

export { app };
