import { PokemonClient, Pokemon } from "pokenode-ts";

async function getPokemon(id: number) {
    try {
        const api = new PokemonClient();
        const pokemon = await api.getPokemonById(id);
        return pokemon;
    } catch (error) {
        console.log(error);
    }
}

export default getPokemon;
