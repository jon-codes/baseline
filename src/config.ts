import Joi from "joi";

import { loadConfig } from "./util/load-config";

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
  env: env.NODE_ENV as "development" | "test" | "production",
  port: env.PORT as number,
};
