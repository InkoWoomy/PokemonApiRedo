import { EvoInterface } from "../../Interfaces/EvoInterface";

async function fetchEvoChainData(pokemonName: string|number){
    const evoPromise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
    const evoData = await evoPromise.json();
    const evolutionChainId = evoData.evolution_chain.url.split('/').slice(-2, -1)[0];
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`);
    const data: EvoInterface = await response.json();
    return data;
}

export default fetchEvoChainData