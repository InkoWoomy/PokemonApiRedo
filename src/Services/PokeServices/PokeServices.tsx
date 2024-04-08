import { Pokemon } from "../../Interfaces/Pokeinterface";

async function fetchPokemonData(pokemonName: string|number) {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data: Pokemon = await response.json();

    return data;
}

export default fetchPokemonData