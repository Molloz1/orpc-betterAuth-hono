import { oc } from "@orpc/contract";
import z, { object } from "zod";

const BooksZod = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
});

const listBooksContract = oc.output(z.array(BooksZod));

const createBooksContract = oc
  .input(BooksZod.pick({ title: true, author: true }))
  .output(BooksZod);

const findBooksContract = oc
  .input(BooksZod.pick({ id: true }))
  .output(BooksZod);

export const BookContract = {
  books: {
    find: findBooksContract,
    list: listBooksContract,
    create: createBooksContract,
  },
};
