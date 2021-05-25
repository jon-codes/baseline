import Joi from "joi";

import { loadConfig } from "./util/load-config";

export interface Env {
  NODE_ENV: "development" | "test" | "production";
  PORT: number;
}

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    PORT: Joi.number().port().default(3000),
  })
  .unknown();

const env = loadConfig(schema);

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
};
