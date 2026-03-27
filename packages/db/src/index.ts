export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/sqlite-core";
// packages/db/src/index.ts
export * from "./client";
export * from "./schema"; // This is the line you're likely missing!
