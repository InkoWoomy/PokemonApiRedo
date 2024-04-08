import { Encounters } from "../../Interfaces/LocationInterface";

async function fetchPkmnLocationData(pokemonName: string|number) {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`);
    const data: Encounters = await response.json();

    return data;
}

export default fetchPkmnLocationData