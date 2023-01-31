import { z } from "zod";
import { procedure, router } from "@server/trpc";

import { PokemonClient } from "pokenode-ts";

export const appRouter = router({
    "hello": procedure
        .input(
            z.object({
                text: z.string(),
            })
        )
        .query(({ input }) => {
            return {
                greeting: `hello ${input.text}`,
            };
        }),
    "nice-jacket": procedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .query(async ({ input }) => {
            return {
                word: `hi ${input.name}`,
            };
        }),
    "get-pokemon-by-id": procedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async ({ input }) => {
            const api = new PokemonClient();
            const pokemon = await api.getPokemonById(input.id);
            return {
                pokemon,
            };
        }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
