import Joi from "joi";

import { loadConfig } from "./util/load-config";

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    PORT: Joi.number().port().default(3000),
    POSTGRES_URL: Joi.string().required(),
  })
  .unknown();

const env = loadConfig(schema);

export const config = {
  env: env.NODE_ENV as "development" | "test" | "production",
  port: env.PORT as number,
  db: {
    url: env.POSTGRES_URL as string,
  },
};
