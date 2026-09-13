import { Hono } from "hono";
import { auth } from "@repo/auth-config/auth";
import { booksRouter } from "./routes/books-routes";
import { RPCHandler } from "@orpc/server/fetch";
import { onError } from "@orpc/server";

const app = new Hono();
const handler = new RPCHandler(booksRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

app
  .use("/api/auth/*", (c) => auth.handler(c.req.raw))
  .use("/rpc/*", async (c, next) => {
    const { matched, response } = await handler.handle(c.req.raw, {
      prefix: "/rpc",
      context: {},
    });

    if (matched) {
      return c.newResponse(response.body, response);
    }

    await next();
  });
export default {
  port: 3002,
  fetch: app.fetch,
};
