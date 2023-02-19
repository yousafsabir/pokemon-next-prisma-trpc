import { z } from "zod";
import { procedure, router } from "@server/trpc";
import getPokemon from "@server/utils/getPokemon";

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
    "get-pokemon": procedure
        .input(
            z.object({
                firstId: z.number(),
                secondId: z.number(),
            })
        )
        .query(async ({ input }) => {
            const firstPoke = await getPokemon(input.firstId);
            const secondPoke = await getPokemon(input.secondId);
            return {
                firstPoke,
                secondPoke,
            };
        }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
