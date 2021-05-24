import { Knex } from "knex";

import { config } from "../config";

export const knexConfig: Knex.Config = {
  client: "pg",
  connection: config.db.url,
  pool: {
    min: 2,
    max: 2,
  },
  migrations: {
    tableName: "KnexMigrations",
    directory: "migrations",
    extension: "ts",
  },
  useNullAsDefault: true,
};

module.exports = knexConfig;
