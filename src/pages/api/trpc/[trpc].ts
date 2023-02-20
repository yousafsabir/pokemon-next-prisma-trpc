import * as trpcNext from "@trpc/server/adapters/next";
import { AppRouter, appRouter } from "@server/routers/index";
import { inferProcedureOutput, inferRouterInputs, inferRouterOutputs } from "@trpc/server";
// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});

// Utility to get response/input type of a query and use it in frontend
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
