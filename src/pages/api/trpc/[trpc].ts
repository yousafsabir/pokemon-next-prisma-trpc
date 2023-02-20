import * as trpcNext from "@trpc/server/adapters/next";
import { AppRouter, appRouter } from "@server/routers/index";
import { inferProcedureOutput } from "@trpc/server";
// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});

// Utility to get response type of a query and use it in frontend
export type inferQueryResponse<
    TrouteKey extends keyof AppRouter["_def"]
> = inferProcedureOutput<AppRouter["_def"][TrouteKey]>;

// type declaration with trpc v9
// export type inferQueryResponse<
//     TrouteKey extends keyof AppRouter["_def"]["queries"]
// > = inferProcedureOutput<AppRouter["_def"]["queries"][TrouteKey]>;
