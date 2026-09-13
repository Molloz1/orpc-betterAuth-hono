import { orpc } from "@repo/orpc-contract-config/orpc-client";
import { revalidatePath } from "next/cache";

async function addBook(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  if (!title && !author) return;
  await orpc.books.create({ title, author });
  revalidatePath("/");
}

export default async function Page() {
  const books = await orpc.books.list();

  return (
    <div>
      <form action={addBook} className="flex gap-2 mb-4">
        <input
          type="text"
          name="title"
          placeholder="Book title"
          required
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="author"
          placeholder="Book author"
          required
          className="border px-2 py-1"
        />
        <button type="submit">Add Book</button>
      </form>

      <ul className="flex flex-col gap-2">
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
