import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const databaseId =
  process.env.CLOUDFLARE_D1_DATABASE_ID?.trim() ||
  "47ed7a31-c4e8-4436-af77-4a03d1643385";
const databaseName =
  process.env.CLOUDFLARE_D1_DATABASE_NAME?.trim() ||
  "solved-client-intake-db";
const workerName =
  process.env.CLOUDFLARE_WORKER_NAME?.trim() || "solved-client-intake";

if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(databaseId)) {
  throw new Error("CLOUDFLARE_D1_DATABASE_ID must be a valid D1 database UUID.");
}

const configPath = resolve("dist/server/wrangler.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
const database = config.d1_databases?.find((item) => item.binding === "DB");

if (!database) {
  throw new Error("The generated Worker configuration does not contain the DB binding.");
}

config.name = workerName;
config.topLevelName = workerName;
database.database_name = databaseName;
database.database_id = databaseId;

await writeFile(configPath, `${JSON.stringify(config)}\n`, "utf8");
console.log(`Prepared Cloudflare Worker ${workerName} with D1 database ${databaseName}.`);
