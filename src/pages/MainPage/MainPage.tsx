import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import fetchPokemonData from "../../Services/PokeServices/PokeServices";
import fetchPkmnLocationData from "../../Services/LocationServices/LocationServices";
import fetchEvoChainData from "../../Services/EvoServices/EvoServies";
import { Pokemon } from "../../Interfaces/Pokeinterface";
import { Encounters } from "../../Interfaces/LocationInterface";
import PokeBG from "../../assets/images/SwShBg-4.png";
import { InputComponent } from "../../components/Inputcomponent";
import { EvoInterface } from "../../Interfaces/EvoInterface";

function MainPage() {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>();
  const [locationInfo, setLocationInfo] = useState<Encounters>();
  const [evoInfo, setEvoInfo] = useState<EvoInterface>();
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const pokemonData = async () => {
      const fetchedPkmnData = await fetchPokemonData(
        Math.floor(Math.random() * 649) + 1
      );
      const fetchedLocationData = await fetchPkmnLocationData(fetchedPkmnData?.name);
      const fetchedEvoData = await fetchEvoChainData(fetchedPkmnData?.name);

      setPokemonInfo(fetchedPkmnData);
      setLocationInfo(fetchedLocationData);
      setEvoInfo(fetchedEvoData);
    };
    pokemonData();
  }, []);

  function playAudio(url: string | undefined) {
    
    new Audio(url).play();
  }

  const paddedId = String(pokemonInfo?.id).padStart(3, "0");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOnClick = async () => {
    const fetchedData = await fetchPokemonData(input.toLocaleLowerCase());
    setPokemonInfo(
      fetchedData.id <= 649 && fetchedData.name === input
        ? fetchedData
        : undefined
    );
  };

  function renderEvolutionChain(chain: any): JSX.Element[] {
    const stages: JSX.Element[] = [];
    if (chain) {
      stages.push(
        <li key={chain.species.name}>
          {chain.species.name}
        </li>
      );
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((stage: any) => {
          stages.push(...renderEvolutionChain(stage));
        });
      }
    }
    return stages;
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${PokeBG})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
        className="min-h-screen"
      >
        <div className="grid lg:grid-cols-2 px-40 pt-5 gap-4">
          {/* leftside */}
          <div>
            <div className="bg-red-300 rounded-lg text-center p-5 mb-2">
              <h1 className="text-5xl font-mono capitalize">
                National Pokedex
              </h1>
            </div>
            <div className="justify-center flex bg-slate-300 rounded-lg p-5">
              <InputComponent
                onChange={handleOnChange}
                onClick={handleOnClick}
              />
            </div>

            <div className="justify-center flex rounded-xl">
              <img
                src={pokemonInfo?.sprites.other?.home.front_default}
                onClick={() => playAudio(pokemonInfo?.cries.latest)}
                className="hover:brightness-125"
              />
            </div>
          </div>

          {/* rightside */}
          <div>
            <div className="bg-red-300 rounded-lg text-center mb-2 p-5">
              <h1 className="text-5xl font-mono capitalize">
                {`- NO. ${paddedId} -`}
              </h1>
            </div>
            <div className="bg-black text-white rounded-t-lg text-center p-5">
              <h1 className="text-5xl font-mono capitalize">
                {pokemonInfo?.name}
              </h1>
            </div>
            <div className="bg-slate-300 rounded-b-lg text-cente p-1 mb-2">
              <ul className="text-xl font-mono capitalize lg:grid lg:grid-cols-2">
                {pokemonInfo?.types.map((type, index) => (
                  <li
                    key={index}
                    className=" bg-slate-500 rounded-full p-3 mx-10 flex text-center justify-center"
                  >{`${type.type.name}`}</li>
                ))}
              </ul>
            </div>

            <div className="justify-center bg-slate-300 rounded-lg p-5 grid grid-cols-2 gap-5 mb-2">
              {/* locationleftside */}
              <div className="text-xl text-white font-mono capitalize flex bg-slate-700 rounded-lg p-5">
                Can be found in:
                <div>
                  {/* {locationInfo?.location_area.name} */}
                  {/* {`${locationInfo?.location_area?.map((name, index) => (
                  <li key={index}>
                    {`${location.name}`}
                  </li>
                  ))}`} */}
                </div>
              </div>

              {/* abilitiesrightside */}
              <div className="text-xl text-white font-mono capitalize flex bg-slate-700 rounded-lg p-5">
                Abilities:
                <ul className="">
                  {pokemonInfo?.abilities.map((ability, index) => (
                    <li key={index}>
                      {`${ability.ability.name}${
                        index < pokemonInfo?.abilities.length - 1 ? ", " : ``
                      }`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="justify-center bg-slate-300 rounded-lg p-5 mb-2">
              <div className="text-xl text-white font-mono capitalize  bg-slate-700 rounded-lg p-5 max-h-[200px] overflow-y-auto">
                Possible Moves: 
                <ul className="">
                  {pokemonInfo?.moves.map((ability, index) => (
                    <li key={index}>
                      {`${ability.move.name}${
                        index < pokemonInfo?.abilities.length - 1 ? ", " : ``
                      }`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="justify-center bg-slate-300 rounded-lg p-5 gap-5 mb-2">

            {evoInfo && (
              <div className="text-xl text-white font-mono capitalize bg-slate-700 rounded-lg p-5">
                Evolution Chain:
                <ul>
                  {/* Call fetch pokemon data to get the correct pokemon for the evo chain */}
                  {renderEvolutionChain(evoInfo.chain)}
                </ul>
              </div>
  )}
            </div>
            
          </div>

          

        </div>
      </div>
    </>
  );
}

export default MainPage;
