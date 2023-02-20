import React, { useReducer } from "react";
import Head from "next/head";
import { trpc } from "@utils/trpc";
import { getOptionsForVote } from "@utils/getRandomPokemon";
import { number } from "zod";

export type State = {
    ids: {
        firstId: number;
        secondId: number;
    };
    chosenId: number | null;
    firstTime: boolean;
};

export default function Home() {
    const initialState: State = {
        ids: getOptionsForVote(),
        chosenId: null,
        firstTime: true,
    };

    const [state, dispatch] = useReducer((state: State, action: any) => {
        const { type, payload } = action;
        switch (type) {
            case "NEW_IDS":
                return {
                    ...state,
                    ids: getOptionsForVote(),
                };
            case "SET_CHOSEN_ID":
                return {
                    ...state,
                    chosenId: payload,
                };
            case "SET_FIRST_TIME":
                return {
                    ...state,
                    firstTime: payload,
                };
            default:
                return state;
        }
    }, initialState);

    const {
        data,
        isLoading,
        isError,
        error,
        // refetch: refetchPoke,
    } = trpc["get-pokemon"].useQuery({
        firstId: state.ids.firstId,
        secondId: state.ids.secondId,
    });

    const castVote = (id: number) => {
        // todo: fire mutation for the vote caste

        dispatch({ type: "SET_CHOSEN_ID", payload: id });
        if (state.firstTime) {
            dispatch({ type: "SET_FIRST_TIME", payload: false });
        }

        const timer = setTimeout(() => {
            dispatch({ type: "NEW_IDS" });
            // Don't need to refetch, as we are using csr and component rerenders on state change causing pokemons to reload with new ids
            // refetchPoke();
            dispatch({ type: "SET_CHOSEN_ID", payload: null });
            clearTimeout(timer);
        }, 3000);
    };

    if (isLoading || isError || error) {
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
                        {isLoading && state.firstTime
                            ? "loading Pokemon...."
                            : isLoading && !state.firstTime
                            ? "loading Another Pokemon...."
                            : isError
                            ? error.message
                            : null}
                    </h1>
                </main>
            </>
        );
    } else {
        const { firstPoke, secondPoke } = data;
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
                                <div className="space-y-2 text-center relative">
                                    <div
                                        className={`-left-1 top-0 px-2 py-1 rounded bg-orange-400 ${
                                            state.chosenId === state.ids.firstId
                                                ? ""
                                                : "hidden"
                                        }`}
                                    >
                                        <p>Casting {firstPoke?.name}</p>
                                    </div>
                                    <img
                                        src={
                                            firstPoke?.sprites
                                                .front_default as string
                                        }
                                        alt=""
                                        className="rounded-lg object-cover object-center w-56 h-56 cursor-pointer"
                                    />
                                    <p className="capitalize">
                                        {firstPoke?.name}
                                    </p>
                                    <button
                                        onClick={() =>
                                            castVote(state.ids.firstId)
                                        }
                                        className="px-3 py-1 rounded bg-slate-300 text-gray-900 mt-2"
                                    >
                                        Rounder
                                    </button>
                                </div>
                                <span>Vs</span>
                                <div className="space-y-2 text-center relative">
                                    <div
                                        className={`-left-1 top-0 px-2 py-1 rounded bg-orange-400 ${
                                            state.chosenId ===
                                            state.ids.secondId
                                                ? ""
                                                : "hidden"
                                        }`}
                                    >
                                        <p>
                                            Casting {secondPoke?.name}
                                            ...
                                        </p>
                                    </div>
                                    <img
                                        src={
                                            secondPoke?.sprites
                                                .front_default as string
                                        }
                                        alt=""
                                        className="rounded-lg object-cover object-center w-56 h-56 cursor-pointer"
                                    />
                                    <p className="capitalize">
                                        {secondPoke?.name}
                                    </p>
                                    <button
                                        onClick={() =>
                                            castVote(state.ids.secondId)
                                        }
                                        className="px-3 py-1 rounded bg-slate-300 text-gray-900 mt-2"
                                    >
                                        Rounder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
