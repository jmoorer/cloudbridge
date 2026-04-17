import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./lib/db";

await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migrations complete");

import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request);
  },
});
