import { useState, useMemo } from "react";
import Head from "next/head";
import { Inter, Open_Sans } from "@next/font/google";
import { trpc } from "@utils/trpc";
import { getOptionsForVote } from "@utils/getRandomPokemon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [isLoading] = useState(false);
    // const { firstId, secondId } = getOptionsForVote();
    const [ids, setIds] = useState(getOptionsForVote());
    const firstPokemon = trpc["get-pokemon-by-id"].useQuery({
        id: ids.firstId,
    });
    const secondPokemon = trpc["get-pokemon-by-id"].useQuery({
        id: ids.secondId,
    });

    if (isLoading) {
        return (
            <>
                <Head>
                    <title>Roundest Pokemon | Home page</title>
                    <meta name="description" content="roundest pokemon" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main
                    className={"min-h-screen w-full grid place-content-center"}
                >
                    <h1 className="font-bold text-4xl text-center">
                        loading....
                    </h1>
                </main>
            </>
        );
    } else {
        return (
            <>
                <Head>
                    <title>Roundest Pokemon | Home page</title>
                    <meta name="description" content="roundest pokemon" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main
                    className={"min-h-screen w-full grid place-content-center"}
                >
                    <div className="space-y-6 p-8">
                        <h1 className="font-bold text-4xl text-center"></h1>
                        <h1 className="font-bold text-4xl text-center">
                            Which Pokemon is the roundest
                        </h1>
                        <div className="border rounded p-8">
                            <div className="flex space-x-5 items-center">
                                <div className="space-y-2">
                                    <img
                                        src={
                                            firstPokemon.data?.pokemon.sprites
                                                .front_default
                                        }
                                        alt=""
                                        className="rounded-lg object-cover object-center w-56 h-56 cursor-pointer"
                                    />
                                    <p className="text-center capitalize">
                                        {firstPokemon.data?.pokemon.name}
                                    </p>
                                </div>
                                <span>Vs</span>
                                <div className="space-y-2">
                                    <img
                                        src={
                                            secondPokemon.data?.pokemon.sprites
                                                .front_default
                                        }
                                        alt=""
                                        className="rounded-lg object-cover object-center w-56 h-56 cursor-pointer"
                                    />
                                    <p className="text-center capitalize">
                                        {secondPokemon.data?.pokemon.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
