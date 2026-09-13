import { implement, ORPCError } from "@orpc/server";
import { BookContract } from "@repo/orpc-contract-config/bookContract";
import { db } from "@repo/db-config/db";
import { bookTable } from "@repo/db-config/book-schema";
import { eq } from "@repo/db-config/drizzle";

const os = implement(BookContract);

const findBooks = os.books.find.handler(async ({ input }) => {
  const [book] = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.id, input.id));

  if (!book) {
    throw new ORPCError("NOT_FOUND", { message: "Book not found" });
  }

  return book;
});

const createBook = os.books.create.handler(async ({ input }) => {
  const [book] = await db
    .insert(bookTable)
    .values({
      author: input.author,
      title: input.title,
    })
    .returning();

  if (!book) {
    throw new ORPCError("NOT_IMPLEMENTED");
  }
  return book;
});

const listBook = os.books.list.handler(async () => {
  const books = db.select().from(bookTable);
  if (!books) {
    throw new ORPCError("NOT_FOUND");
  }
  return books;
});

export const booksRouter = os.router({
  books: {
    list: listBook,
    find: findBooks,
    create: createBook,
  },
});
