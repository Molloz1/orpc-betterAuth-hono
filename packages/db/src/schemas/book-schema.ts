import { uuid, pgTable, varchar } from "drizzle-orm/pg-core";

export const bookTable = pgTable("books", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull().notNull(),
  author: varchar({ length: 255 }).notNull(),
});
