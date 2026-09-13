import type { RouterContractClient } from "@orpc/contract";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { BookContract } from "@repo/orpc-contract-config/bookContract";

const link = new RPCLink({
  url: "http://localhost:3002/rpc",
});

export const orpc: RouterContractClient<typeof BookContract> =
  createORPCClient(link);
