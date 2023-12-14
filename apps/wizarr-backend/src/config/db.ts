import { databasePath } from "./paths";
import { resolve } from "path";
import { env } from "../utils/env.helper";
import { toLowerCase } from "../utils/lowercase.helper";

import type { DataSourceOptions } from "typeorm";

const dbFile = resolve(databasePath, "wizarr.db");
const entityPath = resolve(__dirname, "../", "api", "models");
const migrationPath = resolve(__dirname, "../", "database", "migrations");

const entityFiles = resolve(entityPath, "**", "*.{js,ts}");
const migrationFiles = resolve(migrationPath, "**", "*.{js,ts}");

export const dbConfig = (type: "sqlite" | "postgres"): DataSourceOptions => {
    const options: Partial<DataSourceOptions> = {
        type: toLowerCase(type),
        entities: [entityFiles],
        migrations: [migrationFiles],
        migrationsRun: true,
        synchronize: true,
        logging: false,
    };

    if (options.type === "sqlite" && env("DATABASE_FILE", dbFile)) {
        Object.assign(options, {
            database: env("DATABASE_FILE", dbFile),
        });
    }

    if ((options.type === "postgres" && env("DATABASE_URL")) || env("DATABASE_HOST")) {
        Object.assign(options, {
            url: env("DATABASE_URL"),
            host: env("DATABASE_HOST"),
            port: env("DATABASE_PORT", 5432),
            username: env("DATABASE_USERNAME"),
            password: env("DATABASE_PASSWORD"),
        });
    }

    return options as DataSourceOptions;
};